import { StatusBar, Platform } from 'react-native';
import { useCallback, useEffect } from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

export default color => {
  const isFocused = useIsFocused();

  const setSelectedStyle = useCallback(() => {
    StatusBar.setBarStyle(color === 'dark' ? 'light-content' : 'dark-content');
    // Disables plataform-specific code
    if (Platform.OS !== 'ios') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }
  }, [color]);

  useFocusEffect(setSelectedStyle);

  useEffect(() => {
    if (isFocused) setSelectedStyle();
  }, [setSelectedStyle, isFocused]);
};
