import React, { createContext, useEffect, useState, useContext } from 'react';
import { GradualRolloutSDK } from 'gradual-rollout-sdk';
import { supabase } from '../lib/supabase';

const FeatureFlagContext = createContext(null);

// Get a URL param with optional fallback value
function getUrlParam(param, fallback = null) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param) || fallback;
}

// Safely parse the demoUserIds array from the URL (from parent)
function getDemoUserIdsFromUrl() {
  const demoUserIdsRaw = getUrlParam('demoUserIds', null);
  if (!demoUserIdsRaw) return [];
  try {
    return JSON.parse(decodeURIComponent(demoUserIdsRaw));
  } catch (err) {
    console.warn('Could not parse demoUserIds from URL:', err);
    return [];
  }
}

export function FeatureFlagProvider({ children }) {
  const [sdk, setSdk] = useState(null);
  const [flags, setFlags] = useState([]);
  const [userId, setUserId] = useState(null);

  // Read playground info from URL
  const anonId = getUrlParam('anon_id');
  const frameId = getUrlParam('frame_id', 'frame1');
  const demoUserIds = getDemoUserIdsFromUrl();

  // Watch Supabase session and user (optional for auth testing)
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      const newUserId = session?.user?.id || null;
      setUserId(newUserId);
    });
    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  // Compose userId: priority is real user > anon+frame > fallback uuid
  const resolvedUserId =
    userId || (anonId ? `user_${anonId}_${frameId}` : crypto.randomUUID());

  // Initialize SDK, pass demoUserIds for fair bucketing if present
  useEffect(() => {
    const sdkInstance = new GradualRolloutSDK({
      apiKey: 'supersecretapikey123',
      userId: resolvedUserId,
      demoUserIds,
      pollingIntervalMs: 10000,
      isPlaygroundMode: true,
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
      // Optionally log demo info for debug
      console.log('[Demo] All demoUserIds:', demoUserIds);
    });

    return () => {
      sdkInstance.destroy();
    };
  }, [resolvedUserId, JSON.stringify(demoUserIds)]);

  // Optional: Show debug info for transparency
  const debugInfo = (
    <div style={{ fontSize: 12, background: "#f4f4f4", padding: 8, margin: 10, borderRadius: 8 }}>
      <div><b>Demo Debug Info</b></div>
      <div><b>UserID:</b> {resolvedUserId}</div>
      <div><b>Frame:</b> {frameId}</div>
      <div><b>AnonID:</b> {anonId}</div>
      <div><b>All DemoUserIds:</b> {demoUserIds.join(', ') || '(none)'}</div>
      <div><b>Flags:</b> {flags.map(f => `${f.key} (${f.enabled ? "ON" : "OFF"})`).join(", ")}</div>
    </div>
  );

  return (
    <FeatureFlagContext.Provider value={{ sdk, flags }}>
      {/* {debugInfo} */}
      {children}
    </FeatureFlagContext.Provider>
  );
}

export function useFeatureFlags() {
  return useContext(FeatureFlagContext);
}
