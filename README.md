# Pokédex Challenge

A React Native application built with **TypeScript and Clean Architecture**, using [PokéAPI](https://pokeapi.co/) to browse Pokémon and explore their details.

The project focuses on maintainability, separation of concerns, type safety, testability, and offline data availability.

## Features

- **Pokémon listing:** Displays Pokémon names, Pokédex numbers, and images.
- **Infinite scrolling:** Loads Pokémon in pages of 20 using TanStack Query.
- **Pokémon details:** Displays types, abilities, height, weight, and base statistics.
- **Navigation:** Provides typed navigation between the list and detail screens.
- **UI states:** Handles loading, error, empty, and offline scenarios.
- **Offline persistence:** Saves previously fetched Pokémon data across app restarts.
- **Connectivity handling:** Detects network changes and resumes paused requests.
- **Image fallback:** Displays a local placeholder when a remote image cannot be loaded.
- **Reusable components:** Shares UI components, theme values, and formatting utilities.

## Tech Stack

| Technology          | Purpose                                          |
| ------------------- | ------------------------------------------------ |
| React Native CLI    | Native Android and iOS application               |
| TypeScript          | Static typing and safer contracts                |
| React Navigation    | Typed stack navigation                           |
| TanStack Query      | Server-state management, caching, and pagination |
| AsyncStorage        | Persistent query cache                           |
| NetInfo             | Network connectivity detection                   |
| Jest                | Unit and basic application tests                 |
| ESLint & Prettier   | Code quality and formatting                      |
| Husky & lint-staged | Pre-commit checks                                |
| GitHub Actions      | Continuous integration                           |

## Architecture

The application follows a layered approach inspired by **Clean Architecture**, separating business logic, data access, and presentation.

```text
src/
├── app/
│   ├── di/               # Dependency composition
│   └── providers/        # Query, persistence, and connectivity
├── domain/
│   ├── entities/         # Domain models
│   ├── repositories/     # Repository contracts
│   └── useCases/         # Application use cases
├── data/
│   ├── api/              # HTTP communication
│   ├── dto/              # API response structures
│   ├── mappers/          # DTO-to-domain transformations
│   ├── repositories/     # Repository implementations
│   └── validators/       # Runtime response validation
├── presentation/
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Query hooks
│   ├── navigation/       # Navigation configuration
│   ├── screens/          # Application screens
│   ├── theme/            # Design tokens
│   └── utils/            # Presentation helpers
└── assets/               # Local image assets
```

### Domain Layer

Contains the core application models, repository contracts, and use cases.

It does not depend on React Native, navigation, or external API implementations.

The main use cases are:

- `GetPokemonList`
- `GetPokemonDetail`

### Data Layer

Implements the domain repository contracts and communicates with PokéAPI.

Responsibilities include:

- Fetching remote data through an HTTP client.
- Validating external responses at runtime.
- Mapping API DTOs into domain entities.
- Translating HTTP and response errors into predictable failures.

### Presentation Layer

Contains screens, UI components, navigation, and custom hooks.

Screens coordinate data retrieval and rendering, while reusable components focus on displaying information.

The presentation layer consumes use cases instead of directly calling API endpoints.

### Dependency Composition

Dependencies are assembled centrally in `src/app/di/container.ts`.

The repository receives an HTTP client through constructor injection, allowing implementations to be replaced without changing business logic.

This also makes domain and data logic easier to test with mocks.

## Key Technical Decisions

### TanStack Query instead of global client-state management

The application's main state comes from a remote API.

TanStack Query provides caching, request status, retries, pagination, and data synchronization without introducing a separate global store.

- `useInfiniteQuery` manages paginated Pokémon lists.
- `useQuery` retrieves individual Pokémon details.
- Query keys identify and cache requests independently.

Redux Toolkit or Zustand would introduce additional state-management complexity without a clear requirement.

### Repository Pattern and Dependency Injection

Repository interfaces are defined independently of their implementations.

This allows use cases to depend on contracts instead of specific HTTP libraries or API details.

Constructor injection also enables isolated tests using mocked dependencies.

### Runtime Validation

TypeScript types do not validate network responses at runtime.

API responses are treated as `unknown` and validated before being transformed into domain entities.

This helps prevent unexpected external data from propagating into the application.

### Offline Persistence

TanStack Query's cache is persisted using AsyncStorage.

Previously fetched Pokémon data can be restored after restarting the application, within the configured cache lifetime.

NetInfo is integrated with TanStack Query's `onlineManager` to manage connectivity changes and paused requests.

### Image Handling

Remote images are displayed using React Native's built-in `Image` component.

A reusable image component displays a local placeholder when loading fails and retries after reconnection.

No additional image-loading dependency was introduced because the current requirements can be handled with React Native's built-in capabilities.

## Requirements

- Node.js **22.11.0 or later**
- npm
- React Native CLI development environment
- Android Studio and Android SDK for Android development
- macOS with Xcode and CocoaPods for iOS development

Follow the official [React Native environment setup guide](https://reactnative.dev/docs/set-up-your-environment) if the native development environment is not already configured.

## Installation

Clone the repository:

```bash
git clone https://github.com/TairRod/pokedex-challenge.git
cd pokedex-challenge
```

Install dependencies:

```bash
npm ci
```

### Android

Start Metro:

```bash
npm start
```

In another terminal, run:

```bash
npm run android
```

To build and install a Release version:

```bash
npx react-native run-android --mode release
```

### iOS

Install native dependencies:

```bash
bundle install
cd ios
bundle exec pod install
cd ..
```

Start Metro:

```bash
npm start
```

In another terminal, run:

```bash
npm run ios
```

To run a Release build in the simulator:

```bash
npx react-native run-ios --mode Release
```

An appropriately configured Xcode environment is required.

## Testing and Code Quality

The project uses Jest for unit testing and basic application verification.

Tests cover domain use cases and data-layer components such as the HTTP client, repository implementation, mappers, and response validators.

Native dependencies including AsyncStorage and NetInfo are mocked in the Jest environment.

Run tests:

```bash
npm test
```

Run tests in CI mode:

```bash
npm run test:ci
```

Check TypeScript types:

```bash
npm run typecheck
```

Run ESLint:

```bash
npm run lint
```

Check formatting:

```bash
npm run format:check
```

Automatically format the project:

```bash
npm run format
```

### Continuous Integration

GitHub Actions is configured to run code-quality checks.

Husky and lint-staged provide additional pre-commit validation to help maintain consistent formatting and code quality.

## Offline Behavior and Known Limitations

- Previously fetched Pokémon lists and details are available offline while their persisted cache remains valid.
- Details that have never been fetched require an internet connection.
- Remote Pokémon images are not explicitly stored as local files. A placeholder is displayed when an image is unavailable.
- Offline persistence, automatic reconnection, and image recovery were successfully tested on Android Release.
- **iOS Simulator:** NetInfo did not consistently detect reconnection after restoring the Mac's internet connection, leaving some queries paused. This behavior requires further validation on a physical iOS device.

## Future Improvements

- Add more presentation-layer tests for navigation, pagination, and offline states.
- Improve offline image availability through explicit local caching.
- Expand accessibility and responsive-layout testing.
- Add more detailed error reporting and diagnostics.

## API

Pokémon data is provided by [PokéAPI](https://pokeapi.co/), a public REST API.

This project is a technical assessment and is not affiliated with Nintendo, Game Freak, or The Pokémon Company.
