/** @format */

import React from "react";
import { View, FlatList, StyleSheet, ListRenderItem } from "react-native";
import { COLOURS } from "components/design";
import { Slide } from "model/condition/types";
import { EmptyList } from "./EmptyList";

type Props = {
  slideArray: Slide[];
  renderItem: ListRenderItem<Slide>;
  footer: Element;
  testID?: string;
};

export const SlideList: React.FC<Props> = ({
  slideArray,
  renderItem,
  footer,
  testID,
}) => {
  return (
    <View style={styles.screen} testID={testID}>
      <View style={styles.screen}>
        {slideArray.length ? (
          <FlatList
            data={slideArray}
            keyExtractor={(slide) => slide.id}
            renderItem={renderItem}
          />
        ) : (
          <EmptyList />
        )}
      </View>
      {footer}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "stretch", backgroundColor: COLOURS.veryDark },
});
