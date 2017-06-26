import WebHost from "./WebHost";

const HttpUitl = {
    /**
     * 封装 fetch post 请求
     * @param path  string
     * @param parameter obj
     * @param callback function
     */
    post: (path, parameter, callbackSuccess, callbackError)=> {
        console.log('====[request]====:' + path + " | " + parameter)
        fetch(WebHost.url + path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameter)
        }).then((response) => {
            console.log('====[response]====:');
            console.log(response);
            return response.json()
        }).then((responseJson) => {
            var data = responseJson.data;
            console.log('====[responseSuccess]====:');
            console.log(data);
            // 返回请求正常的业务数据集合
            callbackSuccess(data)
        }).catch((error) => {
            console.error('====[responseError]====:' + JSON.stringify(error));
            callbackError(error);
        }).done();
    }
}

module.exports = HttpUitl