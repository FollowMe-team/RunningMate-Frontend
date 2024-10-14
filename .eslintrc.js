// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['@react-native', 'airbnb', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier.prettier': ['error'],
  },
};
