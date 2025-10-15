import { apiClient } from "./api";
import type {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ApiResponse,
} from "@/shared/types";

class AuthService {
  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('🔐 Attempting login with credentials:', { email: credentials.email, password: '***' });
      
      const response = await apiClient.post<AuthResponse>(
        "/auth/login",
        credentials
      );
      
      console.log('🔐 Login API response:', response);

      if (response.success && response.data) {
        console.log('✅ Login successful, storing auth data');
        // Store token and user data
        apiClient.setToken(response.data.token);
        this.setUser(response.data.user);
        return response.data;
      }

      console.error('❌ Login API returned unsuccessful response:', response);
      throw new Error(response.message || "Login failed");
    } catch (error: any) {
      console.error('🚨 Login error caught:', error);
      console.error('🚨 Error details:', { message: error.message, status: error.status, response: error.response });
      
      // Fallback to mock authentication if API is not available
      if (
        error.status === 500 ||
        error.message?.includes("Network Error") ||
        error.message?.includes("ECONNREFUSED")
      ) {
        console.log('🔄 Falling back to mock login due to API error');
        return this.mockLogin(credentials);
      }
      throw error;
    }
  }

  /**
   * Register new user
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/register",
        userData
      );

      if (response.success && response.data) {
        // Store token and user data
        apiClient.setToken(response.data.token);
        this.setUser(response.data.user);
        return response.data;
      }

      throw new Error(response.message || "Registration failed");
    } catch (error: any) {
      // Fallback to mock authentication if API is not available
      if (
        error.status === 500 ||
        error.message?.includes("Network Error") ||
        error.message?.includes("ECONNREFUSED")
      ) {
        return this.mockRegister(userData);
      }
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      // Even if logout fails on server, clear local data
      console.warn("Logout request failed:", error);
    } finally {
      this.clearAuthData();
    }
  }

  /**
   * Get current user from server
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>("/auth/me");

    if (response.success && response.data) {
      // Validate that we have essential user data
      if (!response.data.name || !response.data.name.trim()) {
        console.warn("Server returned user without name:", response.data);
        // Try to get name from stored data if available
        const storedUser = this.getStoredUser();
        if (storedUser && storedUser.name && storedUser.name.trim()) {
          response.data.name = storedUser.name;
          console.log("Used stored name for user:", response.data.name);
        }
      }
      
      this.setUser(response.data);
      return response.data;
    }

    throw new Error(response.message || "Failed to get user data");
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("auth_token");
  }

  /**
   * Get stored user data
   */
  getStoredUser(): User | null {
    if (typeof window === "undefined") return null;
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Store user data locally
   */
  private setUser(user: User): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("user", JSON.stringify(user));
  }

  /**
   * Clear authentication data
   */
  private clearAuthData(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/refresh");

    if (response.success && response.data) {
      apiClient.setToken(response.data.token);
      this.setUser(response.data.user);
      return response.data;
    }

    throw new Error(response.message || "Token refresh failed");
  }

  /**
   * Mock login for development when API is not available
   */
  private async mockLogin(credentials: LoginRequest): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock user data based on email
    let mockUser: User;
    let redirectUrl: string;
    const isAdmin =
      credentials.email.includes("admin") ||
      credentials.email === "admin@suud.com";
    const isEmployer =
      credentials.email.includes("employer") ||
      credentials.email.includes("company");

    if (isAdmin) {
      mockUser = {
        id: 0,
        name: "System Administrator",
        email: credentials.email,
        role: "admin",
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        phone: "+966500000000",
        location: "الرياض، السعودية",
      };
      redirectUrl = "/admin/dashboard";
    } else if (isEmployer) {
      mockUser = {
        id: 1,
        name: "أحمد الرشيد", // Ahmed Al-Rashid in Arabic
        email: credentials.email,
        role: "employer",
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        phone: "+966501234567",
        location: "الرياض، السعودية",
      };
      redirectUrl = "/employer/dashboard";
    } else {
      mockUser = {
        id: 2,
        name: "فاطمة العلي", // Fatima Al-Ali in Arabic
        email: credentials.email,
        role: "employee",
        specialization: "مطور برمجيات",
        university: "جامعة الملك سعود",
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        phone: "+966507654321",
        location: "جدة، السعودية",
      };
      redirectUrl = "/employee/dashboard";
    }

    const mockToken = "mock_token_" + Date.now();
    const authResponse: AuthResponse = {
      user: mockUser,
      token: mockToken,
      token_type: "Bearer",
      expires_in: 3600,
      redirect_url: redirectUrl,
    };

    // Store token and user data
    apiClient.setToken(mockToken);
    this.setUser(mockUser);

    return authResponse;
  }

  /**
   * Mock register for development when API is not available
   */
  private async mockRegister(userData: RegisterRequest): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      specialization: userData.specialization,
      university: userData.university,
      phone: userData.phone,
      location: userData.location,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Determine redirect URL based on role
    const redirectUrl = {
      admin: "/admin/dashboard",
      employer: "/employer/dashboard",
      employee: "/employee/dashboard"
    }[userData.role] || "/dashboard";

    const mockToken = "mock_token_" + Date.now();
    const authResponse: AuthResponse = {
      user: mockUser,
      token: mockToken,
      token_type: "Bearer",
      expires_in: 3600,
      redirect_url: redirectUrl,
    };

    // Store token and user data
    apiClient.setToken(mockToken);
    this.setUser(mockUser);

    return authResponse;
  }
}

export const authService = new AuthService();
