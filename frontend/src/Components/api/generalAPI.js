import { host } from "../account/secret";

export const GeneralAPILink = "http://simon-says.space/general/";

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
    fetch(host, {
        method: "POST",
        body: formData,
    })
    .then(function(res){ return res.json(); })
    .then(function(data){ 
        console.log(( data ) );
        callback(data)
        return data;
    })
}
