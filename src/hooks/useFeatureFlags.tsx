import React, { createContext, useEffect, useState, useContext } from 'react';
import { GradualRolloutSDK } from 'gradual-rollout-sdk';

const FeatureFlagContext = createContext(null);

export function FeatureFlagProvider({ children }) {
  const [sdk, setSdk] = useState(null);
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    const sdkInstance = new GradualRolloutSDK({
      apiKey: 'supersecretapikey123',
      userId: 'user_123',
      pollingIntervalMs: 30000,
    });

    sdkInstance.on('flagsUpdated', (updatedFlags) => {
      setFlags(updatedFlags);
    });

    sdkInstance.on('error', (error) => {
      console.error('SDK error:', error);
    });

    sdkInstance.init().then(() => {
      console.log('SDK initialized');
      setSdk(sdkInstance);
    });

    return () => {
      sdkInstance.destroy();
    };
  }, []);

  return (
    <FeatureFlagContext.Provider value={{ sdk, flags }}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

export function useFeatureFlags() {
  return useContext(FeatureFlagContext);
}
