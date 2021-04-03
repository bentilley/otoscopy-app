/** @format */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLOURS, OtoText, OtoIcon } from "components/design";
import { useConditionsActions } from "model/condition";

type Props = { slideId: string };

/** RemoveFavourite
 *
 * A button for removing slides from a user's favourites.
 *
 * @param slideId - the ID of the slide that this button relates to.
 */
export const RemoveFavourite: React.FC<Props> = ({ slideId }) => {
  const { removeFromFavourites } = useConditionsActions();
  const [userHasPressed, setUserHasPressed] = React.useState(false);
  const text = userHasPressed ? "sure?" : "remove";

  const handlePress = () => {
    if (userHasPressed) {
      removeFromFavourites(slideId);
    } else {
      setUserHasPressed(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.removeBtn}>
        <View style={styles.icon}>
          <OtoIcon name="close" size={11} color={COLOURS.error} />
        </View>
        <OtoText size="small">
          <Text style={{ color: COLOURS.error }}>{text}</Text>
        </OtoText>
      </TouchableOpacity>
      {userHasPressed && (
        <TouchableOpacity onPress={() => setUserHasPressed(false)}>
          <OtoText size="small">
            <Text style={{ color: COLOURS.primary }}>undo</Text>
          </OtoText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", paddingVertical: 4 },
  removeBtn: { flexDirection: "row", alignItems: "center", marginRight: 10 },
  icon: { marginRight: 5 },
});
