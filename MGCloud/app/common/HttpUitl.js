import WebHost from './WebHost'

const HttpUitl = {
    /**
     * 封装 fetch post 请求
     * @param path  string
     * @param parameter obj
     * @param callback function
     */
    post:(path,parameter,callback)=>{
        console.log()
        fetch(WebHost.url+path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameter)
        }).then((response) => response.json())
            .then((responseJson) => {
                callback(responseJson)
                console.log(responseJson)
            })
            .catch((error) => {
                console.error(error);
            });
        
    }
}

module.exports = HttpUitl