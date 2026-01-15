# Campus Connect

A modern campus management system built with Next.js, React, and TypeScript. Manage attendance, events, timetables, and users all in one place.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Campus_connect
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
Campus_connect/
├── src/
│   ├── app/                    # Next.js pages & API routes
│   │   ├── api/                # Backend API endpoints
│   │   ├── dashboard/          # Dashboard pages
│   │   ├── login/              # Login page
│   │   └── signup/             # Signup page
│   ├── backend/                # Backend services
│   │   └── services/           # Business logic
│   ├── components/             # React components
│   │   ├── features/           # Feature-based components
│   │   ├── layout/             # Layout components
│   │   └── ui/                 # Reusable UI components
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Shared utilities
│       ├── api/                # Frontend API client
│       ├── data/               # Mock/seed data
│       ├── types/              # TypeScript types
│       └── utils/              # Utility functions
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## 🏗️ Architecture

### Frontend/Backend Separation

The application follows a clean separation between frontend and backend:

**Frontend (`src/app/`, `src/components/`)**
- Pages: Next.js App Router pages
- Components: React UI components organized by feature
- Hooks: Custom React hooks
- API Client: Frontend API utilities (`src/lib/api/client.ts`)

**Backend (`src/backend/`, `src/app/api/`)**
- Services: Business logic and data management (`src/backend/services/`)
- API Routes: RESTful endpoints (`src/app/api/`)

### Data Flow

```
Component → API Client → API Route → Backend Service → Storage
```

1. **Frontend Components** call methods from `src/lib/api/client.ts`
2. **API Client** makes HTTP requests to `/api/*` routes
3. **API Routes** (`src/app/api/`) handle HTTP requests and use backend services
4. **Backend Services** (`src/backend/services/`) contain business logic
5. **Storage Service** handles data persistence (currently localStorage, ready for database)

### API Endpoints

#### Users API
- `GET /api/users/students` - Get all students
- `POST /api/users/students` - Create a student
- `GET /api/users/students/[id]` - Get student by ID
- `PATCH /api/users/students/[id]` - Update student
- `DELETE /api/users/students/[id]` - Delete student
- `GET /api/users/faculty` - Get all faculty
- `POST /api/users/faculty` - Create faculty member
- `GET /api/users/all` - Get all users (for authentication)

#### Events API
- `GET /api/events` - Get all events
- `POST /api/events` - Create an event
- `GET /api/events/[id]` - Get event by ID
- `PATCH /api/events/[id]` - Update event
- `DELETE /api/events/[id]` - Delete event
- `POST /api/events/[id]/like` - Like an event
- `POST /api/events/[id]/rsvp` - RSVP to an event

#### Attendance API
- `GET /api/attendance/history` - Get attendance history
- `POST /api/attendance/history` - Add attendance log
- `GET /api/attendance/live` - Get live attendance state
- `POST /api/attendance/live` - Save live attendance state

#### Timetable API
- `GET /api/timetable` - Get timetable (optionally filtered by division)
- `POST /api/timetable` - Save timetable

## 💻 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Shadcn UI
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 🎯 Features

### Role-Based Access
- **Admin**: Full system access, user management, analytics
- **Faculty**: Attendance management, event creation, timetable scheduling
- **Student**: View timetable, mark attendance, RSVP to events

### Key Functionality
- ✅ User authentication and role management
- ✅ Attendance tracking with multiple methods (Camera, Manual, RFID)
- ✅ Event management with RSVP and comments
- ✅ Timetable viewing and scheduling
- ✅ Analytics and reporting
- ✅ Real-time attendance sessions

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

### Adding New Features

1. **Create Component**: Add to `src/components/features/[feature-name]/`
2. **Create API Route**: Add to `src/app/api/[feature-name]/`
3. **Create Backend Service**: Add to `src/backend/services/[feature-name].service.ts`
4. **Update API Client**: Add methods to `src/lib/api/client.ts`

### Best Practices

- ✅ **Feature-based Components**: Organize components by feature
- ✅ **API-First**: All data operations go through the API layer
- ✅ **Type Safety**: Use TypeScript types from `lib/types/`
- ✅ **Separation of Concerns**: Clear frontend/backend separation
- ✅ **Barrel Exports**: Use `index.ts` files for cleaner imports

## 🗄️ Data Storage

Currently, the application uses **localStorage** for data persistence (handled by `src/backend/services/storage.ts`). This can be easily replaced with a real database:

1. Update `StorageService` methods to use database queries
2. Frontend components don't need changes (they use the API layer)
3. Add database connection configuration
4. Update environment variables if needed

### Mock Data

Mock/seed data is located in `src/lib/data/` and is used as fallback when localStorage is empty. This allows the app to work without a database during development.

## 🔐 Authentication

Currently uses a simple role-based authentication system. For production:

1. Implement proper authentication (JWT, sessions, etc.)
2. Add authorization middleware to API routes
3. Secure API endpoints
4. Add password hashing and validation

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
# Add your environment variables here
# Example:
# DATABASE_URL=your_database_url
# API_SECRET=your_api_secret
```

### Next Steps for Production

- [ ] Replace localStorage with a real database (PostgreSQL, MongoDB, etc.)
- [ ] Implement proper authentication and authorization
- [ ] Add API rate limiting
- [ ] Set up error monitoring and logging
- [ ] Configure CI/CD pipeline
- [ ] Add input validation and sanitization
- [ ] Implement caching layer
- [ ] Add API documentation (Swagger/OpenAPI)

## 📝 Continue Development

"Continue Development" means you can now:

1. **Add New Features**: The architecture is set up to easily add new features
   - Add new components in `components/features/`
   - Create corresponding API routes in `app/api/`
   - Add backend services as needed

2. **Enhance Existing Features**: 
   - Improve UI/UX of existing components
   - Add validation and error handling
   - Enhance performance

3. **Replace Mock Storage**:
   - Connect to a real database (PostgreSQL, MongoDB, etc.)
   - Update `StorageService` in `backend/services/storage.ts`
   - No frontend changes needed!

4. **Add Authentication**:
   - Implement JWT or session-based auth
   - Add auth middleware to API routes
   - Secure endpoints

5. **Improve Testing**:
   - Add unit tests for services
   - Add integration tests for API routes
   - Add E2E tests for components

6. **Deploy**:
   - Set up production environment
   - Configure CI/CD
   - Deploy to Vercel, AWS, or your preferred platform

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

[Your License Here]

## 🙏 Acknowledgments

Built with Next.js, React, TypeScript, and Tailwind CSS.
#   C a m p u s _ c o n n e c t  
 