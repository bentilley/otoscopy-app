/** @format */

import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { OtoText, COLOURS } from '../design';

type Props = {
  goToReference: () => void;
  goToFavourites: () => void;
  goToBrowse: () => void;
};

const Menu: React.FC<Props> = (props) => {
  return (
    <View style={styles.menuScreen}>
      <MenuTitle>Otoscopy App</MenuTitle>
      <MenuItem onPress={props.goToReference}>Conditions</MenuItem>
      <MenuItem onPress={props.goToFavourites}>Favourites</MenuItem>
      <MenuItem onPress={props.goToBrowse}>Random Browse</MenuItem>
    </View>
  );
};

const MenuTitle: React.FC = ({ children }) => {
  return (
    <View style={styles.title}>
      <OtoText size="large">{children}</OtoText>
    </View>
  );
};

type MenuItemProps = {
  onPress: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({ children, onPress }) => {
  const text = children ? children.toString() : '';
  return (
    <View style={styles.menuButtonContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.menuButton}>
          <OtoText size="medium">{text}</OtoText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuScreen: { flex: 1, backgroundColor: COLOURS.black },
  title: { alignItems: 'center', padding: 30 },
  menuButton: {
    alignItems: 'center',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: COLOURS.lessDark,
    borderRadius: 2,
    backgroundColor: COLOURS.verDark,
  },
  menuButtonContainer: { paddingHorizontal: 30, paddingVertical: 10 },
});

export default Menu;
