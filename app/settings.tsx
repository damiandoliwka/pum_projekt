import { useEffect, useState } from 'react';
import { Alert, TextInput, View } from 'react-native';

import PrimaryButton from '../components/PrimaryButton';
import { loadSettings, saveSettings } from '../storage/settings';

export default function SettingsScreen() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSettings().then(s => {
      setPhone(s.phone);
      setMessage(s.message);
    });
  }, []);

  const save = async () => {
    await saveSettings({ phone, message });
    Alert.alert('Ustawienia zapisane pomyślnie');
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Numer telefonu"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Treść wiadomości"
        value={message}
        onChangeText={setMessage}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }}
      />
      <PrimaryButton title="Zapisz" onPress={save} />
    </View>
  );
}
