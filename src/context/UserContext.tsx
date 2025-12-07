import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import client from '../api/client.ts';
import { useNavigate, useLocation } from 'react-router-dom';

export interface User {
    id: string;
    name: string;
    avatar: string;
    role: 'user' | 'creator' | 'admin';
    email?: string;
}

interface UserContextType {
    currentUser: User | null;
    isLoading: boolean;
    login: (start: () => void, end: () => void, payload: any) => Promise<void>;
    register: (start: () => void, end: () => void, payload: any) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const checkAuth = async () => {
        try {
            const res = await client.get('/auth/me');
            const data = res.data;
            setCurrentUser({
                id: data.id || 'u1',
                name: data.name || data.email,
                avatar: data.avatar || (data.name ? data.name[0].toUpperCase() : 'U'),
                role: 'user',
                email: data.email
            });
        } catch (error) {
            setCurrentUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (start: () => void, end: () => void, payload: any) => {
        start();
        try {
            await client.post('/auth/login', payload);
            await checkAuth(); // Refresh user info
            navigate('/platform');
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            end();
        }
    };

    const register = async (start: () => void, end: () => void, payload: any) => {
        start();
        try {
            await client.post('/auth/register', payload);
            // Auto login or ask user to login? Backend API returns User object on register usually.
            // But auth state (cookie) might not be set if register doesn't issue token.
            // Let's assume register just creates user, and we ask them to login (or auto login if API supports).
            // Based on backend code: register just returns User. No cookie.
            // So we prompt user to login, or we call login automatically.
            // For UX, let's call login automatically.
            await login(start, end, { email: payload.email, password: payload.password });
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            end();
        }
    };

    const logout = async () => {
        try {
            await client.post('/auth/logout');
            setCurrentUser(null);
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <UserContext.Provider value={{ currentUser, isLoading, login, register, logout, checkAuth }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
