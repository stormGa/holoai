import axios from 'axios';

// Create basic Axios instance
const client = axios.create({
    baseURL: '/api', // Rely on proxy to forward to localhost:8080
    withCredentials: true, // Important for HttpOnly cookies
    headers: {
        'Content-Type': 'application/json'
    }
});

// Response interceptor to handle auth errors globally
client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Optional: Redirect to login or handled by AuthContext
            console.warn('Unauthorized access');
        }
        return Promise.reject(error);
    }
);

export default client;
