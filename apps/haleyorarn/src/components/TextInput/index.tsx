import React from 'react';
import {Text, View, TextInput as RT, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    paddingHorizontal: 10,
    flex: 1,
    height: 60,
  },
  inputContainer: {
    borderRadius: 16,
    elevation: 20,
    shadowColor: 'grey',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  suffix: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

interface TextInputProps extends React.ComponentProps<typeof RT> {
  label?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
}

const TextInput = ({label, suffix, prefix, ...rest}: TextInputProps) => {
  return (
    <View style={styles.container}>
      {label && <Text>{label}</Text>}
      <View style={[styles.inputContainer]}>
        {suffix && <View style={styles.suffix}>{suffix}</View>}
        <RT style={styles.input} {...rest} />
        {prefix && <View style={styles.suffix}>{prefix}</View>}
      </View>
    </View>
  );
};

export default TextInput;
