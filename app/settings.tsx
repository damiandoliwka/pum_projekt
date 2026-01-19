import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

import PrimaryButton from '../components/PrimaryButton';
import SettingsInput from '../components/SettingsInputField';
import { loadSettings, saveSettings } from '../storage/settings';

export default function SettingsScreen() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSettings().then(s => {
      setPhone(s.phone ?? '');
      setMessage(s.message ?? '');
    });
  }, []);

  const save = async () => {
    const phoneTrim = phone.trim();
    const messageTrim = message.trim();

    await saveSettings({ phone: phoneTrim, message: messageTrim });

    if (!phoneTrim || !messageTrim) {
      let alertMsg = 'Niektóre pola są puste. ';
      if (!phoneTrim && !messageTrim)
        alertMsg += 'Funkcje "Wyślij SMS", "Zadzwoń" i "Udostępnij tekst" nie będą działać.';
      else if (!phoneTrim)
        alertMsg += 'Funkcje "Wyślij SMS" i "Zadzwoń" nie będą działać.';
      else if (!messageTrim)
        alertMsg += 'Funkcje "Wyślij SMS" i "Udostępnij tekst" nie będą działać.';
      Alert.alert('Uwaga', alertMsg);
    } else {
      Alert.alert('Ustawienia zapisane pomyślnie');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <SettingsInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Numer telefonu"
        keyboardType="phone-pad"
      />
      <SettingsInput
        value={message}
        onChangeText={setMessage}
        placeholder="Treść SMS"
      />
      <PrimaryButton title="Zapisz" onPress={save} />
    </View>
  );
}
