import axios from "axios";
import { toast } from "sonner";
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

// apiClient.interceptors.response.use(())

const getRequest = async (path) => {
  const USER_TOKEN = localStorage.getItem("accessToken");
  const AXIOS_CONFIG = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${USER_TOKEN}`,
    },
  };
  return await apiClient.get(path, AXIOS_CONFIG);
};

const postRequest = async (path, payload) => {
  const USER_TOKEN = localStorage.getItem("accessToken");
  const AXIOS_CONFIG = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${USER_TOKEN}`,
    },
  };
  return await apiClient.post(path, payload, AXIOS_CONFIG);
};

const postRequestWithOutToken = async (path, payload) => {
  const AXIOS_CONFIG = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  return await apiClient.post(path, payload, AXIOS_CONFIG);
};

const putRequest = async (path, payload) => {
  const USER_TOKEN = localStorage.getItem("accessToken");
  const AXIOS_CONFIG = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${USER_TOKEN}`,
    },
  };
  return await apiClient.put(path, payload, AXIOS_CONFIG);
};

export { getRequest, postRequest, putRequest, postRequestWithOutToken };
