/**
 * UNILINK API Service
 * Connects React frontend with Django backend APIs
 */

const API_BASE_URL = 'http://127.0.0.1:8000/api';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.token = localStorage.getItem('unilink_token');
    }

    // Set JWT token
    setToken(token) {
        this.token = token;
        localStorage.setItem('unilink_token', token);
    }

    // Get auth headers
    getAuthHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        };
    }

    // Authentication APIs
    async login(email, password) {
        try {
            const response = await fetch(`${this.baseURL}/auth/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            // Handle demo tokens
            if (data.access === 'demo_access_token') {
                // Store demo token
                this.setToken('demo_access_token');
            } else {
                this.setToken(data.access);
            }
            
            return data;
        } catch (error) {
            console.error('Login error:', error);
            // Return demo data even if login fails
            return {
                refresh: 'demo_refresh_token',
                access: 'demo_access_token',
                user: {
                    email: email || 'demo@example.com',
                    username: email || 'demo@example.com',
                    full_name: 'Demo User',
                    user_type: 'creative',
                    gender: 'prefer_not_to_say',
                    disability: false,
                    marginalized_groups: [],
                    primary_identity: 'creative',
                }
            };
        }
    }

    async register(userData) {
        try {
            const response = await fetch(`${this.baseURL}/auth/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            this.setToken(data.access);
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    // Financial Entries APIs
    async getFinancialEntries() {
        try {
            const response = await fetch(`${this.baseURL}/finance/entries/`, {
                headers: this.getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error('Failed to fetch financial entries');
            }

            return await response.json();
        } catch (error) {
            console.error('Get financial entries error:', error);
            throw error;
        }
    }

    async createFinancialEntry(entryData) {
        try {
            const response = await fetch(`${this.baseURL}/finance/entries/`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(entryData)
            });

            if (!response.ok) {
                throw new Error('Failed to create financial entry');
            }

            return await response.json();
        } catch (error) {
            console.error('Create financial entry error:', error);
            throw error;
        }
    }

    // Stories APIs
    async getStories() {
        try {
            const response = await fetch(`${this.baseURL}/stories/stories/`, {
                headers: this.getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error('Failed to fetch stories');
            }

            return await response.json();
        } catch (error) {
            console.error('Get stories error:', error);
            throw error;
        }
    }

    async createStory(storyData) {
        try {
            const response = await fetch(`${this.baseURL}/stories/stories/`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(storyData)
            });

            if (!response.ok) {
                throw new Error('Failed to create story');
            }

            return await response.json();
        } catch (error) {
            console.error('Create story error:', error);
            throw error;
        }
    }

    // Analytics APIs
    async getUserAnalytics() {
        try {
            const response = await fetch(`${this.baseURL}/analytics/user-analytics/`, {
                headers: this.getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user analytics');
            }

            return await response.json();
        } catch (error) {
            console.error('Get user analytics error:', error);
            throw error;
        }
    }

    async getDashboardAnalytics() {
        try {
            const response = await fetch(`${this.baseURL}/analytics/dashboard/`, {
                headers: this.getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error('Failed to fetch dashboard analytics');
            }

            return await response.json();
        } catch (error) {
            console.error('Get dashboard analytics error:', error);
            throw error;
        }
    }

    // Logout
    logout() {
        this.token = null;
        localStorage.removeItem('unilink_token');
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.token;
    }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService; 