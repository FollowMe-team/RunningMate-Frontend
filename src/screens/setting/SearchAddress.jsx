import React from 'react';
import PropTypes from 'prop-types';
import Postcode from '@actbase/react-daum-postcode';

const SearchAddress = ({ route, navigation }) => {
  const { onAddressSelected = () => {} } = route.params || {};

  const handleAddressSelected = addressData => {
    const address = addressData.address;
    onAddressSelected(address);
    navigation.goBack();
  };

  const handleAddressError = error => {
    console.log('주소에러', error);
    navigation.goBack();
  };

  return (
    <Postcode
      style={{ width: '100%', height: '100%' }}
      onSelected={handleAddressSelected}
      onError={handleAddressError}
      jsOptions={{ animation: true }}
    />
  );
};

SearchAddress.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default SearchAddress;
