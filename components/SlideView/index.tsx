/** @format */

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Slide } from 'model/condition/types';
import { COLOURS } from 'components/design';
import { Otoscope } from './Otoscope';
import { useDraw } from './Draw';
import { useMovableYContainer } from './MovableYContainer';
import { DiagnosisInfo } from './DiagnosisInfo';
import { Spacer } from './Spacer';
import { OTOSCOPE_BOUNDARY_RADIUS, useMaxImageY } from './dimensions';
import { SlideViewFooter } from './footers';
import { useSlideViewState } from './context';

type Props = {
  slide: Slide;
  goToCondition: () => void;
  goToNextSlide: () => void;
};

export const SlideView: React.FC<Props> = ({
  slide,
  goToCondition,
  goToNextSlide,
}) => {
  const { state, update } = useSlideViewState();
  const [MovableYContainer, moveContainerTo] = useMovableYContainer();
  const maxImageHeight = useMaxImageY();
  const [Draw, openDraw] = useDraw({
    onDrawCloseComplete: () => update.setIsDiagnosed(false),
    onDrawCloseStart: () => moveContainerTo(0),
    onDrawOpenStart: () => moveContainerTo(maxImageHeight),
  });
  return (
    <React.Fragment>
      <View style={styles.screen}>
        <Spacer />
        <MovableYContainer>
          <Image source={{ uri: slide.img_url }} style={styles.image} />
          {state.showOtoscope ? <Otoscope /> : null}
        </MovableYContainer>
        <Spacer
          text={!state.isDiagnosed ? 'Tap to reveal diagnosis' : ''}
          onPress={() => {
            update.setIsDiagnosed(true);
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
      <SlideViewFooter
        slideId={slide.id}
        goToCondition={goToCondition}
        goToNextSlide={goToNextSlide}
      />
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
  image: {
    width: OTOSCOPE_BOUNDARY_RADIUS * 2,
    height: OTOSCOPE_BOUNDARY_RADIUS * 2,
  },
});

export { SlideViewProvider } from './context';
