/** @format */

import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Footer, FooterIcon, FooterText } from "components/Footer";
import { COLOURS } from "components/design";

type Props = {
  showSearch: boolean;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  goToFavourites: () => void;
  toggleSearch: () => void;
};

export const ReferenceFooter: React.FC<Props> = ({
  showSearch,
  searchTerm,
  setSearchTerm,
  toggleSearch,
  goToFavourites,
}) => {
  return (
    <Footer style={styles.footer}>
      {showSearch ? (
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      ) : (
        <FooterText text="favourites" caret="L" onPress={goToFavourites} />
      )}
      <FooterIcon
        iconName="search"
        colour={COLOURS.grey}
        onPress={toggleSearch}
        testID="reference__search"
      />
    </Footer>
  );
};

const SearchInput: React.FC<{
  searchTerm: string;
  setSearchTerm: (val: string) => void;
}> = ({ searchTerm, setSearchTerm }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="search"
        placeholderTextColor={COLOURS.dark}
        value={searchTerm}
        onChangeText={setSearchTerm}
        autoCapitalize="none"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  inputContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flex: 1,
  },
  input: {
    flex: 1,
    alignItems: "stretch",
    paddingHorizontal: 10,
    fontSize: 20,
    color: COLOURS.grey,
    backgroundColor: COLOURS.black,
    borderColor: COLOURS.dark,
    borderWidth: 1,
  },
});
