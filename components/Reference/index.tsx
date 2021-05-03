/** @format */

import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import levenshtein from "js-levenshtein";
import { Category, ConditionHead } from "model/condition/types";
import { CategoryItem } from "./CategoryItem";
import { COLOURS } from "components/design";
import { ReferenceFooter } from "./footer";

type Props = {
  categories: Category[];
  goToCondition: (condition: ConditionHead) => void;
  goToFavourites: () => void;
};

const Reference: React.FC<Props> = ({
  categories,
  goToCondition,
  goToFavourites,
}) => {
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  if (showSearch && searchTerm !== "") {
    categories = filterSearch(categories, searchTerm);
  }
  return (
    <View style={styles.screen} testID="reference-screen">
      <ScrollView>
        {categories.map((category) => (
          <CategoryItem
            {...category}
            goToCondition={goToCondition}
            key={category.name}
          />
        ))}
      </ScrollView>
      <ReferenceFooter
        showSearch={showSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        goToFavourites={goToFavourites}
        toggleSearch={() => setShowSearch(!showSearch)}
      />
    </View>
  );
};

const filterSearch = (
  categories: Category[],
  searchTerm: string,
): Category[] => {
  return categories.map(({ name, conditions }) => ({
    name,
    conditions: conditions.filter((condition) =>
      matches(condition, searchTerm),
    ),
  }));
};

/** Determine whether the search term is what the user is looking for.
 *
 * The general principle here is to look at the ratio between the edit distance
 * (levenshtein distance) and the number of character left for the user to type
 * to complete the name.
 *
 * @param name - The name of the condition.
 * @param searchTerm - The current user search term.
 * @returns Whether the condition name matches the search term.
 */
const matches = ({ name }: ConditionHead, searchTerm: string) => {
  const THRESHOLD = 1.05;
  const distance = levenshtein(name.toLowerCase(), searchTerm);
  const remainder = name.length - searchTerm.length;
  const score = distance / remainder;
  return score <= THRESHOLD;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLOURS.dark,
  },
});

export default Reference;
