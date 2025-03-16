import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles'; // Import du fichier de styles

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue à l'accueil !</Text>
      <Button
        title="Aller aux détails"
        onPress={() => router.push('/details')}
        color="#007bff"
      />
    </View>
  );
}
