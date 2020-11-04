// import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import DefaultContainer from './DefaultContainer';
import Routes from './src/Routes';

const App = () => {
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  if (!resourcesLoaded) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setResourcesLoaded)}
      />
    );
  }
  return (
    <AppearanceProvider>
      <DefaultContainer>
        <Routes />
      </DefaultContainer>
    </AppearanceProvider>
  );
};

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

async function loadResourcesAsync() {
  const fontAssets = cacheFonts([
    Feather.font,
    MaterialCommunityIcons.font,
    { 'nunito-sans-black': require('./assets/fonts/NunitoSans-Black.ttf') },
    { 'nunito-sans-bold': require('./assets/fonts/NunitoSans-Bold.ttf') },
    { 'nunito-sans-light': require('./assets/fonts/NunitoSans-Light.ttf') },
    { 'nunito-sans': require('./assets/fonts/NunitoSans-Regular.ttf') },
    { 'nunito-sans-italic': require('./assets/fonts/NunitoSans-Italic.ttf') },
    {
      'nunito-sans-semibold': require('./assets/fonts/NunitoSans-SemiBold.ttf'),
    },
    { 'poppins-black': require('./assets/fonts/Poppins-Black.ttf') },
    { 'poppins-extra-bold': require('./assets/fonts/Poppins-ExtraBold.ttf') },
    { 'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf') },
    { 'poppins-light': require('./assets/fonts/Poppins-Light.ttf') },
    { poppins: require('./assets/fonts/Poppins-Regular.ttf') },
    { 'poppins-italic': require('./assets/fonts/Poppins-Italic.ttf') },
    {
      'poppins-semibold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    },
  ]);

  await Promise.all(fontAssets);

  // const imageAssets = cacheImages([
  //   require('./assets/icons/marker/marker.png'),
  // ]);

  // await Promise.all(imageAssets);
}

function handleLoadingError(error) {
  console.warn(error);
}
function handleFinishLoading(resourcesLoaded) {
  resourcesLoaded(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
