import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as SMS from "expo-sms";
import { useCallback, useState } from "react";
import { Alert, Linking, Share, View } from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import { loadSettings } from "../storage/settings";

export default function HomeScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useFocusEffect(
    useCallback(() => {
      loadSettings().then(s => {
        setPhone(s.phone ?? "");
        setMessage(s.message ?? "");
      });
    }, [])
  );

  const sendSMS = async () => {
    if ((!message) && (!phone)) return Alert.alert("Brak numeru telefonu oraz treści wiadomości.");
    if (!phone) return Alert.alert("Brak numeru telefonu.");
    if (!message) return Alert.alert("Brak treści wiadomości tekstowej.");

    const available = await SMS.isAvailableAsync();
    if (!available) return Alert.alert("Obsługa funkcji SMS niedostępna.");

    await SMS.sendSMSAsync(phone, message);
  };

  const callPhone = () => {
    if (!phone) return Alert.alert("Brak numeru telefonu.");
    Linking.openURL(`tel:${phone}`);
  };

  const shareMessage = () => {
    if (!message) return Alert.alert("Brak treści wiadomości tekstowej.");
    Share.share({ message });
  };

  return (
    <View style={{ padding: 20 }}>
      <PrimaryButton title="Wyślij SMS" onPress={sendSMS} />
      <PrimaryButton title="Zadzwoń" onPress={callPhone} />
      <PrimaryButton title="Udostępnij tekst" onPress={shareMessage} />
      <PrimaryButton title="Ustawienia" onPress={() => router.push("/settings")} />
    </View>
  );
}
