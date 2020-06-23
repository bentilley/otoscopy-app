/** @format */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slide } from 'model/condition/types';
import { COLOURS } from 'components/design';
import { Otoscope } from './Otoscope';
import { Drawer } from './Draw';
import { MovableYContainer } from './MovableYContainer';
import { DiagnosisInfo } from './DiagnosisInfo';
import { SlideImage } from 'components/UI';
import { Spacer } from './Spacer';
import { useMaxImageY, OTOSCOPE_BOUNDARY_RADIUS } from './dimensions';
import { SlideViewFooter } from './footers';
import { useSlideViewState } from './context';

// TODO Fix Drawer closing bug (not working with swipe)
// TODO Add tap to close gesture to Drawer

type Props = {
  slidePool: Slide[];
  goToCondition: (slide: Slide) => void;
};

export const SlideView: React.FC<Props> = ({ slidePool, goToCondition }) => {
  const { state, update, movableYContainer, drawer } = useSlideViewState();
  const maxImageHeight = useMaxImageY();
  return (
    <React.Fragment>
      <View style={styles.screen}>
        <Spacer />
        <MovableYContainer>
          <SlideImage
            firebaseRef={
              '/slide-img/' + slidePool[state.slideIndex].id + '.jpg'
            }
            width={OTOSCOPE_BOUNDARY_RADIUS * 2}
            height={OTOSCOPE_BOUNDARY_RADIUS * 2}
          />
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
          drawer.closeDrawer(
            () => movableYContainer.moveContainerTo(0),
            () => {
              update.incrementSlideIndex();
              update.setIsDiagnosed(false);
            },
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
