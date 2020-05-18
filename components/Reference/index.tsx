/** @format */

import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useConditions } from 'model/condition';
import { OtoText, COLOURS } from 'components/design';

type Props = {
  goToCondition: (condition: string) => void;
};

const Reference: React.FC<Props> = (props) => {
  const { categories } = useConditions();
  console.log(categories);
  return (
    <View style={styles.screen}>
      <OtoText size={'large'}>Reference</OtoText>
      <Button title="condition A" onPress={() => props.goToCondition('A')} />
      <Button title="condition B" onPress={() => props.goToCondition('B')} />
      <Button title="condition C" onPress={() => props.goToCondition('C')} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOURS.black,
  },
});

export default Reference;
