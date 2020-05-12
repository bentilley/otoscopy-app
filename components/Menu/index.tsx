import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  name?: string;
};

export const Menu: React.FC<Props> = () => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};
