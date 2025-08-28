# Error Handling System for Pet Website

This document explains the comprehensive error handling system implemented across all layouts in the pet website application.

## Overview

The error handling system consists of three main components that work together to catch and display errors gracefully:

1. **ErrorPage** - A comprehensive error page component
2. **ErrorBoundary** - Catches JavaScript errors in React components
3. **LayoutWrapper** - Handles route errors and displays the error page

## Components

### 1. ErrorPage (`src/pages/error-page.tsx`)

A comprehensive error page that:

- Displays different error messages based on HTTP status codes
- Supports both Arabic and English languages
- Provides user-friendly error descriptions
- Includes action buttons (Go Back, Try Again, Go Home)
- Shows technical error details when expanded
- Offers help links for support

**Features:**

- Responsive design that works in all layouts
- Status code-specific error handling (401, 403, 404, 500, 503)
- Bilingual support (Arabic/English)
- Expandable technical details
- User-friendly navigation options

### 2. ErrorBoundary (`src/components/ui/ErrorBoundary.tsx`)

A React error boundary that:

- Catches JavaScript errors in component trees
- Displays a fallback UI when errors occur
- Provides error details for debugging
- Offers refresh and navigation options

**Features:**

- Catches component errors gracefully
- Displays user-friendly error messages
- Provides technical error information
- Includes recovery actions

### 3. LayoutWrapper (`src/components/ui/LayoutWrapper.tsx`)

A wrapper component that:

- Catches route errors using `useRouteError()`
- Displays the ErrorPage when route errors occur
- Works seamlessly with all layouts
- Maintains layout structure during errors

## Implementation Across Layouts

All layouts now include error handling:

### Main Layout (`src/layouts/index.tsx`)

- Wraps the entire application with ErrorBoundary
- Includes LayoutWrapper for route error handling
- Maintains global error catching

### Default Layout (`src/layouts/Default/index.tsx`)

- Header + Footer layout
- Includes error handling for main content areas

### Auth Layout (`src/layouts/Auth/index.tsx`)

- Authentication pages layout
- Handles errors in login/register forms

### Adoption Layout (`src/layouts/Adoption/index.tsx`)

- Pet adoption pages layout
- Error handling for adoption-related content

### Vet Layout (`src/layouts/Vet/index.tsx`)

- Veterinary services layout
- Error handling for vet-related pages

### User Dashboard Layout (`src/layouts/userDashbord/index.tsx`)

- User dashboard layout
- Error handling for dashboard functionality

## How It Works

1. **JavaScript Errors**: Caught by ErrorBoundary component
2. **Route Errors**: Caught by LayoutWrapper using React Router's error handling
3. **API Errors**: Can be caught and displayed using the ErrorPage component
4. **Layout Consistency**: Error pages maintain the same visual style across all layouts

## Error Types Handled

- **401 Unauthorized**: User not logged in
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Page doesn't exist
- **500 Server Error**: Backend/server issues
- **503 Service Unavailable**: Service temporarily down
- **JavaScript Errors**: Component crashes and runtime errors
- **Route Errors**: Navigation and routing issues

## Testing the System

Visit `/ui` route to access the ErrorTest component that allows you to:

- Trigger JavaScript errors to test ErrorBoundary
- Test error display in different layouts
- Verify error page functionality

## Benefits

1. **User Experience**: Users see helpful error messages instead of crashes
2. **Layout Consistency**: Error pages maintain the same design across all layouts
3. **Bilingual Support**: Error messages in both Arabic and English
4. **Recovery Options**: Users can easily navigate back or retry
5. **Debugging**: Technical details available for developers
6. **Graceful Degradation**: App continues to function even when errors occur

## Customization

To customize error handling:

1. **Modify ErrorPage**: Update error messages, styling, or actions
2. **Add Custom Error Types**: Extend the error handling logic
3. **Customize ErrorBoundary**: Modify fallback UI or error logging
4. **Layout-Specific Handling**: Add layout-specific error handling logic

## Best Practices

1. **Always wrap layouts** with LayoutWrapper for route error handling
2. **Use ErrorBoundary** at the top level to catch JavaScript errors
3. **Provide meaningful error messages** in user's language
4. **Include recovery actions** like refresh or navigation
5. **Log errors** for debugging and monitoring
6. **Test error scenarios** to ensure proper handling

## File Structure

```
src/
├── pages/
│   └── error-page.tsx          # Main error page component
├── components/
│   └── ui/
│       ├── ErrorBoundary.tsx   # React error boundary
│       ├── LayoutWrapper.tsx   # Route error wrapper
│       └── ErrorTest.tsx       # Testing component
└── layouts/
    ├── index.tsx               # Main layout with error handling
    ├── Default/
    ├── Auth/
    ├── Adoption/
    ├── Vet/
    └── userDashbord/
```

This error handling system ensures that your pet website provides a robust and user-friendly experience even when errors occur, maintaining consistency across all layouts and providing helpful recovery options for users.
