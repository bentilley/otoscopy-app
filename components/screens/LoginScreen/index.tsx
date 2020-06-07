/** @format */

import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  Button,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { OtoText, COLOURS } from 'components/design';

type Props = {};

export const LoginScreen: React.FC<Props> = () => {
  const windowWidth = useWindowDimensions().width;
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.screen]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.container, { width: 0.7 * windowWidth }]}>
          <View>
            <OtoText size="large" weight="bold">
              OtoApp
            </OtoText>
          </View>
          <View style={styles.inputContainer}>
            <OtoText size="medium" weight="semibold">
              Login
            </OtoText>
            <TextInput
              textContentType="name"
              style={styles.input}
              placeholder="user name"
              placeholderTextColor={COLOURS.grey}
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
            <TextInput
              textContentType="password"
              secureTextEntry={true}
              style={styles.input}
              placeholder="password"
              placeholderTextColor={COLOURS.grey}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Create User"
                onPress={() => {
                  console.log('new user');
                  console.log(userName, password);
                }}
                color={COLOURS.grey}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Sign In"
                onPress={() => {
                  console.log('signin!');
                  console.log(userName, password);
                }}
                color={COLOURS.primary}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOURS.black,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  inputContainer: { paddingTop: 40 },
  input: {
    backgroundColor: COLOURS.dark,
    color: COLOURS.grey,
    height: 40,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  button: {},
});
