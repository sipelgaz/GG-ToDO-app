# Welcome to Ako's GG-ToDO-app!

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

Project has been created/tested on Android, so it is recommended to use Android emulator or Expo Go app for testing.
iOS simulator should work as well, but it has not been tested.

## Usage

2 default Users are created with the following credentials:
admin: admin
user: user

for the weather API to work, you need to create an account at https://www.visualcrossing.com/weather/weather-data-services# 
API key should be put into project root in a file named .env with the following content:
```
WEATHER_API_KEY=your_api_key
```

## Features
Admin can:
- create, edit, delete tasks
- mark tasks as done

User can:
- view tasks

Tasks show location-based current weather information(temprature)
-no caching is implemented, so the weather information is fetched every time the task is viewed






