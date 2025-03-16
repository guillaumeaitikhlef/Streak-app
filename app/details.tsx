import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles'; // Import du fichier de styles

export default function Details() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Détails de l'écran</Text>
      <Button
        title="Retour à l'accueil"
        onPress={() => router.push('/')}
        color="#007bff"
      />
    </View>
  );
}
