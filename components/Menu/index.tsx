/** @format */

import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

type Props = {
  goToReference: () => void;
  goToFavourites: () => void;
  goToBrowse: () => void;
};

const Menu: React.FC<Props> = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Menu</Text>
      <Button title="Conditions" onPress={props.goToReference} />
      <Button title="Favourites" onPress={props.goToFavourites} />
      <Button title="Random Browse" onPress={props.goToBrowse} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default Menu;
