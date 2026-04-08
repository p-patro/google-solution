import React, { createContext, useContext, useState, useCallback } from 'react';

export type UserRole = 'guest' | 'admin' | 'emergency';

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole | null;
  user: {
    name: string;
    id: string;
  } | null;
}

interface AuthContextType {
  auth: AuthState;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    role: null,
    user: null,
  });

  const login = useCallback((role: UserRole) => {
    // Mock login
    setAuth({
      isAuthenticated: true,
      role,
      user: {
        name: role.charAt(0).toUpperCase() + role.slice(1) + ' User',
        id: `ID-${role.toUpperCase()}-001`,
      },
    });
  }, []);

  const logout = useCallback(() => {
    setAuth({
      isAuthenticated: false,
      role: null,
      user: null,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
