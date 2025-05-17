import axios from "axios";
import { handleAPIError } from "./interceptor";

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/v1`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Response 인터셉터 설정
api.interceptors.response.use(res => res, handleAPIError);

export function get<T>(...args: Parameters<typeof api.get>) {
  return api.get<T>(...args).then(res => res.data);
}

export function post<T>(...args: Parameters<typeof api.post>) {
  return api.post<T>(...args).then(res => res.data);
}

export function put<T>(...args: Parameters<typeof api.put>) {
  return api.put<T>(...args).then(res => res.data);
}

export function patch<T>(...args: Parameters<typeof api.patch>) {
  return api.patch<T>(...args).then(res => res.data);
}

export function del<T>(...args: Parameters<typeof api.delete>) {
  return api.delete<T>(...args).then(res => res.data);
}
