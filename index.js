/**
 * @format
 */

console.log('index.js is loading...');

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

console.log('About to register component with name:', appName);

// Add error handling
const WrappedApp = () => {
  console.log('WrappedApp is being called');
  try {
    return App();
  } catch (error) {
    console.error('Error in App component:', error);
    throw error;
  }
};

AppRegistry.registerComponent(appName, () => WrappedApp);

console.log('Component registered successfully');
