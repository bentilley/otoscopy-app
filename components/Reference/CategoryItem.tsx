/** @format */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Category, ConditionHead } from "model/condition/types";
import { OtoText, OtoIcon, COLOURS } from "components/design";

type CategoryItemProps = Category & {
  name: string;
  conditions: ConditionHead[];
  goToCondition: (condition: ConditionHead) => void;
};

/**
 * CategoryItem
 * An expandable list component that groups conditions.
 * @param name - Name of the category.
 * @param conditions - Array of conditions to nest within this category.
 * @param goToCondition - Navigation function to given ConditionView.
 */
export const CategoryItem: React.FC<CategoryItemProps> = ({
  name,
  conditions,
  goToCondition,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <View style={styles.categoryItem}>
          <OtoIcon
            name={isOpen ? "caret-down" : "caret-right"}
            size={28}
            style={{ color: conditions ? COLOURS.grey : COLOURS.dark }}
          />
          <OtoText size="large">{name}</OtoText>
        </View>
      </TouchableOpacity>
      {conditions &&
        isOpen &&
        conditions.map((condition) => {
          return (
            <ConditionItem
              {...condition}
              onPress={() => goToCondition(condition)}
              key={condition.id}
            />
          );
        })}
    </View>
  );
};

type ConditionItemProps = ConditionHead & { onPress: () => void };

/**
 * ConditionItem
 * A list component for a condition. Pressing takes you to the condition page.
 * @param name - Name of the condition.
 * @param onPress - Function for when the list item is pressed.
 */
const ConditionItem: React.FC<ConditionItemProps> = ({ name, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.conditionItem}>
        <OtoText size="medium">{name}</OtoText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: COLOURS.darkGrey,
    borderBottomWidth: 1,
  },
  conditionItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 35,
    backgroundColor: COLOURS.lessDark,
    borderColor: COLOURS.darkGrey,
    borderBottomWidth: 1,
  },
});
