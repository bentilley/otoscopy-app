/** @format */

import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { Slide } from 'model/condition/types';
import { COLOURS } from 'components/design';
import { Otoscope } from './Otoscope';
import { useDraw } from './Draw';
import { useMovableYContainer } from './MovableYContainer';
import { DiagnosisInfo } from './DiagnosisInfo';
import { Footer, FooterIcon } from 'components';
import { FavouriteStar } from 'components';
import { Spacer } from './Spacer';
import { OTOSCOPE_BOUNDARY_RADIUS, useMaxImageY } from './dimensions';

type Props = {
  slide: Slide;
  goToCondition: () => void;
};

const SlideView: React.FC<Props> = ({ slide, goToCondition }) => {
  const [showOtoscope, setShowOtoscope] = React.useState(false);
  const [isDiagnosed, setIsDiagnosed] = React.useState(false);
  const [MovableYContainer, moveContainerTo] = useMovableYContainer();

  const maxImageHeight = useMaxImageY();
  const [Draw, openDraw] = useDraw({
    onDrawCloseComplete: () => setIsDiagnosed(false),
    onDrawCloseStart: () => moveContainerTo(0),
    onDrawOpenStart: () => moveContainerTo(maxImageHeight),
  });

  return (
    <React.Fragment>
      <View style={styles.screen}>
        <Spacer />
        <MovableYContainer>
          <Image source={{ uri: slide.img_url }} style={styles.image} />
          {showOtoscope ? <Otoscope /> : null}
        </MovableYContainer>
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
