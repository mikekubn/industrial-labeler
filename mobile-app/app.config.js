const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  expo: {
    name: IS_DEV ? "Labeler App (Dev)" : "Labeler App",
    slug: "labeler-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "labelerapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: IS_DEV ? "com.labelerapp.dev" : "com.labelerapp"
    },
    android: {
      usesCleartextTraffic: true,
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/adaptive-icon.png"
      },
      predictiveBackGestureEnabled: false,
      package: IS_DEV ? "com.labelerapp.dev" : "com.labelerapp",
      permissions: [
        "android.permission.BLUETOOTH",
        "android.permission.BLUETOOTH_ADMIN",
        "android.permission.BLUETOOTH_CONNECT"
      ]
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "react-native-ble-plx",
        {
          isBackgroundEnabled: false,
          modes: ["central"],
          bluetoothAlwaysPermission: "Allow $(PRODUCT_NAME) to connect to Bluetooth devices"
        }
      ],
      [
        "expo-splash-screen",
        {
          backgroundColor: "#FFFFFF",
          image: "./assets/images/splash-icon.png",
          dark: {
            image: "./assets/images/splash-icon-dark.png",
            backgroundColor: "#000000"
          },
          imageWidth: 200
        }
      ],
      [
        "expo-camera",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
          microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone",
          recordAudioAndroid: true,
          barcodeScannerEnabled: true
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    }
  }
};