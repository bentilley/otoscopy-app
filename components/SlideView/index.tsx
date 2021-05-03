/** @format */

import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Slide } from "model/condition/types";
import { COLOURS, OtoText, TitleLogo } from "components/design";
import { Otoscope } from "./Otoscope";
import { Drawer } from "./Drawer";
import { MovableContainer } from "./MovableContainer";
import { DiagnosisInfo } from "./DiagnosisInfo";
import { MainImage } from "./MainImage";
import { Overlay } from "./Overlay";
import { Legend } from "./Legend";
import { Spacer } from "./Spacer";
import { useMaxImageY } from "./dimensions";
import { SlideViewFooter } from "./footers";
import { useSlideViewState } from "./context";
import { SwipeContainer } from "./SwipeContainer";
import { useImageSize } from "./dimensions";

type Props = {
  showTitle: boolean | undefined;
  slidePool: Slide[];
  goToCondition: (slide: Slide) => void;
};

export const SlideView: React.FC<Props> = ({
  showTitle,
  slidePool,
  goToCondition,
}) => {
  const {
    state,
    update,
    movableContainer,
    drawer,
    title,
  } = useSlideViewState();
  const maxImageHeight = useMaxImageY();
  const imageSize = useImageSize();
  const currentSlide = slidePool[state.slideIndex];
  return (
    <View style={styles.screen} testID="slide-view-screen">
      <View style={styles.screen}>
        <SwipeContainer
          onSwipeRightComplete={() => {
            drawer.setHeight(0);
            movableContainer.setY(0);
            update.incrementSlideIndex();
            update.setIsDiagnosed(false);
            title.hide({ timeout: 60 });
          }}
          onSwipeLeftComplete={() => {
            drawer.setHeight(0);
            movableContainer.setY(0);
            update.decrementSlideIndex();
            update.setIsDiagnosed(false);
            title.hide({ timeout: 60 });
          }}>
          <Spacer>{showTitle ? <TemporaryTitleLogo /> : null}</Spacer>
          <MovableContainer>
            <MainImage
              size={imageSize}
              firebaseRef={"/slide-img/" + currentSlide.id + ".jpg"}
            />
            {state.showOverlay ? (
              <Overlay
                size={imageSize}
                firebaseRef={"/overlay/" + currentSlide.id + ".png"}
              />
            ) : null}
            {state.showOtoscope ? <Otoscope radius={imageSize / 2} /> : null}
          </MovableContainer>
          <Spacer
            onPress={() => {
              update.setIsDiagnosed(true);
              drawer.openDrawer(() => movableContainer.moveYTo(maxImageHeight));
            }}>
            <OtoText size="large" weight="semibold" align="center">
              {!state.isDiagnosed && !state.showOverlay
                ? "Tap to reveal diagnosis"
                : ""}
            </OtoText>
          </Spacer>
          <Drawer
            onCloseComplete={() => {
              update.setIsDiagnosed(false);
              update.setShowOverlay(false);
            }}
            onCloseStart={() => movableContainer.moveYTo(0)}
            onOpenStart={() => movableContainer.moveYTo(maxImageHeight)}>
            {state.showOverlay && <Legend legend={currentSlide.legend || {}} />}
            {state.isDiagnosed && (
              <DiagnosisInfo
                slideId={currentSlide.id}
                condition={currentSlide.condition}
                diagnosis={currentSlide.diagnosis}
                goToCondition={() => goToCondition(currentSlide)}
              />
            )}
          </Drawer>
        </SwipeContainer>
      </View>
      <SlideViewFooter
        slideId={currentSlide.id}
        hasOverlay={currentSlide.hasOverlay}
        goToNextSlide={() => {
          drawer.closeDrawer(
            () => movableContainer.moveYTo(0),
            () => {
              update.incrementSlideIndex();
              update.setIsDiagnosed(false);
            },
          );
        }}
        toggleOverlay={() => {
          if (state.showOverlay) {
            drawer.closeDrawer(
              () => movableContainer.moveYTo(0),
              () => update.setShowOverlay(false),
            );
          } else {
            drawer.openDrawer(() => {
              movableContainer.moveYTo(maxImageHeight);
              update.setShowOverlay(true);
            });
          }
        }}
      />
    </View>
  );
};

const TemporaryTitleLogo: React.FC = () => {
  const { title } = useSlideViewState();
  return (
    <Animated.View style={{ opacity: title.opacity }}>
      <TitleLogo />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLOURS.black },
});

export { SlideViewProvider } from "./context";
