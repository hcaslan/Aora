
### Creating an Expo App
- Create Expo app in directory MyApp.

    ```bash
    npx create-expo-app MyApp --template blank-typescript
    ```

- Create Expo app in current directory.

    ```bash
    npx create-expo-app ./ --template blank-typescript
    ```

### Dependencies

- For file-based routing.
    ```bash
    npx expo install expo-router
    ```

- For handling safe areas in your app's layout.
    ```bash
    npx expo install react-native-safe-area-context
    ```

- For optimizing navigation performance with native screens.
    ```bash
    npx expo install react-native-screens
    ```

- For managing deep linking and URL navigation.
    ```bash
    npx expo install expo-linking
    ```

- For accessing system information about your app.
    ```bash
    npx expo install expo-constants
    ```

- For customizing the status bar appearance and behavior.
    ```bash
    npx expo install expo-status-bar
    ```
- For nativewind
    ```bash
    npm install nativewind tailwindcss react-native-reanimated
    ```
- To install all the above dependencies at once.
    ```bash
    npx expo install expo-router nativewind tailwindcss react-native-reanimated react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
    ```
- Run pod-install to finish installation of react-native-reanimated
    ```bash
    npx pod-install
    ```
### Setting Entry Point

1. Open your package.json file: This file is located in the root directory of your Expo project.

2. Locate the "main" field: If it exists, it may look something like this:
    ```json
    "main": "node_modules/expo/AppEntry.js",
    ```
3. Update the "main" field: Change its value to "expo-router/entry" to indicate that you want to use the Expo Router for navigation:
    ```json
    "main": "expo-router/entry",
    ```
4. Here’s a complete example of how your package.json might look after the change:
    ```json
    {
        "name": "your-app-name",
        "version": "1.0.0",
        "main": "expo-router/entry",
        ...
    }
    ```
### File Structure

```awk
your-project/
│
├── app/
│   ├── _layout.tsx      // Layout component for nested navigation
│   ├── index.tsx        // Main entry point for the app (Home screen)
│   ├── about.jtsx       // About screen
│   └── ...              // Additional screens/components
│
├── assets/              // Static assets (images, fonts, etc.)
│
├── package.json         // Project configuration
│
├── app.json             // Expo app configuration
│
└── node_modules/        // Installed dependencies
```

### Configure Deep Linking

- To configure deep linking and URL navigation in your Expo app using expo-router, you need to specify a scheme in your app.json file. Here’s how to do it:

1. Open app.json: This file is located in the root directory of your Expo project.
2. Locate the expo key: You should find a section that looks like this:
    ```json
    {
        "expo": {
            ...
        }
    }
    ```
3. Add the scheme property: Within the expo object, add a scheme property. This property defines the URL scheme for your app, which is used for deep linking. For example:
    ```json
    {
        "expo": {
            "name": "your-app-name",
            "slug": "your-app-slug",
            "scheme": "yourapp",
            ...
        }
    }
    ```
### Starting Expo App

1. Basic Start Command:

    ```bash
    npx expo start
    ```
2. Clearing the Cache:
    - If you encounter issues or want to ensure that you are running the latest version of your app without any cached data, you can clear the cache by using the --clear flag:

    ```bash
    npx expo start --clear
    ```
3. Using a Tunnel:
    - If you want to share your app with others or access it from different networks, you can start your app with a tunnel. This is particularly useful when working with devices that are not on the same local network. Use the --tunnel flag:

    ```bash
    npx expo start --tunnel
    ```
4. Using Local Network:
    - By default, Expo tries to use LAN for development, but if you want to specify this explicitly, you can do so with the --lan flag:

    ```bash
    npx expo start --lan
    ```
5. Using a Specific Port:

    ```bash
    npx expo start --port 19000
    ```

### Starting Emulator (Optional)

    ```bash
    emulator -avd Pixel_6_API_31
    ```

### Setting Up NativeWind

1. Create Tailwind Configuration:

    ```bash
    npx tailwindcss init
    ```

2. Configure Tailwind:

    ```js
    // tailwind.config.js
    /** @type {import('tailwindcss').Config} */
    module.exports = {
        content: [
            "./app/**/*.{js,jsx,ts,tsx}",
            "./components/**/*.{js,jsx,ts,tsx}",
        ],
        presets: [require("nativewind/preset")],
        theme: {
            extend: {},
        },
        plugins: [],
    }
    ```
3. Create global.css

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
4. Add nativewind config to Metro

    ```js
    const { getDefaultConfig } = require("expo/metro-config");
    const { withNativeWind } = require("nativewind/metro");

    const config = getDefaultConfig(__dirname);

    module.exports = withNativeWind(config, { input: "./global.css" });
    ```
5. Add the Babel Plugin in Expo

    ```js 
    // babel.config.js
    module.exports = function (api) {
        api.cache(true);
        return {
            presets: [
                ["babel-preset-expo", { jsxImportSource: "nativewind" }],
                "nativewind/babel",
            ],
        };
    };
    ```

6. Include the types for TypeScript

    ```ts
    //nativewind-env.d.ts

    /// <reference types="nativewind/types" />
    ```

7. Use className in Your Components

    ```ts
    import { StatusBar } from 'expo-status-bar';
    import { Text, View } from 'react-native';
    import { Link } from 'expo-router'

    export default function App() {
    return (
        <View className="flex-1 items-center justify-center bg-gray-100">
        <Text>Aora!</Text>
        <StatusBar style="auto" />
        <Link href="/profile" style={{ color: 'blue' }}>Go to Profile </Link>
        </View>
    );
    }
    ```



    
