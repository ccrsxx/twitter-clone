const config = {
  apiKey: "AIzaSyBkKn4YTDQFYWSs7MF8yYN-57J8HJSU7gA",
  authDomain: "twitbloxorg.firebaseapp.com",
  projectId: "twitbloxorg",
  storageBucket: "twitbloxorg.appspot.com",
  messagingSenderId: "177532404500",
  appId: "1:177532404500:web:5fef4f1be5b4b8693e3801",
  measurementId: "G-180M2HE7MW"
} as const;

type Config = typeof config;

export function getFirebaseConfig(): Config {
  if (Object.values(config).some((value) => !value))
    throw new Error('Firebase config is not set or incomplete');

  return config;
}
