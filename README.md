# Ultimate Anime Team Builder 🌟

  **Most Binoee Arefin**

This web app allows users to create, manage, and discover anime characters while building their ultimate anime team. Users can authenticate, create character profiles, upvote favorites, and manage their own character submissions.



##  Features Overview

 **Core Functionality**
- **Character Creation**: Users can add anime characters with name, anime series, image, and description
- **Team Building**: Build your ultimate 3-character anime team
- **Interactive Feed**: Browse characters with sorting options (Latest, Popular, Home)
- **Upvoting System**: Vote for your favorite characters
- **User Authentication**: Secure login/signup with Supabase Auth
- **Character Management**: Edit and delete your own character submissions

**User Authentication & Profiles**
- Secure email/password authentication
- User profile modal with statistics (total characters, favorite anime, join date)
- Owner-based access control for character editing/deletion
- Session persistence across browser sessions

**Character Management**
- **Create**: Add new anime characters with image previews
- **Read**: Browse characters across multiple views
- **Update**: Edit your own character submissions via modal forms
- **Delete**: Remove your characters with confirmation dialogs

**Interactive Features**
- **Smart Team Building**: Visual team sidebar with 3-character limit
- **Real-time Upvoting**: Instant feedback with optimistic UI updates
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Toast Notifications**: User-friendly success/error messages

 **Navigation & Sorting**
- **Home**: Latest characters with team building functionality
- **Popular**: Characters sorted by upvote count
- **Latest**: Newest character submissions
- **Responsive Navigation**: Clean, modern navbar with authentication status


### **Frontend**
- **React 18** - Modern JavaScript framework
- **Vite** - Lightning-fast build tool and dev server
- **React Router** - Client-side routing
- **React Toastify** - Elegant notifications

### **Backend & Database**
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Real-time subscriptions
  - Row Level Security (RLS)
  - User authentication & authorization

### **Styling**
- **Custom CSS** - Tailored styling with modern design patterns
- **Glass Morphism Effects** - Modern UI aesthetics
- **Responsive Design** - Mobile-first approach




5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## How to Use

1. **Sign Up/Login**: Create an account or log in to existing account
2. **Create Characters**: Add your favorite anime characters with details and images
3. **Build Your Team**: Select up to 3 characters for your ultimate anime team
4. **Discover & Vote**: Browse other users' characters and upvote your favorites
5. **Manage Content**: Edit or delete your own character submissions
6. **Explore Views**: Check Popular for trending characters, Latest for newest additions

## Security Features

- **Row Level Security (RLS)**: Database-level access control
- **Authentication Required**: Protected routes and actions
- **Owner Verification**: Users can only modify their own content
- **Secure Upvoting**: Protected database functions for vote integrity


## Technical Implementation

### **State Management**
- React hooks for local state management
- Optimistic UI updates for better user experience
- Real-time synchronization with Supabase

### **Performance Optimizations**
- Vite for fast development and building
- Efficient re-rendering with proper React patterns
- Optimized database queries with proper indexing

### **Error Handling**
- Comprehensive error boundaries
- User-friendly error messages
- Graceful fallbacks for network issues

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Developer

**Most Binoee Arefin**
- Email: [binoee1@gmail.com]

## Acknowledgments

- [Supabase](https://supabase.com/) for the excellent backend platform
- [React](https://reactjs.org/) for the powerful frontend framework
- [Vite](https://vitejs.dev/) for the amazing development experience
- Anime community for inspiration and character ideas

---

Built with ❤️ for anime fans by anime fans