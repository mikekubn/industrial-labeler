# Android local production APK

How to produce a signed release `.apk` on your machine. Background and alternatives: [Expo — create a release build locally](https://docs.expo.dev/guides/local-app-production/?utm_source=chatgpt.com).

## 1. Configure production `.env`

Set production-oriented values (example):

```env
EXPO_PUBLIC_ANDROID_USE_ADB_REVERSE=0
EXPO_PUBLIC_API_BASE_URL=https://api.example.com
```

## 2. Prebuild for Android only

```bash
npx expo prebuild --clean -p android
```

## 3. Create an upload keystore

```bash
sudo keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

## 4. Place the keystore under the app module

```bash
mv my-upload-key.keystore android/app/
```

## 5. Add signing properties

Create or edit **`android/gradle.properties`** (repo root, not `/` on disk):

```properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=your_store_password
MYAPP_UPLOAD_KEY_PASSWORD=your_key_password
```

## 6. Wire signing into `android/app/build.gradle`

Add or merge this with your existing `signingConfigs` / `buildTypes` (adjust if you already have custom blocks):

```groovy
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.release
            def enableShrinkResources = findProperty('android.enableShrinkResourcesInReleaseBuilds') ?: 'false'
            shrinkResources enableShrinkResources.toBoolean()
            minifyEnabled enableMinifyInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
            def enablePngCrunchInRelease = findProperty('android.enablePngCrunchInReleaseBuilds') ?: 'true'
            crunchPngs enablePngCrunchInRelease.toBoolean()
        }
    }
```

## 7. Build the release APK

From the **repository root**:

```bash
cd android && ./gradlew assembleRelease
```

Output path:

```text
android/app/build/outputs/apk/release/app-release.apk
```

## 8. Install on a device

```bash
adb devices
adb install -r android/app/build/outputs/apk/release/app-release.apk
```

Run the `adb install` command from the repo root (or use an absolute path to the APK).
