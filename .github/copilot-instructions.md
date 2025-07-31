# AI Coding Assistant Instructions

## Project Overview

This is a modern React application built with TypeScript, featuring three main applications:

1. Todo List - A task management application
2. Weather App - A weather forecast application using OpenWeatherMap API
3. Shopping Cart - An e-commerce application with Redux state management

## Architecture & Patterns

### Component Structure

- `pages/` - Main page components (HomePage, TodoPage, WeatherPage, ShoppingPage)
- `components/` - Reusable components organized by feature (todo-lists/, weather/, cart/)
- `services/` - API services (weatherApi.ts)
- `store/` - Redux store and slices (cartSlice.ts)
- `types/` - TypeScript interfaces and types
- `utils/` - Utility functions and helpers
- `hooks/` - Custom React hooks
- `layout/` - Layout components

### Key Design Patterns

1. **Feature-based Organization**: Components are grouped by feature (todo-lists, weather, cart)
2. **Service Layer Pattern**: API calls are abstracted in service files (weatherApi.ts)
3. **Redux State Management**: Used for shopping cart state with local storage persistence
4. **Custom Hooks Pattern**: Business logic separated into hooks (useWeather.ts)
5. **Type-First Development**: Comprehensive TypeScript interfaces in types/ directory

## Core Features & Implementation Details

### Weather App

- Uses OpenWeatherMap API with fallback icons
- Supports both city search and map-based location selection
- Implements parallel API calls for better performance

```typescript
// Example from weatherApi.ts
const [currentWeather, forecast] = await Promise.all([
  this.getCurrentWeather(city),
  this.getForecast(city),
]);
```

### Shopping Cart

- Redux-based state management with local storage persistence
- Implements cart operations (add, remove, update quantity)
- Uses cache utilities for data persistence

```typescript
// Example cache pattern
cacheUtils.saveCart(state.items, "localStorage");
```

### Todo List

- Supports filtering, sorting, and bulk operations
- Persists data in local storage
- Uses TypeScript discriminated unions for action types

## Common Patterns

### Error Handling

```typescript
try {
  // API calls
} catch (error: any) {
  let errorMessage = "Default error message";
  if (error.message.includes("404")) {
    errorMessage = "Resource not found";
  }
  // Handle other specific cases...
}
```

### UI Components

- Uses Ant Design (antd) for UI components
- Consistent styling patterns with custom CSS
- Responsive design with flex/grid layouts

### State Management

- Local state with useState for component-level state
- Redux for global shopping cart state
- Custom hooks for complex state logic

## Development Workflow

### Adding New Features

1. Define TypeScript interfaces in appropriate types/ file
2. Create new components in feature-specific directory
3. Implement business logic in custom hooks if needed
4. Add to appropriate page component

### Best Practices

- Use TypeScript interfaces for all props and state
- Implement proper error handling and loading states
- Follow existing file structure and naming conventions
- Use antd components and follow their patterns
