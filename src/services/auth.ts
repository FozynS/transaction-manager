import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = 'your_secret_key';

interface User {
  id: number;
  username: string;
  password: string;
}

const users: User[] = [];

export const register = async (username: string, password: string): Promise<User | null> => {
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return null;
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: users.length + 1,
    username,
    password: hashedPassword,
  };
  
  users.push(newUser);
  return newUser;
};

export const login = async (username: string, password: string): Promise<string | null> => {
  const user = users.find(user => user.username === username);
  if (!user) {
    return null;
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }
  
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  return token;
};

export const verifyToken = (token: string): { id: number, username: string } | null => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number, username: string };
    return decoded;
  } catch (error) {
    return null;
  }
};
