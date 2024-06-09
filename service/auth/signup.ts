import { postRequestWithOutToken } from "@/service/http.service";

interface signUpPayload {
  email: string;
  password: string;
}
const signUpAuth = async (payload: signUpPayload) => {
  return await postRequestWithOutToken("/signup", payload);
};

export { signUpAuth };
