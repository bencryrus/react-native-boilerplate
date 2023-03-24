import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import App from './src/App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// registerRootComponent(App);
AppRegistry.registerComponent('main',() => gestureHandlerRootHOC(App));
