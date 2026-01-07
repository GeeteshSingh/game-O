# SportConnect Application Architecture

## Overview
SportConnect is a social sports application that allows users to connect with friends, schedule games, track activities, and manage their sports-related social interactions. The application is built with React, TypeScript, and uses modern UI libraries for an engaging user experience.

## Tech Stack
- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **UI Library**: shadcn/ui components with Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Calendar**: react-calendar
- **Maps**: react-places-autocomplete
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript ESLint

## Project Structure
```
src/
├── components/          # Reusable UI components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and libraries
├── pages/               # Page components for routing
├── utils/               # Helper functions
├── App.tsx              # Main application component with routing
├── main.tsx             # Application entry point
└── globals.css          # Global styles
```

## Core Components

### Authentication & User Management
- **StravaLogin**: Handles Strava OAuth integration for user authentication
- **ProfileCard/EnhancedProfileCard**: Displays and manages user profile information
- **InvitePage**: Handles user invitations and onboarding

### Dashboard & Analytics
- **Dashboard/EnhancedDashboard**: Main user dashboard with overview of activities
- **DashboardStats**: Key metrics display (friends, games, events, activity)
- **AnalyticsDashboard**: Detailed analytics with charts and graphs
- **SportStats**: Sport-specific statistics visualization

### Social Features
- **FriendsList/EnhancedFriendsList**: Friend management with search and rating
- **MessagingSystem**: Real-time messaging between users
- **NotificationBell/RealTimeNotifications**: Notification system for app events

### Game Management
- **GameList**: Displays available games with filtering options
- **GameCard**: Individual game display component
- **GameSelector/EnhancedGameSelector**: Allows users to select preferred sports
- **GameCalendar/EnhancedGameCalendar**: Calendar view for scheduling games
- **AdvancedGameScheduler**: Comprehensive game scheduling with venue and time selection
- **UpcomingGames**: List of scheduled games

### Activity Tracking
- **ActivityFeed/EnhancedActivityFeed**: Timeline of user activities
- **AnimatedActivityCard**: Individual activity display with animations

### Search & Discovery
- **SearchBar**: Global search component
- **AdvancedSearch**: Comprehensive search with filters for friends, games, and venues
- **FilterDropdown**: Sport filtering options

### Utilities & Helpers
- **LocationAutocomplete**: Google Places integration for location selection
- **GameInviteModal**: Modal for inviting friends to games
- **FriendInviteLink**: Generates shareable links for friend invitations
- **AchievementsList**: Displays user achievements and badges

## Routing Structure
- `/` - Landing page with Strava login
- `/dashboard` - Main user dashboard
- `/games` - Game discovery and management
- `/friends` - Friend list and management
- `/calendar` - Game scheduling calendar
- `/profile` - User profile and settings
- `/messages` - Messaging interface
- `/search` - Advanced search functionality
- `/analytics` - Detailed analytics dashboard
- `/invite/:userId` - User invitation page
- `*` - 404 Not Found page

## State Management
The application uses a combination of:
1. **React Query** for server state management
2. **React useState/useReducer** for local component state
3. **localStorage** for persisting authentication status and preferences
4. **Context API** for global UI state (toasts, themes)

## Data Flow
1. **User Authentication**: Strava OAuth → localStorage token storage
2. **Data Fetching**: React Query hooks for API data
3. **UI Updates**: React state changes trigger component re-renders
4. **User Actions**: Form submissions update both UI and backend (simulated in current implementation)
5. **Real-time Features**: Simulated with useEffect intervals (would use WebSockets in production)

## UI/UX Patterns
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities
- **Consistent Components**: shadcn/ui for standardized UI elements
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Accessibility**: Proper ARIA attributes and semantic HTML
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: Toast notifications for user feedback

## Styling Approach
- **Utility-First CSS**: Tailwind CSS for rapid UI development
- **Component-Based**: Scoped styling with Tailwind classes
- **Design System**: shadcn/ui components for consistent UI patterns
- **Dark Mode**: Built-in dark theme support with next-themes

## Performance Considerations
- **Code Splitting**: Route-based code splitting with React.lazy
- **Bundle Optimization**: Vite's build optimizations
- **Image Optimization**: Placeholder images and lazy loading
- **Virtual Scrolling**: For large lists (implemented in ScrollArea components)
- **Memoization**: React.memo for expensive component renders

## Future Enhancements
1. **Backend Integration**: Replace localStorage with REST API or GraphQL
2. **Real-time Features**: WebSocket integration for live messaging and notifications
3. **Push Notifications**: Native device notifications
4. **Advanced Analytics**: Machine learning for activity recommendations
5. **Social Features**: User groups, communities, and leaderboards
6. **Mobile App**: React Native version for native mobile experience

## Deployment
- **Static Build**: Vite's optimized production build
- **Hosting**: Compatible with Vercel, Netlify, or any static hosting provider
- **Environment Variables**: For API keys and configuration
- **CI/CD**: Ready for GitHub Actions or similar CI/CD platforms

## Testing Strategy
- **Unit Tests**: Jest for utility functions and hooks
- **Component Tests**: React Testing Library for UI components
- **E2E Tests**: Cypress or Playwright for user flows
- **Accessibility Testing**: axe-core integration

## Contributing Guidelines
1. Follow existing code style and patterns
2. Use TypeScript for type safety
3. Write meaningful commit messages
4. Update documentation when adding new features
5. Ensure responsive design for all components
6. Test across different browsers and devices