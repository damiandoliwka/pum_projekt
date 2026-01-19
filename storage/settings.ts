import AsyncStorage from '@react-native-async-storage/async-storage';

export type Settings = {
  phone: string;
  message: string;
};

const KEY = 'settings';

export const saveSettings = async (settings: Settings) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(settings));
};

export const loadSettings = async (): Promise<Settings> => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : { phone: '', message: '' };
};
