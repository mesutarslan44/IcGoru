import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TestProvider } from './src/context/TestContext';

// Screens
import HomeScreen from './src/screens/HomeScreen';

// OCEAN Screens
import OceanIntroScreen from './src/screens/ocean/OceanIntroScreen';
import OceanTestScreen from './src/screens/ocean/OceanTestScreen';
import OceanResultScreen from './src/screens/ocean/OceanResultScreen';

// Inkblot Screens
import InkblotIntroScreen from './src/screens/inkblot/InkblotIntroScreen';
import InkblotTestScreen from './src/screens/inkblot/InkblotTestScreen';
import InkblotResultScreen from './src/screens/inkblot/InkblotResultScreen';

// Story Screens
import StoryIntroScreen from './src/screens/story/StoryIntroScreen';
import StoryTestScreen from './src/screens/story/StoryTestScreen';
import StoryResultScreen from './src/screens/story/StoryResultScreen';

// Cognitive Screens
import CognitiveIntroScreen from './src/screens/cognitive/CognitiveIntroScreen';
import CognitiveTestScreen from './src/screens/cognitive/CognitiveTestScreen';
import CognitiveResultScreen from './src/screens/cognitive/CognitiveResultScreen';

// Combined Result
import CombinedResultScreen from './src/screens/CombinedResultScreen';

// Result History
import ResultHistoryScreen from './src/screens/ResultHistoryScreen';

// About
import AboutTestsScreen from './src/screens/AboutTestsScreen';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  animation: 'slide_from_right',
  contentStyle: { backgroundColor: '#1a1a2e' },
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <TestProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={screenOptions}
            >
              {/* Home */}
              <Stack.Screen name="Home" component={HomeScreen} />

              {/* OCEAN Test */}
              <Stack.Screen name="OceanIntro" component={OceanIntroScreen} />
              <Stack.Screen name="OceanTest" component={OceanTestScreen} />
              <Stack.Screen name="OceanResult" component={OceanResultScreen} />

              {/* Inkblot Test */}
              <Stack.Screen name="InkblotIntro" component={InkblotIntroScreen} />
              <Stack.Screen name="InkblotTest" component={InkblotTestScreen} />
              <Stack.Screen name="InkblotResult" component={InkblotResultScreen} />

              {/* Story Test */}
              <Stack.Screen name="StoryIntro" component={StoryIntroScreen} />
              <Stack.Screen name="StoryTest" component={StoryTestScreen} />
              <Stack.Screen name="StoryResult" component={StoryResultScreen} />

              {/* Cognitive Test */}
              <Stack.Screen name="CognitiveIntro" component={CognitiveIntroScreen} />
              <Stack.Screen name="CognitiveTest" component={CognitiveTestScreen} />
              <Stack.Screen name="CognitiveResult" component={CognitiveResultScreen} />

              {/* Combined Result */}
              <Stack.Screen name="CombinedResult" component={CombinedResultScreen} />

              {/* Result History */}
              <Stack.Screen name="ResultHistory" component={ResultHistoryScreen} />

              {/* About */}
              <Stack.Screen name="AboutTests" component={AboutTestsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </TestProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
