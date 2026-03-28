# Android: localhost and `EXPO_PUBLIC_ANDROID_USE_ADB_REVERSE`

On Android, the dev API URL depends on whether you use **USB (real device)**, an **emulator with `adb reverse`**, or an **emulator without reverse** (`10.0.2.2`).

---

## USB device (USB debugging)

1. Connect the phone with USB debugging enabled.
2. Run:

```bash
adb devices
adb reverse tcp:3000 tcp:3000
```

3. In `.env`:

```env
EXPO_PUBLIC_API_BASE_URL=http://127.0.0.1:3000
EXPO_PUBLIC_BETTER_AUTH_URL=http://127.0.0.1:3000
EXPO_PUBLIC_ANDROID_USE_ADB_REVERSE=1
```

---

## Emulator

Use **one** of the following.

### Option A: Same as a real device (`adb reverse`)

```bash
adb reverse tcp:3000 tcp:3000
```

Keep `http://127.0.0.1:3000` for the API URLs (same `.env` as the USB device section).

### Option B: No reverse (emulator loopback)

```env
EXPO_PUBLIC_ANDROID_USE_ADB_REVERSE=0
EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:3000
EXPO_PUBLIC_BETTER_AUTH_URL=http://10.0.2.2:3000
```

---

## Quick reference

| Setup | API base |
|-------|----------|
| USB device, or emulator **with** `adb reverse` | `http://127.0.0.1:3000` |
| Emulator **without** `adb reverse` | `http://10.0.2.2:3000` |
