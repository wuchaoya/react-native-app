import HttpUitl from "./HttpUitl";
import ResponseData from "../model/ResponseData";

const HttpRequest = {
    /**
     * 获取Home数据
     */
    getHomeData: (parameter, callbackSuccess, callbackError)=> {
        HttpUitl.post('/v2/homepage', parameter,
            (resultSuccess)=> {
                ResponseData.code = 1;
                ResponseData.data = resultSuccess;
                callbackSuccess(ResponseData);
            },
            (resultError)=> {
                ResponseData.code = -1;
                ResponseData.data = resultError;
                callbackError(ResponseData);
            })
    }
}
module.exports = HttpRequest