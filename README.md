This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
npm install

# Using npm
npm start

```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.


# Getting Started for Linux Dummies

## 1: Get Stuff

You'll need:

- a computer with a decent amount of virtual memory/RAM. (> 4 gigabytes)
- a bunch of storage. (over 20 GB free, don't forget for some coffee)
- an **Android** phone with plenty of disk space, or else you'll waste 30-ish minutes knowing there's no place left to fit the application.
- a lot of patience.

## 2: Load With Applications and Tools

Install:

- Android Studio and its tools, Platform tools and Build tools (**EXACTLY** at version 35.0.0, just for this project)
- Java (Development Kit) version 17
- [Node.js](https://nodejs.org/en/download)

## 3: Set It Up

- Clone this repository to your disk that you're COMPLETELY SURE that it's over 10GB free.
- Initialize React Native **VERSION 0.79.2** by running this in the repository folder.
```sh
npm install react native@0.79.2
```
- Start Metro.
```sh
npm start
```

## 3.5: Set Up Your Phone

- Open settings.
- Go to device details
- Enter the development mode, tap the build number 7 times.
- Go back to the settings menu, you'll see "Developer options". Tap on it.
- Turn on USB debugging.
- Plug your phone into your computer, you'll be asked on your phone to "trust" your computer. Check "always" and accept.
- **CHECK connectivity** by looking at the devices tab, you'll see the name and the Android version.

## 4: Build!

**NOTE** that this procedure consumes a lot of memory! Free up some before building.

- Open another terminal at the repository folder.
- Run this:
```sh
npm run android
#OR
npx react-native run-android
```
- And patience!

## 5: Run It for Real

- The application will appear on your phone, or as an APK at (Repo)/android/app/build/outputs/apk/debug/.

## CONSIDER

A lot of disk space will be consumed:

- One at ~/.gradle, contains cache files required for building. can't be moved, but symlinking will do.
- Another at your Android SDK placement, SDK Tools are placed there. Can be moved in Android Studio settings.
- And, of course, the cloned repository, can expand by a heavy load once built. Place it anywhere as your heart desires.


HOW TO INSTALL

Framework needed !

Android Studio (For simulate display)
NodeJS (For run React Native project)
Step by Step for open project

copy all files,then paste on htdocs (XAMPP)

Download Database Folder "https://drive.google.com/drive/folders/1WgA73Per-DQvUAUIrefTfpf4thdpzeT0?usp=sharing" and replace at "xampp/mysql" folder

open xampp as code editing in VScode (right click and open cmd on xampp folder,then type "code ." )

open terminal in VScode then type "npm start"

open Android Studio with some emulate mobile ver.

The last press 'a' at Terminal for connect to emulate
