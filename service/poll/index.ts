import { getRequest, postRequest } from "../http.service";
interface pollPayload {
    Question:String,
    Options: Array<String>
}
const pollCreation = async (payload:pollPayload) => {
    return await postRequest("/polls",payload);
}

const allPollOfUser = async () => {
    return await getRequest("polls/poll/user");
}


export { pollCreation,allPollOfUser }