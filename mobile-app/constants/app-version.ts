import * as Application from "expo-application";
import Constants from "expo-constants";

const config = Constants.expoConfig;

import { appVariant } from "@/constants/envs";

const IS_DEV = appVariant === "development";
const ENV_VARIANT = IS_DEV ? "DEV" : "PROD";

const APP_VERSION = Application.nativeApplicationVersion;
const NATIVE_BUILD_LABEL = Application.nativeBuildVersion;
const VERSION_WITH_BUILD = `${APP_VERSION} (${NATIVE_BUILD_LABEL})`;

const RUNTIME_APP_VERSION = config?.version;
const RUNTIME_IOS_BUILD = config?.ios?.buildNumber;
const RUNTIME_ANDROID_CODE = config?.android?.versionCode;
const RUNTIME_VERSION = `${ENV_VARIANT} - ${RUNTIME_APP_VERSION} (IOS: ${RUNTIME_IOS_BUILD} | ANDROID: ${RUNTIME_ANDROID_CODE})`;

const BUILD_INFO = IS_DEV ? RUNTIME_VERSION : VERSION_WITH_BUILD;

export { BUILD_INFO };
