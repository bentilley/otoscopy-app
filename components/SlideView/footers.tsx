/** @format */

import React from "react";
import { StyleSheet } from "react-native";
import { COLOURS } from "components/design";
import { useSlideViewState } from "./context";
import { Footer, FooterIcon, FooterText } from "components/Footer";
import { FavouriteStar } from "components/Footer/icons";

interface SlideViewFooterProps
  extends DiagnosedFooterProps,
    UndiagnosedFooterProps {}

/**
 * SlideViewFooter
 * Smart footer for the SlideView which handles displaying the correct footer.
 * @param slideId = ID of the slide being viewed.
 * @param goToCondition - Navigate the app to the condition view.
 * @param goToNextSlide - Navigate the app to the next slide.
 */
export const SlideViewFooter: React.FC<SlideViewFooterProps> = ({
  goToNextSlide,
  slideId,
  hasOverlay,
  toggleOverlay,
}) => {
  const { state } = useSlideViewState();
  return state.isDiagnosed ? (
    <DiagnosedFooter goToNextSlide={goToNextSlide} />
  ) : (
    <UndiagnosedFooter
      slideId={slideId}
      hasOverlay={hasOverlay}
      toggleOverlay={toggleOverlay}
    />
  );
};

interface UndiagnosedFooterProps {
  slideId: string;
  hasOverlay?: boolean;
  toggleOverlay: () => void;
}

// TODO Set up diagram view
/**
 * UndiagnosedFooter
 * Footer to display when the slide hasn't been diagnosed.
 */
export const UndiagnosedFooter: React.FC<UndiagnosedFooterProps> = ({
  slideId,
  hasOverlay,
  toggleOverlay,
}) => {
  const { state, update } = useSlideViewState();
  return (
    <Footer style={styles.footer}>
      <FooterIcon
        iconName="otoscope"
        colour={state.showOtoscope ? COLOURS.primary : COLOURS.grey}
        onPress={() => update.setShowOtoscope(!state.showOtoscope)}
      />
      <FavouriteStar slideId={slideId} />
      {hasOverlay ? (
        <FooterIcon
          iconName="eardrum"
          colour={state.showOverlay ? COLOURS.primary : COLOURS.grey}
          onPress={toggleOverlay}
          testID="slide-view__overlay-btn"
        />
      ) : (
        <FooterIcon
          iconName="eardrum"
          colour={COLOURS.dark}
          onPress={() => console.log("Slide has no overlay!")}
        />
      )}
    </Footer>
  );
};

interface DiagnosedFooterProps {
  goToNextSlide: () => void;
}

/**
 * DiagnosedFooter
 * Footer to display when the slide has been diagnosed.
 * @param goToCondition - Navigate the app to the condition view.
 * @param goToNextSlide - Navigate the app to the next slide.
 */
export const DiagnosedFooter: React.FC<DiagnosedFooterProps> = ({
  goToNextSlide,
}) => {
  return (
    <Footer style={styles.footerRight}>
      <FooterText text="next" caret="R" onPress={goToNextSlide} />
    </Footer>
  );
};

const styles = StyleSheet.create({
  footer: {
    justifyContent: "space-around",
  },
  footerRight: {
    justifyContent: "flex-end",
  },
});
