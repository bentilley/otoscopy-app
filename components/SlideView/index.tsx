/** @format */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slide } from 'model/condition/types';
import { COLOURS } from 'components/design';
import { Otoscope } from './Otoscope';
import { Drawer } from './Draw';
import { MovableYContainer } from './MovableYContainer';
import { DiagnosisInfo } from './DiagnosisInfo';
import { SlideImage } from './SlideImage';
import { Spacer } from './Spacer';
import { useMaxImageY } from './dimensions';
import { SlideViewFooter } from './footers';
import { useSlideViewState } from './context';

type Props = {
  slidePool: Slide[];
  startingIndex: number;
  goToCondition: (slide: Slide) => void;
};

export const SlideView: React.FC<Props> = ({
  slidePool,
  startingIndex,
  goToCondition,
}) => {
  const { state, update, movableYContainer, drawer } = useSlideViewState();
  const maxImageHeight = useMaxImageY();
  const numSlides = slidePool.length;
  React.useEffect(() => {
    update.setSlideIndex(startingIndex);
    update.setNumSlides(numSlides);
  }, [startingIndex, update, numSlides]);
  return (
    <React.Fragment>
      <View style={styles.screen}>
        <Spacer />
        <MovableYContainer>
          <SlideImage slideId={slidePool[state.slideIndex].id} />
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
            slideId={slidePool[state.slideIndex].id}
            condition={slidePool[state.slideIndex].condition}
            diagnosis={slidePool[state.slideIndex].diagnosis}
          />
        </Drawer>
      </View>
      <SlideViewFooter
        slideId={slidePool[state.slideIndex].id}
        goToCondition={() => goToCondition(slidePool[state.slideIndex])}
        goToNextSlide={() => {
          update.incrementSlideIndex();
          drawer.closeDrawer(
            () => movableYContainer.moveContainerTo(0),
            () => update.setIsDiagnosed(false),
          );
        }}
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
});

export { SlideViewProvider } from './context';
