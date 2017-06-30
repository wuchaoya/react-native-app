import WebHost from "./WebHost";

const HttpUitl = {
    /**
     * 封装 fetch post 请求
     * @param path  string
     * @param parameter obj
     * @param callback function
     */
    post: (path, parameter, callbackSuccess, callbackError)=> {
        fetch(WebHost.url + path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameter)
        }).then((response) => {
            console.log(parameter)
            return response.json()
        }).then((responseJson) => {
            console.log(parameter)
            console.log(responseJson)
            // 返回请求正常的业务数据集合
            callbackSuccess(responseJson)
        }).catch((error) => {
            callbackError(error);
        }).done();

    },
    get:(path,parameter,callbackSuccess, callbackError)=>{
        fetch(WebHost.url + path+parameter).then((response) => {
            return response.json()
        }).then((responseJson) => {
            console.log(responseJson)
            // 返回请求正常的业务数据集合
            callbackSuccess(responseJson)
        }).catch((error) => {
            callbackError(error);
        }).done();
    }
}

module.exports = HttpUitl