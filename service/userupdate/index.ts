import { postRequest,putRequest } from "../http.service";

interface updateUSerPayload {
    
}
const updateUser = async (payload:any) => {
    return await putRequest('/users',payload);
}

export  {
    updateUser
}