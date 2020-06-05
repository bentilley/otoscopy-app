/** @format */

import React from 'react';
import { StyleSheet } from 'react-native';
import { COLOURS } from 'components/design';
import { useSlideViewState } from './context';
import { Footer, FooterIcon, FooterText } from 'components';
import { FavouriteStar } from 'components';

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
  goToCondition,
  goToNextSlide,
  slideId,
}) => {
  const { state } = useSlideViewState();
  return state.isDiagnosed ? (
    <DiagnosedFooter
      goToCondition={goToCondition}
      goToNextSlide={goToNextSlide}
    />
  ) : (
    <UndiagnosedFooter slideId={slideId} />
  );
};

interface UndiagnosedFooterProps {
  slideId: string;
}

/**
 * UndiagnosedFooter
 * Footer to display when the slide hasn't been diagnosed.
 */
export const UndiagnosedFooter: React.FC<UndiagnosedFooterProps> = ({
  slideId,
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
      <FooterIcon
        iconName="eardrum"
        colour={COLOURS.grey}
        onPress={() => console.log('pressed')}
      />
    </Footer>
  );
};

interface DiagnosedFooterProps {
  goToCondition: () => void;
  goToNextSlide: () => void;
}

/**
 * DiagnosedFooter
 * Footer to display when the slide has been diagnosed.
 * @param goToCondition - Navigate the app to the condition view.
 * @param goToNextSlide - Navigate the app to the next slide.
 */
export const DiagnosedFooter: React.FC<DiagnosedFooterProps> = ({
  goToCondition,
  goToNextSlide,
}) => {
  return (
    <Footer style={styles.footer}>
      <FooterText text="see condition" onPress={goToCondition} />
      <FooterText text="next" caret="R" onPress={goToNextSlide} />
    </Footer>
  );
};

const styles = StyleSheet.create({
  footer: {
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
});
