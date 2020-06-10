/** @format */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLOURS } from 'components/design';

type Props = {
  img: Element;
  content: Element;
  backgroundColor?: string;
};

export const ListItemContainer: React.FC<Props> = ({
  img,
  content,
  backgroundColor,
}) => {
  return (
    <View style={[slideListItemStyles.container, { backgroundColor }]}>
      <View style={slideListItemStyles.imageContainer}>{img}</View>
      <View style={slideListItemStyles.contentContainer}>{content}</View>
    </View>
  );
};

const slideListItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    height: 120,
    borderBottomColor: COLOURS.dark,
    borderBottomWidth: 1,
  },
  imageContainer: { flex: 2, alignItems: 'center', justifyContent: 'center' },
  contentContainer: { flex: 5, paddingLeft: 6 },
});
