import React, { createContext, useEffect, useState, useContext } from 'react';
import { GradualRolloutSDK } from 'gradual-rollout-sdk';
import { supabase } from '../lib/supabase';

const FeatureFlagContext = createContext(null);

function getAnonIdFromUrlOrGenerate() {
  // Check URL for anon_id param
  const params = new URLSearchParams(window.location.search);
  let anonId = params.get('anon_id');
  if (!anonId) {
    anonId = crypto.randomUUID();
    // Optional: store in localStorage if you want reloads in the same iframe to be stable
    localStorage.setItem('anon_id', anonId);
  }
  return anonId;
}

export function FeatureFlagProvider({ children }) {
  const [sdk, setSdk] = useState(null);
  const [flags, setFlags] = useState([]);
  const [userId, setUserId] = useState(null);

  // Watch Supabase session and user
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      const newUserId = session?.user?.id || null;
      setUserId(newUserId);
    });

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  // Always use anon_id from URL if no real user is present
  useEffect(() => {
    // Use Supabase userId if logged in, else anon_id from URL (or generate)
    const resolvedUserId = userId || getAnonIdFromUrlOrGenerate();

    const sdkInstance = new GradualRolloutSDK({
      apiKey: 'supersecretapikey123',
      userId: resolvedUserId,
      pollingIntervalMs: 10000,
    });

    sdkInstance.on('flagsUpdated', (updatedFlags) => {
      setFlags(updatedFlags);
    });

    sdkInstance.on('error', (error) => {
      console.error('SDK error:', error);
    });

    sdkInstance.init().then(() => {
      console.log('SDK initialized for user:', resolvedUserId);
      setSdk(sdkInstance);
    });

    return () => {
      sdkInstance.destroy();
    };
  }, [userId]); // Re-initialize if supabase user changes

  return (
    <FeatureFlagContext.Provider value={{ sdk, flags }}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

export function useFeatureFlags() {
  return useContext(FeatureFlagContext);
}
