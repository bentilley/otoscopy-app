/** @format */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { OtoText, OtoIcon, COLOURS } from 'components/design';
import { useSlideViewState } from './context';
import { Footer, FooterIcon } from 'components';
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
    <Footer>
      <View style={styles.footer}>
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
      </View>
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
    <Footer>
      <View style={styles.footer}>
        <TouchableOpacity onPress={goToCondition}>
          <OtoText size="medium" weight="semibold">
            see condition
          </OtoText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToNextSlide}
          style={styles.footerTextContainer}>
          <OtoText size="medium" weight="semibold">
            next
          </OtoText>
          <OtoIcon name="caret-right" size={30} color={COLOURS.grey} />
        </TouchableOpacity>
      </View>
    </Footer>
  );
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerTextContainer: { flexDirection: 'row', alignItems: 'center' },
});
