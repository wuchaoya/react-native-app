import HttpUitl from "./HttpUitl";
import responseData from "../model/ResponseData";

const HttpRequest = {
    /**
     * 获取Home数据
     */
    getHomeData: (parameter, callbackSuccess, callbackError)=> {
        HttpUitl.post('/v2/homepage', parameter,
            (data)=> {
                // 解析处理成页面需要的数据格式,如list
                responseData.code = 200;
                responseData.data = data.dissertation;
                callbackSuccess(responseData);
            },
            (error)=> {
                responseData.code = -1;
                responseData.data = error;
                callbackError(responseData);
            })
    }
}
module.exports = HttpRequest