import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface DropDownProps {
  placeholder?: string;
  items: {label: string; value: string}[];
  onChange?: (value: string) => void;
}

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 16,
    elevation: 20,
    height: 60,
    borderWidth: 0,
    paddingVertical: 10,
    marginVertical: 10,
    shadowColor: 'grey',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  modalContainer: {
    borderWidth: 0,
    marginVertical: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  textStyle: {
    color: 'grey',
  },
});

const DropDown = (props: DropDownProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState(props.items);

  useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  useEffect(() => {
    if (value && props.onChange) {
      props.onChange(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <DropDownPicker
      items={items}
      dropDownContainerStyle={styles.modalContainer}
      style={styles.inputContainer}
      textStyle={styles.textStyle}
      placeholder={props.placeholder ?? 'Please Select'}
      open={open}
      value={value}
      disableBorderRadius
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
};

export default DropDown;
