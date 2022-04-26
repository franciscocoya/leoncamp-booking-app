import axios from "axios";

import { API_USERS } from "@/helpers/apiRoutes";

const checkExistsUser = async(emailToCheck: string) => {
    return await axios.get(`${API_USERS}/load/${emailToCheck}`)
        .then((res) => res.data)
        .then((data) => {
            console.log(data);
        }).catch((err) => {
            return err;
        });
};

export{
    checkExistsUser
};