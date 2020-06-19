/** @format */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slide } from 'model/condition/types';
import { COLOURS } from 'components/design';
import { Otoscope } from './Otoscope';
import { Drawer } from './Drawer';
import { MovableContainer } from './MovableContainer';
import { DiagnosisInfo } from './DiagnosisInfo';
import { MainImage } from './MainImage';
import { Spacer } from './Spacer';
import { useMaxImageY } from './dimensions';
import { SlideViewFooter } from './footers';
import { useSlideViewState } from './context';
import { SwipeContainer } from './SwipeContainer';

// TODO Fix Drawer closing bug (not working with swipe)
// TODO Add tap to close gesture to Drawer

type Props = {
  slidePool: Slide[];
  goToCondition: (slide: Slide) => void;
};

export const SlideView: React.FC<Props> = ({ slidePool, goToCondition }) => {
  const { state, update, movableContainer, drawer } = useSlideViewState();
  const maxImageHeight = useMaxImageY();
  const currentSlide = slidePool[state.slideIndex];
  return (
    <React.Fragment>
      <View style={styles.screen}>
        <SwipeContainer>
          <Spacer />
          <MovableContainer>
            <MainImage firebaseRef={'/slide-img/' + currentSlide.id + '.jpg'} />
            {state.showOtoscope ? <Otoscope /> : null}
          </MovableContainer>
          <Spacer
            text={!state.isDiagnosed ? 'Tap to reveal diagnosis' : ''}
            onPress={() => {
              update.setIsDiagnosed(true);
              drawer.openDrawer(() => movableContainer.moveYTo(maxImageHeight));
            }}
          />
          <Drawer
            onCloseComplete={() => update.setIsDiagnosed(false)}
            onCloseStart={() => movableContainer.moveYTo(0)}
            onOpenStart={() => movableContainer.moveYTo(maxImageHeight)}>
            <DiagnosisInfo
              slideId={currentSlide.id}
              condition={currentSlide.condition}
              diagnosis={currentSlide.diagnosis}
            />
          </Drawer>
        </SwipeContainer>
      </View>
      <SlideViewFooter
        slideId={currentSlide.id}
        goToCondition={() => goToCondition(currentSlide)}
        goToNextSlide={() => {
          drawer.closeDrawer(
            () => movableContainer.moveYTo(0),
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
  screen: { flex: 1, backgroundColor: COLOURS.black },
});

export { SlideViewProvider } from './context';
