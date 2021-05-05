/** @format */

import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { OtoText, OtoIcon, TitleLogo, COLOURS } from "components/design";

type Props = {
  goToReference: () => void;
  goToFavourites: () => void;
  goToContactUs: () => void;
  signOutUser: () => void;
};

export const Menu: React.FC<Props> = (props) => {
  // TODO Create About Us page and add to menu
  // <MenuItem onPress={() => console.log("Go to About")} icon="info">
  //   About
  // </MenuItem>
  return (
    <View style={styles.menuScreen}>
      <TitleLogo />
      <View style={styles.menuItemContainer}>
        <MenuItem onPress={props.goToReference} icon="stethoscope">
          Conditions
        </MenuItem>
        <MenuItem
          onPress={() => {
            throw new Error("Sentry Testing");
          }}
          icon="risks">
          Error
        </MenuItem>
        <MenuItem onPress={props.goToFavourites} icon="star-o">
          Favourites
        </MenuItem>
        <MenuItem onPress={props.goToContactUs} icon="ear">
          Contact Us
        </MenuItem>
        <MenuItem onPress={props.signOutUser} icon="sign-out">
          Sign Out
        </MenuItem>
      </View>
    </View>
  );
};

type MenuItemProps = {
  icon: string;
  onPress: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({ children, icon, onPress }) => {
  const text = children ? children.toString() : "";
  return (
    <View style={styles.menuButtonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.menuBtn}>
        <View style={styles.menuBtnIcon}>
          <OtoIcon name={icon} size={30} color={COLOURS.lightGrey} />
        </View>
        <View style={styles.menuBtnText}>
          <OtoText size="large" weight="semibold">
            {text}
          </OtoText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuScreen: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: COLOURS.black,
  },
  menuItemContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  menuButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  menuBtn: {
    flexBasis: "50%",
    flexDirection: "row",
  },
  menuBtnIcon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  menuBtnText: {
    flex: 3,
    justifyContent: "center",
  },
});
