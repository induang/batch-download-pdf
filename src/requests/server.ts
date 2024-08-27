import axios from "axios";

const server = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

server.interceptors.request.use(
  async (request) => {
    if (
      !request.headers.Authorization ||
      !("Authorization" in request.headers) ||
      request.headers.Authorization === "Bearer null"
    ) {
      // TODO
      // request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

server.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error?.code === "ECONNABORTED") {
      return Promise.reject(new Error("Request Timeout."));
    }
    if (error?.code === "ERR_NETWORK") {
      return Promise.reject(new Error("Network Error."));
    }
    const status = error?.response?.status;
    if (status) {
      switch (status) {
        case 400:
          break;
        case 401: {
          if (
            !window.location.href.includes("/login") &&
            !window.location.href.includes("/login-confirm") &&
            !window.location.href.includes("/select-device")
          ) {
            // TODO
            return Promise.reject(new Error("Unauthorized."));
          }
          break;
        }
        case 403: {
          return Promise.reject(new Error("Forbidden."));
        }
        case 404: {
          return Promise.reject(new Error("Not Found."));
        }
        case 500: {
          return Promise.reject(new Error("Internal Server Error."));
        }
      }
    }
    return Promise.reject(error.response);
  }
);

export default server;
