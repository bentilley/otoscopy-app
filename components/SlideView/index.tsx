/** @format */

import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Slide } from 'model/condition/types';
import { OtoText, COLOURS } from 'components/design';
import Otoscope, { OTOSCOPE_BOUNDARY_RADIUS } from './Otoscope';
import Draw from './Draw';
import { DiagnosisInfo } from './DiagnosisInfo';
import { Footer, FooterIcon } from 'components';
import { FavouriteStar } from 'components';

type Props = {
  slide: Slide;
  goToCondition: () => void;
};

const action = () => {
  console.log('press');
};

const SlideView: React.FC<Props> = ({ slide, goToCondition }) => {
  const [showOtoscope, setShowOtoscope] = React.useState(false);
  const [isDiagnosed, setIsDiagnosed] = React.useState(true);
  return (
    <React.Fragment>
      <View style={styles.screen}>
        {!isDiagnosed ? <View style={styles.spacer} /> : null}
        <View style={styles.imageContainer}>
          <Image source={{ uri: slide.img_url }} style={styles.image} />
          {showOtoscope ? <Otoscope /> : null}
        </View>
        {!isDiagnosed ? (
          <TouchableWithoutFeedback
            onPress={() => setIsDiagnosed(!isDiagnosed)}>
            <View style={styles.spacer}>
              <OtoText size="large" weight="bold">
                Tap to reveal diagnosis
              </OtoText>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View style={styles.spacer} />
        )}
        <Draw
          content={
            <DiagnosisInfo
              slideId={slide.id}
              condition={slide.condition}
              diagnosis={slide.diagnosis}
            />
          }
        />
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
            onPress={action}
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
