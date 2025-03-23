import axios from 'axios';
import { LoginInput, SignupInput, ForgotPasswordInput, ResetPasswordInput } from '../lib/validations/auth';

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

export const authService = {
  async login(data: LoginInput) {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async register(data: SignupInput) {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async forgotPassword(data: ForgotPasswordInput) {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, data);
    return response.data;
  },

  async resetPassword(token: string, data: ResetPasswordInput) {
    const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, data);
    return response.data;
  },

  async googleLogin(token: string) {
    const response = await axios.post(`${API_URL}/auth/google`, { token });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },
}; 