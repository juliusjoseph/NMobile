# NMobile

A mobile app for everyday digital payments in Nigeria: buy airtime and data, pay bills, book train tickets, subscribe to broadband and wifi plans, and manage everything from one NMoney wallet.

This is a ground-up rebuild of an earlier NMobile prototype. It uses a modern Expo and TypeScript stack, a light and dark theme, and works fully offline with local demo data (there is no backend).

## Features

- **Onboarding:** a swipeable intro that introduces NMobile and its services.
- **Accounts:** sign up, log in and reset a forgotten password, with form validation.
- **NMoney wallet:** a starting demo balance, add money, and a balance chip on the home screen.
- **Airtime:** choose a network (MTN, Airtel, 9mobile or Glo), enter a number, pick an amount.
- **Data:** buy a data bundle for any network.
- **Train tickets:** pick a trip, set a quantity, and see the price and total before paying.
- **Bills:** electricity, cable TV, water and internet.
- **NComms:** broadband plans, wifi passes and a network coverage list.
- **Payments flow:** every purchase asks for confirmation, checks the wallet balance, and ends on a receipt.
- **History:** a full transaction list, with a receipt for each item.
- **Profile:** edit your name and switch between System, Light and Dark themes.
- **Home carousel:** auto-playing promo banners that pause when you leave the screen.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Expo and React Native |
| Language | TypeScript (strict) |
| Navigation | React Navigation: native stack and a custom bottom tab bar |
| Storage | `@react-native-async-storage/async-storage` |
| UI | `expo-linear-gradient`, `@expo/vector-icons` |
| State | React Context (theme and app store) |

## Getting started

### Prerequisites

- Node.js (an LTS version)
- The Expo Go app on your phone, or an Android or iOS emulator

### 1. Create the app

```
npx create-expo-app@latest nmobile --template blank-typescript
cd nmobile
```

### 2. Add the source

Replace `App.tsx` with the one from this project and copy the `src/` folder next to it.

### 3. Add the images

Create `assets/images/` and add these files:

`mob.png`, `Banner.jpg`, `bg1.jpg`, `bg2.jpg`, `bg4.jpg`, `bg5.jpg`, `cap.jpg`, `clak.jpg`, `cup.jpg`, `deck.jpg`, `lop.jpg`, `nmob.jpg`, `Nmobile.jpg`, `Nmobile232.jpg`, `Nmobilee.jpg`, `Nmobilew.jpg`, `not.jpg`, `kkk.png`

File names are case sensitive. Resizing the photos to about 1000 px wide keeps the app fast on low-end phones.

### 4. Install packages

```
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage expo-linear-gradient @expo/vector-icons expo-status-bar
```

### 5. Configure `app.json`

Inside the `"expo"` object, set:

```json
"icon": "./assets/images/mob.png",
"userInterfaceStyle": "automatic",
"splash": {
  "image": "./assets/images/kkk.png",
  "resizeMode": "contain",
  "backgroundColor": "#ffffff"
}
```

`"userInterfaceStyle": "automatic"` lets the System theme option follow the phone.

### 6. Run

```
npx expo start -c
```

Scan the QR code with Expo Go, or press `a` (Android) or `i` (iOS).

## Project structure

```
nmobile/
├── App.tsx                  Providers, navigation container and theme
├── assets/images/           Logos, banners and photos
└── src/
    ├── catalog.ts           Sample networks, plans, trips, bills and coverage
    ├── format.ts            Naira and date formatting
    ├── images.ts            Image map and promo list
    ├── navigation.tsx       Stack, tabs and the custom tab bar
    ├── store.tsx            Accounts, wallet and transactions (AsyncStorage)
    ├── theme.tsx            Light and dark palettes
    ├── types.ts             Navigation types
    ├── useCheckout.ts       Confirm, pay from wallet, show receipt
    ├── components/ui.tsx    Shared buttons, fields, cards, header and rows
    └── screens/             Intro, Auth, Forgot, Home, Ncomms, NcommsDetail,
                             Wallet, History, Profile, Airtime, Data, Train,
                             Bills, Receipt
```

## How the demo works

- **No backend.** Accounts, the wallet balance and transactions are stored on the device with AsyncStorage under the key `nm:db`.
- **Demo wallet.** Every new account starts with a ₦20,000 credit. "Add money" credits the wallet instantly.
- **Sample data.** Data plans, train routes and fares, bill providers, broadband and wifi plans, and the coverage list are sample values in `src/catalog.ts`. Replace them with real data before showing the app to a client.
- **Demo-only security.** Passwords are stored with a simple local hash. This is a stand-in for a real backend and is not secure.

### Resetting the app

To start fresh (for example, to see the intro again), clear the app's storage, reinstall Expo Go, or change the storage key `nm:db` in `src/store.tsx` to a new name.

## Roadmap

- Connect to a real backend for authentication and payments
- Real data from a bills and airtime provider
- Biometric login and a transaction PIN
- Push notifications for payment receipts
- Profile photo upload

## Credits

NMobile is a member company of Taylorcomms Group. Brand names, logos and banner artwork belong to their owners. Network names (MTN, Airtel, 9mobile, Glo) and bill providers (DStv, GOtv, StarTimes) are used as labels in this demo only.

Rebuilt by Jayjules (JAY_JULES).
