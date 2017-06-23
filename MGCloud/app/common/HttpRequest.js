import HttpUitl from "./HttpUitl";
import responseData from "../model/ResponseData";

const HttpRequest = {
    /**
     * 获取Home数据
     */
    getHomeData: (parameter, callbackSuccess, callbackError)=> {
        HttpUitl.post('/v2/homepage', parameter,
            (resultSuccess)=> {
                responseData.code = 1000;
                responseData.data = resultSuccess;
                callbackSuccess(responseData);
            },
            (resultError)=> {
                responseData.code = -1;
                responseData.data = resultError;
                callbackError(responseData);
            })
    }
}
module.exports = HttpRequest