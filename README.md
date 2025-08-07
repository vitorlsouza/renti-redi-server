## How to Run the Code

### Prerequisites

- Node.js (version 20 or higher)
- npm or yarn
- Firebase project with service account key
- OpenWeatherMap API key

### Step-by-Step Instructions

1. **Clone and install dependencies:**

   ```bash
   cd server
   npm install
   ```

2. **Environment Setup:**
   Create a `.env` file in the root directory:

   ```env
   PORT=5000
   OPENWEATHER_BASE_URL=
   OPENWEATHER_API_KEY=
   FIREBASE_PROJECT_ID=
   FIREBASE_SERVICE_ACCOUNT_KEY=
   ```

3. **Firebase Setup:**

   - Create a Firebase project
   - Enable Realtime Database
   - Generate a service account key
   - Add the credentials to your `.env` file

4. **Run the application:**

   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## Approach

### Architecture Decision

I implemented a clean, layered architecture following Node.js best practices:

- Controllers
- Services
- Models\*\*
- Middleware
- Utils

### Key Technical Decisions

- TypeScript
- Express
- Firebase Realtime Database
- OpenWeatherMap API
- Express-validator
- Vitest + Supertest

### ✅ Completed Features

- **User CRUD Operations:**

  - ✅ Create user with name and ZIP code validation
  - ✅ Get all users
  - ✅ Update user by ID
  - ✅ Delete user by ID

- **Data Integration:**

  - ✅ OpenWeatherMap API integration for geocoding
  - ✅ Firebase Realtime Database for data persistence
  - ✅ Automatic coordinate extraction from ZIP codes

- **Validation & Error Handling:**

  - ✅ Input validation using express-validator
  - ✅ ZIP code format validation (12345 or 12345-6789)
  - ✅ Name validation (letters and spaces only, 2-50 characters)
  - ✅ UUID validation for user IDs
  - ✅ Async error handling wrapper

- **API Features:**

  - ✅ RESTful API design
  - ✅ JSON response format with consistent structure
  - ✅ Health check endpoint
  - ✅ CORS support
  - ✅ Request body parsing

- **Development & Testing:**
  - ✅ TypeScript configuration
  - ✅ Development server with hot reload
  - ✅ Comprehensive test suite (unit + integration)
  - ✅ Environment variable management

## Assumptions Made

1. **ZIP Code Format**: Assumed US ZIP code format (5 digits or 5+4 format)
2. **User Names**: Assumed names should only contain letters and spaces (no numbers/special characters)
3. **Firebase Setup**: Assumed Firebase Realtime Database is preferred over Firestore for real-time features

## Testing Done

### Unit Tests (`users.test.ts`)

- ✅ **Health Check**: Verifies server status endpoint
- ✅ **Input Validation**: Tests for invalid name formats (numbers/special chars)
- ✅ **ZIP Code Validation**: Tests for invalid ZIP code formats
- ✅ **Required Fields**: Tests missing field validation
- ✅ **Data Retrieval**: Tests user listing functionality
- ✅ **ID Validation**: Tests invalid UUID format handling

### Integration Tests (`user-integration.test.ts`)

- ✅ **Full CRUD Flow**: Create → Update → Delete user workflow
- ✅ **Data Persistence**: Verifies data is properly stored and retrieved
- ✅ **API Integration**: Tests OpenWeatherMap API integration
- ✅ **Database Operations**: Confirms Firebase operations work correctly

### Test Coverage

- **8 test cases** covering critical functionality
- **API endpoints**: All endpoints tested
- **Validation logic**: All validation rules tested
- **Error scenarios**: Invalid inputs and edge cases
- **Happy path**: Successful operations end-to-end

### How to Run Tests

```bash
# Watch mode for development
npm test

# Single run for CI/CD
npm run test:run
```
