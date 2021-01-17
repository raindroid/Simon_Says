import { accountInfo } from "../account/firebase";
import { host } from "../account/secret";

export const GeneralAPILink = "http://simon-says.space/general/";
const defaulthost = "/general/";

export const getFormData = (data) => {
    let formData = new FormData()
    for (let key in data) {
        formData.append(key, data[key])
        console.log(key, data[key])
    }
    return formData
}

export let getUserInfo = (accountInfo, action, callback) => {
    let formData = getFormData(accountInfo)
    formData.append('action', action)
    console.log(formData)
    fetch(defaulthost, { // TODO update host 
        method: "POST",
        body: formData,
    })
    .then(function(res){ return res.json(); })
    .then(function(data){ 
        console.log(( data ) );
        if (typeof callback === "function") callback(data)
        return data;
    })
}
