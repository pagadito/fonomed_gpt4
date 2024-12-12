# Frontend - Fonomed Project

The frontend of the Fonomed project is a mobile application built with React Native.
It provides an intuitive interface for patients and doctors to manage healthcare tasks.

## Features

- Cross-platform compatibility (Android and iOS).
- Secure login with Two-Factor Authentication (2FA).
- Medical history and appointment management.
- Push notifications and reminders.
- Video consultations via Zoom SDK.

## Directory Structure

- **screens/**: Contains UI components for various app screens (e.g., Achievements, Appointments).
- **components/**: Reusable UI components (e.g., buttons, input fields).

## Setup

1. Install dependencies:
    ```bash
    npm install
    ```
2. Run the app on an emulator or device:
    ```bash
    npx react-native run-android  # For Android
    npx react-native run-ios      # For iOS
    ```

## Note

Ensure the backend server is running and accessible at the configured base URL.
