/** @format */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLOURS } from 'components/design';

type Props = {
  img: Element;
  content: Element;
  backgroundColor?: string;
};

/**
 * ListItemContainer
 * A generic container for creating items for slide lists.
 * @param img - the image component to display;
 * @param content - the text content of the list item;
 * @param backgroundColor - the color of the whole list item.
 */
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
    borderBottomColor: COLOURS.dark,
    borderBottomWidth: 1,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  contentContainer: { flex: 1, paddingLeft: 6 },
});
