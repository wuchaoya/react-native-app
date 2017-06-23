import WebHost from './WebHost'

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
            console.log('====[responseSuccess]====:' + response)
            response.json()
        }).then((responseJson) => {
            callbackSuccess(responseJson)
        }).catch((error) => {
            console.error('====[responseError]====:' + error)
            callbackError(error)
        });
    }
}

module.exports = HttpUitl