import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Mock user data for demonstration
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  bio: string;
  interests: string[];
  location: string;
  profileImage?: string;
  isActive: boolean;
  lastSeen: Date;
  matchPreferences: {
    minAge: number;
    maxAge: number;
    maxDistance: number;
  };
}

const mockUsers: User[] = [
  {
    id: uuidv4(),
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    age: 28,
    bio: 'Love traveling and exploring new cuisines. Looking for someone to share adventures with!',
    interests: ['Travel', 'Cooking', 'Photography', 'Hiking'],
    location: 'San Francisco, CA',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    isActive: true,
    lastSeen: new Date(),
    matchPreferences: {
      minAge: 25,
      maxAge: 35,
      maxDistance: 50
    }
  },
  {
    id: uuidv4(),
    name: 'Jordan Smith',
    email: 'jordan.smith@example.com',
    age: 26,
    bio: 'Software engineer by day, rock climber by weekend. Always up for a good conversation!',
    interests: ['Technology', 'Rock Climbing', 'Coffee', 'Books'],
    location: 'Seattle, WA',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616c6b4d26a',
    isActive: true,
    lastSeen: new Date(Date.now() - 30 * 60000), // 30 minutes ago
    matchPreferences: {
      minAge: 22,
      maxAge: 30,
      maxDistance: 25
    }
  },
  {
    id: uuidv4(),
    name: 'Casey Williams',
    email: 'casey.williams@example.com',
    age: 30,
    bio: 'Artist and yoga instructor. Seeking meaningful connections and mindful living.',
    interests: ['Art', 'Yoga', 'Meditation', 'Music', 'Nature'],
    location: 'Portland, OR',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    isActive: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
    matchPreferences: {
      minAge: 26,
      maxAge: 38,
      maxDistance: 75
    }
  }
];

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    service: 'user-service',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes

// GET /api/users - Retrieve all users (with optional filtering)
app.get('/api/users', (req: Request, res: Response) => {
  try {
    const { 
      active, 
      minAge, 
      maxAge, 
      location, 
      interests, 
      limit = 10, 
      offset = 0 
    } = req.query;

    let filteredUsers = [...mockUsers];

    // Filter by active status
    if (active !== undefined) {
      const isActive = active === 'true';
      filteredUsers = filteredUsers.filter(user => user.isActive === isActive);
    }

    // Filter by age range
    if (minAge) {
      filteredUsers = filteredUsers.filter(user => user.age >= parseInt(minAge as string));
    }
    if (maxAge) {
      filteredUsers = filteredUsers.filter(user => user.age <= parseInt(maxAge as string));
    }

    // Filter by location (partial match)
    if (location) {
      filteredUsers = filteredUsers.filter(user => 
        user.location.toLowerCase().includes((location as string).toLowerCase())
      );
    }

    // Filter by interests
    if (interests) {
      const interestArray = (interests as string).split(',');
      filteredUsers = filteredUsers.filter(user => 
        user.interests.some(interest => 
          interestArray.some(filterInterest => 
            interest.toLowerCase().includes(filterInterest.toLowerCase().trim())
          )
        )
      );
    }

    // Apply pagination
    const limitNum = parseInt(limit as string);
    const offsetNum = parseInt(offset as string);
    const paginatedUsers = filteredUsers.slice(offsetNum, offsetNum + limitNum);

    res.json({
      success: true,
      data: {
        users: paginatedUsers,
        pagination: {
          total: filteredUsers.length,
          limit: limitNum,
          offset: offsetNum,
          hasMore: offsetNum + limitNum < filteredUsers.length
        }
      },
      message: `Retrieved ${paginatedUsers.length} users`
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to retrieve users'
    });
  }
});

// GET /api/users/:id - Retrieve a specific user by ID
app.get('/api/users/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = mockUsers.find(u => u.id === id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
        message: `User with ID ${id} does not exist`
      });
    }

    res.json({
      success: true,
      data: { user },
      message: 'User retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to retrieve user'
    });
  }
});

// POST /api/users - Create a new user (dummy implementation)
app.post('/api/users', (req: Request, res: Response) => {
  try {
    const { name, email, age, bio, interests, location } = req.body;
    
    // Basic validation
    if (!name || !email || !age) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        message: 'Name, email, and age are required fields'
      });
    }

    const newUser: User = {
      id: uuidv4(),
      name,
      email,
      age: parseInt(age),
      bio: bio || '',
      interests: interests || [],
      location: location || '',
      isActive: true,
      lastSeen: new Date(),
      matchPreferences: {
        minAge: Math.max(18, age - 10),
        maxAge: age + 10,
        maxDistance: 50
      }
    };

    // In a real implementation, save to database
    mockUsers.push(newUser);

    res.status(201).json({
      success: true,
      data: { user: newUser },
      message: 'User created successfully'
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to create user'
    });
  }
});

// GET /api/users/:id/matches - Get potential matches for a user
app.get('/api/users/:id/matches', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = mockUsers.find(u => u.id === id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
        message: `User with ID ${id} does not exist`
      });
    }

    // Simple matching algorithm based on preferences
    const potentialMatches = mockUsers.filter(potentialMatch => {
      if (potentialMatch.id === user.id || !potentialMatch.isActive) {
        return false;
      }

      // Age compatibility check
      const ageMatch = potentialMatch.age >= user.matchPreferences.minAge && 
                      potentialMatch.age <= user.matchPreferences.maxAge &&
                      user.age >= potentialMatch.matchPreferences.minAge &&
                      user.age <= potentialMatch.matchPreferences.maxAge;
      
      // Interest compatibility (at least one common interest)
      const commonInterests = user.interests.filter(interest => 
        potentialMatch.interests.includes(interest)
      );
      const hasCommonInterests = commonInterests.length > 0;

      return ageMatch && hasCommonInterests;
    });

    // Add compatibility score
    const matchesWithScore = potentialMatches.map(match => {
      const commonInterests = user.interests.filter(interest => 
        match.interests.includes(interest)
      );
      
      const compatibilityScore = Math.round(
        (commonInterests.length / Math.max(user.interests.length, match.interests.length)) * 100
      );

      return {
        ...match,
        compatibilityScore,
        commonInterests
      };
    });

    // Sort by compatibility score
    matchesWithScore.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    res.json({
      success: true,
      data: {
        matches: matchesWithScore,
        totalMatches: matchesWithScore.length
      },
      message: `Found ${matchesWithScore.length} potential matches`
    });
  } catch (error) {
    console.error('Error finding matches:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to find matches'
    });
  }
});

// 404 handler for undefined routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `The route ${req.method} ${req.originalUrl} does not exist`
  });
});

// Global error handler
app.use((error: any, req: Request, res: Response, next: any) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: 'Something went wrong on our end'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 User Service running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});
