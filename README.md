<br />

![](/.github/assets/presentation.png)

<h3 align="center">Twitter Clone</h2>

<p align="center">
  Twitter clone built in Next.js + TypeScript + Tailwind CSS using Cloud Firestore and Storage
</p>

## Preview 🎬

https://user-images.githubusercontent.com/55032197/201472767-9db0177a-79b5-4913-8666-1744102b0ad7.mp4

## Features ✨

- Authentication with Firebase Authentication
- Strongly typed react components with TypeScript
- Users can add tweets, like, retweet, and reply
- Users can delete tweets, add tweet to bookmarks, and pin their tweet
- Users can add images and GIFs to tweet
- Users can follow and unfollow other users
- Users can see their and other followers and following list
- Users can see all users and trending list
- Realtime update like, retweet, and user profile
- Realtime trending data from Twitter API
- User can edit their profile
- Responsive design for mobile, table, and desktop
- Users can customize site color scheme and color background
- All images uploads stored on Firebase Cloud Storage

## Tech 🛠

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Firebase](https://firebase.google.com)
- [SWR](https://swr.vercel.app)
- [Tailwind CSS](https://tailwindcss.com)
- [Headless UI](https://headlessui.com)
- [React Hot Toast](https://react-hot-toast.com)
- [Framer Motion](https://framer.com)

## Development 💻

Here are the steps to run the project locally.

1. Clone the repository

   ```bash
   git clone https://github.com/ccrsxx/twitter-clone.git
   ```

1. Install dependencies

   ```bash
   npm i
   ```

1. Create a Firebase project and select web app

1. Add your Firebase config to `.env.development`

1. Make sure you have enabled the following Firebase services:

   - Authentication. Enable Google sign-in method.
   - Cloud Firestore. Create a database and set it's location to your nearest region.
   - Cloud Storage. Create a storage bucket.

1. Get your project id

   ```bash
   firebase projects:list
   ```

1. Select your project id

   ```bash
   firebase use your-project-id
   ```

1. Deploy the Firestore rules

   ```bash
   firebase deploy --only firestore:rules
   ```

1. Deploy the Firestore indexes

   ```bash
   firebase deploy --only firestore:indexes
   ```

1. Deploy the Cloud Storage rules

   ```bash
   firebase deploy --only storage
   ```

1. Run the project

   ```bash
   npm run dev
   ```

Optional:

- If you want to get trending data from Twitter API, you need to create a Twitter developer account and get your API keys. Then add your API keys to `.env.development`. I hope Elon Musk doesn't make this API paid 😅.
- If you want to make the user stats synced with the deleted tweets, you need to enable the Cloud Functions for Firebase. Then deploy the Cloud Functions.
