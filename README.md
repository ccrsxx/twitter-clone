<br />

![](/.github/assets/presentation.png)

<p align="center">
  Twitter clone built in Next.js + TypeScript + Tailwind CSS using Cloud Firestore and Storage
</p>

## Preview 🎬

https://user-images.githubusercontent.com/55032197/201472767-9db0177a-79b5-4913-8666-1744102b0ad7.mp4

## Features ✨

- Authentication with Firebase Authentication
- Strongly typed React components with TypeScript
- Users can add tweets, like, retweet, and reply
- Users can delete tweets, add a tweet to bookmarks, and pin their tweet
- Users can add images and GIFs to tweet
- Users can follow and unfollow other users
- Users can see their and other followers and the following list
- Users can see all users and the trending list
- Realtime update likes, retweets, and user profile
- Realtime trending data from Twitter API
- User can edit their profile
- Responsive design for mobile, tablet, and desktop
- Users can customize the site color scheme and color background
- All images uploads are stored on Firebase Cloud Storage

## Tech 🛠

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Firebase](https://firebase.google.com)
- [SWR](https://swr.vercel.app)
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

1. Create a Firebase project and select the web app

1. Add your Firebase config to `.env.development`. Note that `NEXT_PUBLIC_MEASUREMENT_ID` is optional

1. Make sure you have enabled the following Firebase services:

   - Authentication. Enable the Google sign-in method.
   - Cloud Firestore. Create a database and set its location to your nearest region.
   - Cloud Storage. Create a storage bucket.

1. Install Firebase CLI globally

   ```bash
   npm i -g firebase-tools
   ```

1. Log in to Firebase

   ```bash
   firebase login
   ```

1. Get your project ID

   ```bash
   firebase projects:list
   ```

1. Select your project ID

   ```bash
   firebase use your-project-id
   ```

1. At this point, you have two choices. Either run this project completely locally using emulators, or, run it using the Firestore backend on the cloud.

1. Option 1: Running the project locally using the Firebase Emulators (Skip to Option 2 if you want to use the real backend or you want to deploy the project)

1. Follow the steps to setup the Firebase emulators:

   ```bash
   firebase init
   ```

   - You'll be greeted with following prompt from Firebase with a lot of choices. You want to use the up and down arrow keys to go through the options and select the option that says: `Emulators: Set up local emulators for Firebase products` by pressing Space key, as seen below. Once selected, press the Enter key to proceed.

   ![](/.github/assets/emu_setup_1.png)

1. Next, you'll be asked to select the emulators that you want to setup. In this choice, select the following emulators:

   - Authentication Emulator
   - Firestore Emulator
   - Functions Emulator
   - Storage Emulator

   See the image below for more details about the selection:

   ![](/.github/assets/emu_setup_2.png)

1. Following that, you'll be asked to setup the ports for various emulator services that we just selected. We'll just use the default ones to start so press enter for each of these questions and continue as shown below:

   - When you're asked to select whether you want to enable the Emulator UI, enter `y` as the response.
   - When you're asked which port to use for the Emulator UI, leave it empty and press Enter to continue.
   - Finally, it'll ask you to download the Emulators, enter `y` to start downloading them.

   ![](/.github/assets/emu_setup_3.png)

1. Finally, if everything went as expected, then you'll be greeted with this screen:

   ![](/.github/assets/emu_setup_4.png)

1. At this point, you can run the following command to have a fully functional Twitter clone running locally:

   ```bash
   npm run dev:emulators
   ```

1. Option 2: Use the Firebase Cloud backend:

1. Deploy Firestore rules, Firestore indexes, and Cloud Storage rules

   ```bash
   firebase deploy --except functions
   ```

1. Run the project

   ```bash
   npm run dev
   ```

> **_Note_**: When you deploy Firestore indexes rules, it might take a few minutes to complete. So before the indexes are enabled, you will get an error when you fetch the data from Firestore.<br><br>You can check the status of your Firestore indexes with the link below, replace `your-project-id` with your project ID: https://console.firebase.google.com/u/0/project/your-project-id/firestore/indexes

Optional:

- If you want to get trending data from Twitter API, you need to create a Twitter developer account and get your API keys. Then add your API keys to `.env.development`. I hope Elon Musk doesn't make this API paid 😅.
- If you want to make the user stats synced with the deleted tweets, you need to enable the Cloud Functions for Firebase. Then deploy the Cloud Functions.
