/** @format */

import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./index";
import { OtoIcon, COLOURS } from "components/design";

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export const MenuButton: React.FC<Props> = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
      <View style={styles.menuButton} testID="menu-button">
        <OtoIcon name="menu" size={40} style={{ color: COLOURS.grey }} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuButton: { paddingHorizontal: 10 },
});
