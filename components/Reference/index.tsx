/** @format */

import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Category, Condition } from 'model/condition/types';
import { useConditions, useConditionsActions } from 'model/condition';
import { Footer } from 'components';
import { OtoText, OtoIcon, COLOURS } from 'components/design';
import { categoryData } from './__mocks__/category-data';

type Props = {
  goToCondition: (condition: Condition) => void;
};

const Reference: React.FC<Props> = ({ goToCondition }) => {
  const { getCategories } = useConditions();
  const { fetchCondition } = useConditionsActions();

  /* const categories = getCategories(); */
  const categories = categoryData;

  const fetchAndgoToCondition = (condition: Condition) => {
    fetchCondition(condition);
    goToCondition(condition);
  };

  return (
    <React.Fragment>
      <ScrollView style={styles.screen}>
        {categories.map((category) => (
          <CategoryItem
            {...category}
            goToCondition={fetchAndgoToCondition}
            key={category.name}
          />
        ))}
      </ScrollView>
      <Footer />
    </React.Fragment>
  );
};

type CategoryItemProps = Category & Props;

const CategoryItem: React.FC<CategoryItemProps> = ({
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
            name={isOpen ? 'caret-down' : 'caret-right'}
            size={28}
            style={{ color: COLOURS.grey }}
          />
          <OtoText size="large">{name}</OtoText>
        </View>
      </TouchableOpacity>
      {isOpen &&
        conditions.map((condition) => {
          const onPress = () => goToCondition(condition);
          return (
            <ConditionItem
              {...condition}
              onPress={onPress}
              key={condition.id}
            />
          );
        })}
    </View>
  );
};

type ConditionItemProps = Condition & { onPress: () => void };

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
  screen: {
    flex: 1,
    backgroundColor: COLOURS.dark,
  },
  categoryItem: {
    flexDirection: 'row',
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

export default Reference;
