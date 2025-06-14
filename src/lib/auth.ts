interface User {
  id: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'USER';
  name?: string;
}

// Mock user database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@Walbas.com',
    password: 'admin123', // In real app, store hashed passwords
    role: 'ADMIN', 
    name: 'Admin User'
  },
  {
    id: '2',
    email: 'user@Walbas.com',
    password: 'user123',
    role: 'USER',
    name: 'Regular User'
  }
];

export const login = async (email: string, password: string) => {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Create a simple JWT token (in real app, use a proper library like jsonwebtoken)
  const token = btoa(JSON.stringify({
    userId: user.id,
    role: user.role,
    exp: Date.now() + 86400000 // 1 day expiration
  }));

  return { 
    token, 
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    }
  };
};

export const verifyToken = (token: string) => {
  try {
    const payload = JSON.parse(atob(token));
    if (payload.exp < Date.now()) {
      throw new Error("Token expired");
    }
    return payload;
  } catch {
    throw new Error("Invalid token");
  }
};