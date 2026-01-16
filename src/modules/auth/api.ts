import http from '@/lib/http';
import { API_ENDPOINTS } from './constants';
import {
    LoginRequest,
    RegisterRequest,
    BaseResponse,
    AuthResponseData,
    User,
    RefreshResponseData
} from './types';

/**
 * UC-01, UC-02, UC-03: Auth API
 * API wrappers for authentication based on BA documentation
 */

export const authApi = {
    /**
     * UC-01: User Registration
     * Business Rules:
     * - Register new user with email, name, password
     * - Returns JWT token and user profile
     */
    register: async (data: RegisterRequest): Promise<BaseResponse<AuthResponseData>> => {
        const response = await http.post<BaseResponse<AuthResponseData>>(API_ENDPOINTS.REGISTER, data);
        return response.data;
    },

    /**
     * UC-02: Login
     * Business Rules:
     * - Accept email + password
     * - Store user in global store on success
     */
    login: async (data: LoginRequest): Promise<BaseResponse<AuthResponseData>> => {
        const response = await http.post<BaseResponse<AuthResponseData>>(API_ENDPOINTS.LOGIN, data);
        return response.data;
    },

    /**
     * UC-02: Logout
     * Business Rules:
     * - Call logout API
     * - Clear local auth state
     */
    logout: async (): Promise<BaseResponse<null>> => {
        const response = await http.post<BaseResponse<null>>(API_ENDPOINTS.LOGOUT);
        return response.data;
    },

    /**
     * UC-03: User Profile Management
     * Business Rules:
     * - Fetch /me endpoint
     * - Handle token invalid case
     */
    getMe: async (): Promise<BaseResponse<User>> => {
        const response = await http.get<BaseResponse<User>>(API_ENDPOINTS.ME);
        return response.data;
    },

    /**
     * UC-02: Token Refreshment
     * Business Rules:
     * - Cấp lại JWT token mới cho người dùng
     */
    refresh: async (): Promise<BaseResponse<RefreshResponseData>> => {
        const response = await http.post<BaseResponse<RefreshResponseData>>(API_ENDPOINTS.REFRESH);
        return response.data;
    }
};
