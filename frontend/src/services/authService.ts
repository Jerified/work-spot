import axios from 'axios';
import { LoginInput, SignupInput, ForgotPasswordInput, ResetPasswordInput } from '../lib/validations/auth';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const authService = {
  async login(data: LoginInput) {
    const response = await axios.post(`${NEXT_PUBLIC_API_URL}/api/auth/login`, data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async register(data: SignupInput) {
    const response = await axios.post(`${NEXT_PUBLIC_API_URL}/api/auth/register`, data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async forgotPassword(data: ForgotPasswordInput) {
    const response = await axios.post(`${NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, data);
    return response.data;
  },

  async resetPassword(token: string, data: ResetPasswordInput) {
    const response = await axios.post(`${NEXT_PUBLIC_API_URL}/api/auth/reset-password/${token}`, data);
    return response.data;
  },

  async googleLogin(token: string) {
    const response = await axios.post(`${NEXT_PUBLIC_API_URL}/api/auth/google`, { token });
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