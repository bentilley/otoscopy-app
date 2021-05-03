/** @format */

import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { OtoText, OtoIcon, COLOURS } from "components/design";

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
      <MenuTitle />
      <MenuItem onPress={props.goToReference} icon="stethoscope">
        Conditions
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
  );
};

const MenuTitle: React.FC = () => {
  return (
    <View style={styles.title}>
      <Image
        source={require("../../img/title-logo.png")}
        resizeMode="contain"
        style={styles.titleImg}
      />
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
  title: { flexDirection: "row", alignItems: "center", padding: 40 },
  titleImg: { flex: 1 },
  menuButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 25,
  },
  menuBtn: {
    flexBasis: "50%",
    flexDirection: "row",
    backgroundColor: COLOURS.veryDark,
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
