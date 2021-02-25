import React from 'react';
import { Provider as PaperProvider} from 'react-native-paper';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import FullAppNavigator from './src/navigation/FullAppNavigator';

// Redux
import { Provider } from 'react-redux'
import store from './src/redux/store'


function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <FullAppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;
