import bcrypt from 'bcryptjs';

// Define user types
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Not included for social logins
  avatar?: string;
  phone?: string;
  role: UserRole;
  preferences?: UserPreferences;
  savedProperties: string[]; // Array of property IDs
  createdAt: string;
  provider: 'credentials' | 'google' | 'facebook' | 'apple';
  providerAccountId?: string;
}

export type UserRole = 'user' | 'agent' | 'admin';

export interface UserPreferences {
  propertyTypes?: string[];
  priceRange?: [number, number];
  locations?: string[];
  bedroomsRange?: [number, number];
  notifications: boolean;
  emailUpdates: boolean;
}

// In-memory user database
let users: User[] = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@estateeminenceventures.com',
    password: bcrypt.hashSync('admin123', 10),
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
    role: 'admin',
    savedProperties: [],
    createdAt: new Date('2025-01-01').toISOString(),
    provider: 'credentials',
    preferences: {
      notifications: true,
      emailUpdates: true
    }
  },
  {
    id: 'agent-1',
    name: 'Rajesh Sharma',
    email: 'rajesh@estateeminenceventures.com',
    password: bcrypt.hashSync('agent123', 10),
    avatar: 'https://ui-avatars.com/api/?name=Rajesh+Sharma&background=4F46E5&color=fff',
    phone: '+91 98765 43210',
    role: 'agent',
    savedProperties: [],
    createdAt: new Date('2025-01-15').toISOString(),
    provider: 'credentials',
    preferences: {
      notifications: true,
      emailUpdates: true
    }
  },
  {
    id: 'user-1',
    name: 'Demo User',
    email: 'user@example.com',
    password: bcrypt.hashSync('password123', 10),
    avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=10B981&color=fff',
    phone: '+91 91234 56789',
    role: 'user',
    savedProperties: ['prop-001', 'prop-004'],
    createdAt: new Date('2025-02-20').toISOString(),
    provider: 'credentials',
    preferences: {
      propertyTypes: ['Apartment', 'Villa'],
      locations: ['Mumbai', 'Bangalore'],
      notifications: true,
      emailUpdates: true
    }
  }
];

// Get all users (used by admin)
export function getAllUsers(): User[] {
  return [...users];
}

// Create a new user
export function createUser(userData: Omit<User, 'id' | 'createdAt'>): User | null {
  try {
    // Check if email already exists
    if (users.some(user => user.email === userData.email)) {
      return null;
    }

    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
      savedProperties: userData.savedProperties || []
    };

    // Hash password if provided
    if (newUser.password) {
      newUser.password = bcrypt.hashSync(newUser.password, 10);
    }

    // Add new user to our array
    users.push(newUser);

    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword as User;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

// Find user by email
export function findUserByEmail(email: string): User | null {
  return users.find(user => user.email === email) || null;
}

// Find user by ID
export function findUserById(id: string): User | null {
  return users.find(user => user.id === id) || null;
}

// Update user
export function updateUser(id: string, userData: Partial<User>): User | null {
  try {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    // Don't allow changing email to an existing one
    if (userData.email && userData.email !== users[userIndex].email) {
      const emailExists = users.some(user => user.id !== id && user.email === userData.email);
      if (emailExists) return null;
    }

    // Hash password if provided
    if (userData.password) {
      userData.password = bcrypt.hashSync(userData.password, 10);
    }

    // Update user
    const updatedUser = { ...users[userIndex], ...userData };
    users[userIndex] = updatedUser;

    // Return user without password
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword as User;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}

// Delete user
export function deleteUser(id: string): boolean {
  try {
    const initialLength = users.length;
    users = users.filter(user => user.id !== id);
    return users.length < initialLength;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
}

// Add a property to user's saved properties
export function saveProperty(userId: string, propertyId: string): boolean {
  try {
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) return false;

    // Already saved
    if (users[userIndex].savedProperties.includes(propertyId)) return true;

    // Add property to saved list
    users[userIndex].savedProperties.push(propertyId);
    return true;
  } catch (error) {
    console.error('Error saving property:', error);
    return false;
  }
}

// Remove a property from user's saved properties
export function unsaveProperty(userId: string, propertyId: string): boolean {
  try {
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) return false;

    // Get current saved properties
    const savedProps = users[userIndex].savedProperties;

    // Remove property from saved list
    users[userIndex].savedProperties = savedProps.filter(id => id !== propertyId);

    // Return true if we removed something
    return savedProps.length !== users[userIndex].savedProperties.length;
  } catch (error) {
    console.error('Error unsaving property:', error);
    return false;
  }
}

// Verify user credentials
export function verifyCredentials(email: string, password: string): User | null {
  try {
    const user = findUserByEmail(email);
    if (!user || !user.password) return null;

    const isValid = bcrypt.compareSync(password, user.password);

    if (isValid) {
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    }

    return null;
  } catch (error) {
    console.error('Error verifying credentials:', error);
    return null;
  }
}

// Find or create a user from a social login
export function findOrCreateSocialUser(
  provider: 'google' | 'facebook' | 'apple',
  providerAccountId: string,
  email: string,
  name: string,
  avatar?: string
): User | null {
  try {
    // Check if user exists with this email
    let user = findUserByEmail(email);

    if (user) {
      // If user exists but is using a different provider
      if (user.provider !== provider || user.providerAccountId !== providerAccountId) {
        // Update provider info
        user = updateUser(user.id, { provider, providerAccountId });
      }
      return user;
    }

    // Create new user if doesn't exist
    return createUser({
      name,
      email,
      avatar,
      role: 'user',
      provider,
      providerAccountId,
      savedProperties: [],
      preferences: {
        notifications: true,
        emailUpdates: true
      }
    });
  } catch (error) {
    console.error('Error with social login:', error);
    return null;
  }
}
