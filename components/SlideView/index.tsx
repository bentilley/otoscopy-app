/** @format */

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Slide } from 'model/condition/types';
import { COLOURS } from 'components/design';
import { Otoscope } from './Otoscope';
import { Drawer } from './Draw';
import { MovableYContainer } from './MovableYContainer';
import { DiagnosisInfo } from './DiagnosisInfo';
import { Spacer } from './Spacer';
import { useMaxImageY } from './dimensions';
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
  const { state, update, movableYContainer, drawer } = useSlideViewState();
  const maxImageHeight = useMaxImageY();
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
            drawer.openDrawer(() =>
              movableYContainer.moveContainerTo(maxImageHeight),
            );
          }}
        />
        <Drawer
          onCloseComplete={() => update.setIsDiagnosed(false)}
          onCloseStart={() => movableYContainer.moveContainerTo(0)}
          onOpenStart={() => movableYContainer.moveContainerTo(maxImageHeight)}>
          <DiagnosisInfo
            slideId={slide.id}
            condition={slide.condition}
            diagnosis={slide.diagnosis}
          />
        </Drawer>
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
