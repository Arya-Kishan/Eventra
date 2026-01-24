import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {SocketProvider} from './src/context/SocketContext';
import AppNavigation from './src/navigation/AppNavigation';
import {store} from './src/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AppConstants} from './src/constants/AppConstants';
import {NavigationContainer} from '@react-navigation/native';
// navigation/navigationService.ts
import {createNavigationContainerRef} from '@react-navigation/native';
import NotificationHandler from './src/components/NotificationHandler';

export const navigationRef = createNavigationContainerRef();

const App = () => {
  GoogleSignin.configure({
    webClientId: AppConstants.EVENTRA_WEB_CLIENT_ID,
    offlineAccess: true,
  });

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <Provider store={store}>
          <SocketProvider>
            <NavigationContainer ref={navigationRef}>
              <NotificationHandler />
              <AppNavigation />
            </NavigationContainer>
          </SocketProvider>
          <Toast />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  flex: {flex: 1},
});
