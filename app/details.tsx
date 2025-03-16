import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function DetailsScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Écran des détails</Text>
      <Button title="Retour" onPress={() => router.back()} />
    </View>
  );
}
