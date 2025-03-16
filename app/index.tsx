import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenue sur l'accueil !</Text>
      <Button title="Aller aux détails" onPress={() => router.push('/details')} />
    </View>
  );
}
