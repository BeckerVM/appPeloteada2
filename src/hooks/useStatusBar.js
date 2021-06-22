import React from 'react';
import {useFocusEffect} from '@react-navigation/native';

export const useStatusBar = () => {
  const [showBar, setShowBar] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setShowBar(true);

      return () => {
        setShowBar(false);
      };
    }, []),
  );

  return {
    showBar,
  };
};
