import HttpUitl from "./HttpUitl";
import responseData from "../model/ResponseData";
import Fitter from '../common/Filter'
const HttpRequest = {
    /**
     * 获取Home数据
     * 请求参数无
     */
    getHomeData: (parameter, callbackSuccess, callbackError)=> {
        HttpUitl.post('/v2/homepage', parameter,
            (response)=> {
                // 解析处理成页面需要的数据格式,如list
                if(response.state==200&&response.data){
                    callbackSuccess(response.data);
                }
            },
            (error)=> {
                console.log('连不上网鸟')
                callbackError(error);
            })
    },
    /**
     * 获取排行榜数据
     *请求参数 {page”// 页码 从0开始,“type”：1，//1、热玩榜、2新品榜、3预约榜}
     */
    getRankListData: (parameter, callbackSuccess, callbackError)=> {
        HttpUitl.post('/v2/rank/rank_list', parameter,
            (response)=> {
                // 解析处理成页面需要的数据格式,如list
                if(response.state==200&&response.data){
                    callbackSuccess(Fitter.dirtyData(response.data));
                }
            },
            (error)=> {
                callbackError(error);
            })
    },
    /**
     * 获取游戏列表
     * 请求参数 {“page”//页码 从0开始}
     */
    getGameListData: (parameter, callbackSuccess, callbackError)=> {
        HttpUitl.post('/v2/game/game_list', parameter,
            (response)=> {
                // 解析处理成页面需要的数据格式,如list
                if(response.state==200&&response.data){
                    callbackSuccess(response.data);
                }
            },
            (error)=> {
                callbackError(error);
            })
    },
    /**
     * 获取游戏详情数据
     * {gid , user_id}
     */
    getGameDetailData: (parameter, callbackSuccess, callbackError)=> {
        HttpUitl.post('/v2/game/game_detail', parameter,
            (response)=> {
                // 解析处理成页面需要的数据格式,如list
                if(response.state==200&&response.data){
                    callbackSuccess(response.data);
                }
            },
            (error)=> {
                callbackError(error);
            })
    },
    /**
     * 获取专题详情
     * 请求参数 {did//专题id}
     */
    getGameDissertationData: (parameter, callbackSuccess, callbackError)=> {
        HttpUitl.post('/v2/dissertation/', parameter,
            (response)=> {
                // 解析处理成页面需要的数据格式,如list
                if(response.state==200&&response.data){
                    callbackSuccess(response.data);
                }
            },
            (error)=> {
                callbackError(error);
            })
    },
    //获取验证码
    getVerityCode: (parameter, callbackSuccess, callbackError)=> {
        HttpUitl.post('/v2/login/verity_code', parameter,
            (response)=> {
                // 解析处理成页面需要的数据格式,如list
                if(response.state==200&&response.data){
                    callbackSuccess(response.data);
                }
            },
            (error)=> {
                callbackError(error);
            })
    },
    loginRegister: (parameter, callbackSuccess, callbackError)=> {
        HttpUitl.post('/v2/login/register', parameter,
            (response)=> {
                // 解析处理成页面需要的数据格式,如list
                if(response.state==200&&response.data){
                    callbackSuccess(response.data);
                }
            },
            (error)=> {
                callbackError(error);
            })
    },
    reserve: (parameter, callbackSuccess, callbackError)=> {
        HttpUitl.post('/v2/game/reserve', parameter,
            (response)=> {
                // 解析处理成页面需要的数据格式,如list
                if(response.state==200&&response.data){
                    callbackSuccess(response.data);
                }
            },
            (error)=> {
                callbackError(error);
            })
    },
}
module.exports = HttpRequest