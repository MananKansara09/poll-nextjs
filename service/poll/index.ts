import { getRequest, postRequest } from "../http.service";
interface pollPayload {
  Question: String;
  Options: Array<String>;
}
const pollCreation = async (payload: any) => {
  return await postRequest("/polls", payload);
};

const allPollOfUser = async () => {
  return await getRequest("polls/poll/user");
};

const pollById = async (id: String) => {
  return await getRequest(`/polls/${id}`);
};

const pollresponse = async (id: string, payload: any) => {
  return await postRequest(`/polls/${id}/response`, payload);
};

const addComment = async (id: string, payload: any) => {
  return await postRequest(`/polls/${id}/comment`, payload);
};

export { pollCreation, allPollOfUser, pollById, pollresponse, addComment };
