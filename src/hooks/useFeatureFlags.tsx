import React, { createContext, useEffect, useState, useContext } from 'react';
import { GradualRolloutSDK } from 'gradual-rollout-sdk';
import { supabase } from '../lib/supabase';

const FeatureFlagContext = createContext(null);

export function FeatureFlagProvider({ children }) {
  const [sdk, setSdk] = useState(null);
  const [flags, setFlags] = useState([]);
  const [userId, setUserId] = useState(null);

  // Watch Supabase session and user
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      const newUserId = session?.user?.id || null;
      setUserId(newUserId);

      // Update identity in SDK if it already exists
      if (sdk) {
        sdk.setIdentity(newUserId);
      }
    });

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, [sdk]);

  // Initialize SDK when userId is known
  useEffect(() => {
    if (!userId) return;

    const sdkInstance = new GradualRolloutSDK({
      apiKey: 'supersecretapikey123',
      userId: userId,
      pollingIntervalMs: 30000,
    });

    sdkInstance.on('flagsUpdated', (updatedFlags) => {
      setFlags(updatedFlags);
    });

    sdkInstance.on('error', (error) => {
      console.error('SDK error:', error);
    });

    sdkInstance.init().then(() => {
      console.log('SDK initialized for user:', userId);
      setSdk(sdkInstance);
    });

    return () => {
      sdkInstance.destroy();
    };
  }, [userId]);

  return (
    <FeatureFlagContext.Provider value={{ sdk, flags }}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

export function useFeatureFlags() {
  return useContext(FeatureFlagContext);
}
