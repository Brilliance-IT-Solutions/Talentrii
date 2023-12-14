import react, {useState} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {IMAGES} from '../../../constants/images';
import colors from '../../../assets/themes/colors';

const CustomDropdown = props => {
  const [dropdown, setDropdown] = useState(null);

  const onChange = item => {
    setDropdown(item);
    props.onChange(item);
  };

  const _renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.title}</Text>
        <Text style={styles.textdescription}>{item.description}</Text>
      </View>
    );
  };
  return (
    <View style={styles.rootcontainer}>
      <Image source={IMAGES.CALENDER_ICON} style={{marginVertical: 6}} />
      <View style={{flex: 6, marginLeft: 15.5}}>
        <Dropdown
          style={styles.dropdown}
          data={props.dropdownData}
          labelField="title"
          valueField="id"
          placeholder={props.placeholder}
          value={dropdown}
          onChange={item => onChange(item.id)}
          renderItem={item => _renderItem(item)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootcontainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 30,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 40,
  },
  dropdown: {
    borderWidth: 0.8,
    borderColor: colors.lightGrey,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  textItem: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.Black,
  },
  textdescription: {
    fontSize: 14,
    color: colors.gray,
  },
});
export default CustomDropdown;
