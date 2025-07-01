
# 💼 Personal Manager App

A simple and practical React Native app built with **Expo**, designed to help users manage:

- ✅ Tasks (with optional priority)
- 💰 Revenues and Expenses
- 🔐 Local data persistence using **AsyncStorage**
- 📊 State management via **Context API**

---

## 📱 Technologies Used

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [AsyncStorage](https://github.com/react-native-async-storage/async-storage)
- [Context API](https://reactjs.org/docs/context.html)
- [expo-font](https://docs.expo.dev/versions/latest/sdk/font/)

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/danielmccastro/personal-manager-app.git

# Navigate to the project folder
cd personal-manager-app

# Install dependencies
npm install

# Start the project
npx expo start
```

Open it on your device using **Expo Go** or run it on an emulator/simulator.

---

## 🧠 Core Features

- Add and delete tasks
- Mark a task as priority (only one at a time)
- Add and delete revenues
- Add and delete expenses
- Persist all data using AsyncStorage
- Global state handled via React's Context API
- Font customization with `expo-font`

---

## 📁 Project Structure

```
/assets
  └── fonts/              # Custom fonts (Inter)
/components              # Reusable UI components
/context
  └── AppProvider.js      # Global state logic
/screens                 # App screens
/App.js                  # Entry point
```

---

## 📦 Main Dependencies

```json
"dependencies": {
  "@react-native-async-storage/async-storage": "^1.x.x",
  "expo": "~50.x.x",
  "expo-font": "~11.x.x",
  "react": "18.x.x",
  "react-native": "0.73.x"
}
```

---

## 🛠 Useful Commands

- `npx expo start` — start development server
- `npm run android` — run on Android emulator (if available)
- `npm run ios` — run on iOS simulator (Mac only)

---

## 👨‍💻 Author

Developed by **Daniel Cupertino**  
📍 Vitória, ES — Brazil  
📧 danielmccastro@gmail.com