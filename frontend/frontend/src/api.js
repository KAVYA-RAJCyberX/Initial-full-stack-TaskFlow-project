// src/api.js

const API_BASE_URL = "/api/v1";
 // Match your backend URL

// Helper function for all requests
async function apiCall(endpoint, method = 'GET', data = null) {
    const token = localStorage.getItem('token');

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Auth Endpoints
export const authAPI = {
    login: (email, password) =>
        apiCall('/auth/login', 'POST', { email, password }),

    signup: (name, email, password) =>
        apiCall('/auth/register', 'POST', { name, email, password }),

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return Promise.resolve();
    }
};

// Task Endpoints
export const taskAPI = {
    getAllTasks: () => apiCall('/tasks', 'GET'),

    createTask: (taskData) =>
        apiCall('/tasks', 'POST', taskData),

    updateTask: (id, taskData) =>
        apiCall(`/tasks/${id}`, 'PUT', taskData),

    deleteTask: (id) =>
        apiCall(`/tasks/${id}`, 'DELETE'),

    getTaskById: (id) =>
        apiCall(`/tasks/${id}`, 'GET')
};
