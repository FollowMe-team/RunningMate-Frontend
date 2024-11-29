import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddressInput = ({ address = '', onAddressChange = () => {} }) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.addressSet}>
      <TextInput style={styles.addressInput} value={address} editable={false} />
      <TouchableOpacity
        style={styles.addressButton}
        onPress={() => {
          const onAddressSelected =
            route.params?.onAddressSelected || (() => {});
          navigation.navigate('SearchAddress', {
            onAddressSelected: address => {
              onAddressSelected(address);
              onAddressChange(address);
            },
          });
        }}
      >
        <Text style={styles.button}>검색</Text>
      </TouchableOpacity>
    </View>
  );
};

AddressInput.propTypes = {
  address: PropTypes.string.isRequired,
  onAddressChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  addressSet: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  addressInput: {
    flex: 3,
    color: 'black',
    height: 50,
    borderRadius: 8,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 15,
  },
  addressButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 15,
    backgroundColor: '#4A9B8C',
  },
  button: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AddressInput;
