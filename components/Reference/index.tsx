/** @format */

import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useConditions, Category, Condition } from 'model/condition';
import { Footer } from 'components';
import { OtoText, OtoIcon, COLOURS } from 'components/design';

type Props = {
  goToCondition: (condition: string) => void;
};

const Reference: React.FC<Props> = ({ goToCondition }) => {
  /* const { categories } = useConditions(); */
  let cat = [
    {
      name: 'Diseases of the middle ear',
      conditions: [
        { name: 'Otitis Media', id: 'AA' },
        { name: 'Hurty Drum', id: 'AB' },
      ],
    },
    {
      name: 'Benitis of the ears',
      conditions: [{ name: 'Banging Ben Bones', id: 'BA' }],
    },
    {
      name: 'Olly Earholes',
      conditions: [{ name: 'Octagon ear Ollifilus', id: 'CA' }],
    },
  ];
  return (
    <React.Fragment>
      <ScrollView style={styles.screen}>
        {cat.map((category) => (
          <CategoryItem
            {...category}
            goToCondition={goToCondition}
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
          const onPress = () => goToCondition(condition.name);
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
