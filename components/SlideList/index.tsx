/** @format */

import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import { slideData } from './__mocks__/slide-data';
import { COLOURS, OtoText, OtoIcon } from 'components/design';

type Props = {
  text: string;
  goToSlide: (slide: Slide) => void;
};

const SlideList: React.FC<Props> = ({ text, goToSlide }) => {
  return (
    <View style={styles.screen}>
      <FlatList
        data={slideData}
        keyExtractor={(item) => item.thumbnail_url}
        renderItem={({ item }) => (
          <SlideListItem slide={item} onPress={() => goToSlide(item)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'stretch', backgroundColor: COLOURS.veryDark },
});

type SlideListItemProps = {
  slide: Slide;
  onPress: () => void;
};

type Slide = {
  condition: string;
  diagnosis: string;
  diagram: string;
  img_url: string;
  legend: {
    [index: string]: string;
  };
  thumbnail_url: string;
};

const SlideListItem: React.FC<SlideListItemProps> = ({ slide, onPress }) => {
  return (
    <View style={slideListItemStyles.container}>
      <View style={slideListItemStyles.imageContainer}>
        <OtoText size="medium">IMG</OtoText>
      </View>
      <View style={slideListItemStyles.infoContainer}>
        <View style={slideListItemStyles.infoHeader}>
          <View>
            <OtoText size="medium">{slide.condition}</OtoText>
          </View>
          <View>
            <TouchableOpacity
              onPress={onPress}
              style={slideListItemStyles.viewSlideButton}>
              <OtoText size="small">view slide</OtoText>
              <OtoIcon name="caret-right" size={30} color={COLOURS.grey} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={slideListItemStyles.infoText}>
          <OtoText size="small">{slide.diagnosis}</OtoText>
        </View>
      </View>
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
  infoContainer: { flex: 5 },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  viewSlideButton: { flexDirection: 'row', alignItems: 'center' },
  infoText: { paddingVertical: 6 },
});

export default SlideList;
