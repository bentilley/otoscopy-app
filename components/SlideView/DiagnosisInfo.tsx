/** @format */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { OtoText } from 'components/design';
import { FavouriteStar } from 'components';

/**
 * DiagnosisInfo
 * Information shown when a user diagnoses a slide.
 * @param slideId - The ID of the slide.
 * @param condition - The name of the condition for this slide.
 * @param diagnosis - The diagnosis information for this slide.
 */
export const DiagnosisInfo: React.FC<DiagnosisInfoProps> = ({
  slideId,
  condition,
  diagnosis,
}) => {
  return (
    <View>
      <View style={styles.title}>
        <OtoText size="large" weight="semibold">
          {condition}
        </OtoText>
        <FavouriteStar slideId={slideId} size={30} style={styles.star} />
      </View>
      <View style={styles.body}>
        <OtoText size="medium">{diagnosis}</OtoText>
      </View>
    </View>
  );
};

type DiagnosisInfoProps = {
  slideId: string;
  condition: string;
  diagnosis: string;
};

const styles = StyleSheet.create({
  title: { flexDirection: 'row', alignItems: 'center', paddingTop: 10 },
  body: { paddingTop: 20 },
  star: { paddingLeft: 10 },
});
