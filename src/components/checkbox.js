import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CheckBox } from 'react-native-elements';

export default function Checkbox(props) {
  const [isSelected, setSelection] = useState(false);

  const updateValue = () => {
    setSelection(!isSelected);
    props.saveSelected(isSelected, props.label);
  };

  return (
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={isSelected}
          onPress={updateValue}
          style={styles.checkbox}
          title={props.label}
        />
      </View>
  );
}

const styles = StyleSheet.create({
 
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
