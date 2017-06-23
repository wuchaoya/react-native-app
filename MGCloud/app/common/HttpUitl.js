import WebHost from "./WebHost";
import JsonUtil from "../util/JsonUtil";

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

            console.log(response);

            // console.log('====[responseSuccess]====:');
            // console.log();
            return response.json()
        }).then((responseJson) => {
            // console.log('====[responseSuccess]====:');
            // console.log(responseJson);
            //
            // console.log(responseJson.data);
            //
            //
            // console.log(responseJson.data.banner);
            //
            //
            // console.log(responseJson);


            // console.log('====[responseSuccessObj]====:');
            // console.log(response);
            // // console.log('====[responseSuccess]====:' +typeof (responseJson) );
            // // console.log('====[responseSuccess]====:' + response.type);
            // // console.log('====[responseSuccess]====:' + response._bodyInit.data);
            // var body = response._bodyInit;
            // // console.log('====[responseSuccess]====:' + typeof (body));
            // var code = body.message;
            // console.log('====[responseSuccessBodyType]====:' +typeof (body) );
            //
            // // TODO by L.jinzhu for 待优化
            // // if (200 == code) {
            // console.log('====[responseSuccessBody]====:');
            // console.log(body);
            // console.log('====[responseSuccessCode]====:');
            // console.log(code);

            // } else {
            // }

            //
            // componentWillMount() {
            //     console.log("constantData  taype is ="+typeof(constantData));
            //     console.log("employees  taype is ="+typeof(constantData.employees));
            //     console.log("employees  length = "+constantData.employees.length);
            //     console.log("No.1 givenName ="+constantData.employees[0].giveName);
            //     console.log("No.1 FamilyName ="+constantData.employees[0].giveName);
            //     console.log("No.1 Salary"+constantData.employees[0].salary);
            //     console.log("type of No.1 Salary"+typeof(constantData.employees[0].salary));
            // }


            callbackSuccess(response)
        }).catch((error) => {
            // console.error('====[responseError]====:' + JSON.stringify(error));
            callbackError(error);
            // TODO by L.jinzhu for 待优化
        }).done();
    }
}

module.exports = HttpUitl