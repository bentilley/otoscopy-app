/** @format */

import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Slide } from 'model/condition/types';
import { OtoText, OtoIcon, COLOURS } from 'components/design';
import Otoscope, { OTOSCOPE_BOUNDARY_RADIUS } from './Otoscope';
import { Footer } from 'components';

type Props = {
  slide: Slide;
  goToCondition: () => void;
};

const action = () => {
  console.log('press');
};

const SlideView: React.FC<Props> = ({ slide, goToCondition }) => {
  const [showOtoscope, setShowOtoscope] = React.useState(true);
  const [isFavourite, setIsFavourite] = React.useState(false);
  return (
    <React.Fragment>
      <View style={styles.screen}>
        <View style={styles.spacer}>
          <OtoText size="large" weight="bold">
            Tap to reveal diagnosis
          </OtoText>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: slide.img_url }} style={styles.image} />
          {showOtoscope ? <Otoscope /> : null}
        </View>
        <View style={styles.spacer} />
      </View>
      <Footer>
        <View style={styles.footer}>
          <FooterIcon
            iconName="otoscope"
            colour={showOtoscope ? COLOURS.primary : COLOURS.grey}
            onPress={() => setShowOtoscope(!showOtoscope)}
          />
          <FooterIcon
            iconName={isFavourite ? 'star' : 'star-o'}
            colour={isFavourite ? COLOURS.favourite : COLOURS.grey}
            onPress={() => setIsFavourite(!isFavourite)}
          />
          <FooterIcon
            iconName="eardrum"
            colour={COLOURS.grey}
            onPress={action}
          />
        </View>
      </Footer>
    </React.Fragment>
  );
};

type FooterIconProps = {
  iconName: string;
  colour: string;
  onPress: () => void;
};
const FooterIcon: React.FC<FooterIconProps> = ({
  iconName,
  colour,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <OtoIcon name={iconName} size={40} color={colour} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOURS.black,
  },
  imageContainer: { justifyContent: 'center' },
  image: {
    width: OTOSCOPE_BOUNDARY_RADIUS * 2,
    height: OTOSCOPE_BOUNDARY_RADIUS * 2,
  },
  spacer: { flex: 1, justifyContent: 'center' },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default SlideView;
