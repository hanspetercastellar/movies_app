import AsyncStorage from '@react-native-community/async-storage';

export const storageHelpers = {
  setItem: async (key, val) => {
    await AsyncStorage.setItem(key, JSON.stringify(val));
  },
  getItem: async (key) => {
    try {
      return await AsyncStorage.getItem('auth');
    } catch (e) {
      console.log('error');
      return e;
    }
  },
  cleanSession: async () => {
    return await AsyncStorage.removeItem('auth');
  },
};
