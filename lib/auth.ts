import { User } from './db';

// Mocking a logged-in admin user
export const getCurrentUser = async (): Promise<User | null> => {
  return {
    id: 'u1',
    email: 'admin@example.com',
    role: 'admin',
  };
};
