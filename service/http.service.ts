import axios from "axios";
import { toast } from "sonner";
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

apiClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    console.log(error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const status = error.response ? error.response.status : null;
    if (status && status !== 200) {
      toast.error(
        `Request failed with status code ${status} : ${error.response.data.message}`
      );
    } else {
      toast.error("An unexpected error occurred");
    }
    return Promise.reject(error);
  }
);

const getRequest = async (path:any) => {
  const USER_TOKEN = localStorage.getItem("accessToken");
  const AXIOS_CONFIG = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${USER_TOKEN}`,
    },
  };
  return await apiClient.get(path, AXIOS_CONFIG);
};

const postRequest = async (path:any, payload:any) => {
  const USER_TOKEN = localStorage.getItem("accessToken");
  const AXIOS_CONFIG = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${USER_TOKEN}`,
    },
  };
  return await apiClient.post(path, payload, AXIOS_CONFIG);
};

const postRequestWithOutToken = async (path:any, payload:any) => {
  const AXIOS_CONFIG = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  return await apiClient.post(path, payload, AXIOS_CONFIG);
};

const putRequest = async (path:any, payload:any) => {
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
