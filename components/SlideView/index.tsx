/** @format */

import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { Slide } from 'model/condition/types';
import { OtoText, COLOURS } from 'components/design';
import Otoscope, { OTOSCOPE_BOUNDARY_RADIUS } from './Otoscope';
import { useDraw } from './Draw';
import { DiagnosisInfo } from './DiagnosisInfo';
import { Footer, FooterIcon } from 'components';
import { FavouriteStar } from 'components';
import { Spacer } from './Spacer';

const HEADER_HEIGHT = 85; // this is an estimate of the React Navigation header

type Props = {
  slide: Slide;
  goToCondition: () => void;
};

const SlideView: React.FC<Props> = ({ slide, goToCondition }) => {
  const [showOtoscope, setShowOtoscope] = React.useState(false);
  const [isDiagnosed, setIsDiagnosed] = React.useState(false);
  const windowHeight = useWindowDimensions().height;
  const imageTranslationY = React.useRef(new Animated.Value(0)).current;
  const moveImageUp = () => {
    Animated.timing(imageTranslationY, {
      toValue: -(windowHeight / 2 - OTOSCOPE_BOUNDARY_RADIUS - HEADER_HEIGHT),
      useNativeDriver: false,
    }).start();
  };
  const moveImageDown = () => {
    Animated.timing(imageTranslationY, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };
  const [Draw, openDraw] = useDraw({
    onDrawCloseComplete: () => setIsDiagnosed(false),
    onDrawCloseStart: () => moveImageDown(),
    onDrawOpenStart: () => moveImageUp(),
  });
  return (
    <React.Fragment>
      <View style={styles.screen}>
        <Animated.View
          style={[
            styles.imageContainer,
            { transform: [{ translateY: imageTranslationY }] },
          ]}>
        <Spacer />
          <Image source={{ uri: slide.img_url }} style={styles.image} />
          {showOtoscope ? <Otoscope /> : null}
        </Animated.View>
        <Spacer
          text={!isDiagnosed ? 'Tap to reveal diagnosis' : ''}
          onPress={() => {
            setIsDiagnosed(true);
            openDraw();
          }}
        />
        <Draw>
          <DiagnosisInfo
            slideId={slide.id}
            condition={slide.condition}
            diagnosis={slide.diagnosis}
          />
        </Draw>
      </View>
      <Footer>
        <View style={styles.footer}>
          <FooterIcon
            iconName="otoscope"
            colour={showOtoscope ? COLOURS.primary : COLOURS.grey}
            onPress={() => setShowOtoscope(!showOtoscope)}
          />
          <FavouriteStar slideId={slide.id} />
          <FooterIcon
            iconName="eardrum"
            colour={COLOURS.grey}
            onPress={() => console.log('pressed')}
          />
        </View>
      </Footer>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: COLOURS.black,
  },
  imageContainer: { justifyContent: 'center' },
  image: {
    width: OTOSCOPE_BOUNDARY_RADIUS * 2,
    height: OTOSCOPE_BOUNDARY_RADIUS * 2,
  },
  spacer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default SlideView;
