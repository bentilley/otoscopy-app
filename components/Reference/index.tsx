/** @format */

import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
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
      <ReferenceFooter goToFavourites={goToFavourites} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLOURS.dark,
  },
});

export default Reference;
