import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const baseHttpClient = () => {
  async function get<R>(url: string, headers: AxiosRequestHeaders, params?: Record<string, any>): Promise<R> {
    try {
      const response: AxiosResponse<R> = await axiosInstance.get(url, {
        headers,
        params,
      });
      return response.data;
    } catch (error: any) {
      console.error("Fetch error:", error);
      if (error.response) {
        console.log("Response status:", error.response.status);
        console.log("Response body:", error.response.data);
      }
      throw error;
    }
  }

  async function post<R, D>(url: string, headers: AxiosRequestHeaders, data: D): Promise<R> {
    try {
      const response: AxiosResponse<R> = await axiosInstance.post(url, data, { headers });

      return response.data;
    } catch (error: any) {
      console.error("Fetch error:", error);
      if (error.response) {
        console.log("Response status:", error.response.status);
        console.log("Response body:", error.response.data);
      }
      throw error;
    }
  }

  async function put<R, D>(url: string, headers: AxiosRequestHeaders, data: D): Promise<R> {
    try {
      const response: AxiosResponse<R> = await axiosInstance.put(url, data, { headers });
      return response.data;
    } catch (error: any) {
      console.error("Fetch error:", error);
      if (error.response) {
        console.log("Response status:", error.response.status);
        console.log("Response body:", error.response.data);
      }
      throw error;
    }
  }

  async function patch<R, D>(url: string, headers: AxiosRequestHeaders, data: D): Promise<R> {
    try {
      const response: AxiosResponse<R> = await axiosInstance.patch(url, data, { headers });
      return response.data;
    } catch (error: any) {
      console.error("Fetch error:", error);
      if (error.response) {
        console.log("Response status:", error.response.status);
        console.log("Response body:", error.response.data);
      }
      throw error;
    }
  }

  async function del<R, D>(url: string, headers: AxiosRequestHeaders, data?: D): Promise<R> {
    try {
      const response: AxiosResponse<R> = await axiosInstance.delete(url, {
        headers,
        data,
      });
      return response.data;
    } catch (error: any) {
      console.error("Fetch error:", error);
      if (error.response) {
        console.log("Response status:", error.response.status);
        console.log("Response body:", error.response.data);
      }
      throw error;
    }
  }

  return {
    get,
    post,
    put,
    patch,
    delete: del,
  };
};
