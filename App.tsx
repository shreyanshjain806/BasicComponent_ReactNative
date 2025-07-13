import React from 'react';
import { SafeAreaView, Button, Text, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import ListViewScreen from './screens/ListViewScreen';
import InputsViewScreen from './screens/InputsViewScreen';

type RootStackParamList = {
  Home: undefined;
  ListView: undefined;
  InputsView: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.title}>Home Screen</Text>
      <Button title="Go to List View" onPress={() => navigation.navigate('ListView')} />
      <Button title="Go to Inputs View" onPress={() => navigation.navigate('InputsView')} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ListView" component={ListViewScreen} />
        <Stack.Screen name="InputsView" component={InputsViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
});
