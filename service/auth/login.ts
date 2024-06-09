import { postRequestWithOutToken } from "@/service/http.service";

interface loginPayload {
  email: string;
  password: string;
}
const loginAuth = async (payload: loginPayload) => {
  return await postRequestWithOutToken("/login", payload);
};

export { loginAuth };
