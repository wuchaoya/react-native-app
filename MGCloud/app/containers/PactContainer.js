
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Dimensions,
    BackHandler,
    WebView
} from 'react-native';
import TransparentStatusBar from '../components/TransparentStatusBar'
import HeadNav from '../components/HeadNav'

const {width, height} = Dimensions.get('window');
let url = 'http://www.migu.cn/about.html'

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        let  {params} = this.props.navigation.state
        console.log(params)
        return(
                <View style={styles.container}>
                    <TransparentStatusBar/>
                    <HeadNav header={params.title} onPress={() => {BackHandler.exitApp()}}/>
                    <View style={styles.container}>
                        <WebView
                            style={{width:width,height:height-20,backgroundColor:'#fff',}}
                            source={{uri:params.url,}}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            scalesPageToFit={false}
                            startInLoadingState={true}
                            onLoadStart={()=>{
                                console.log('网页开始加载')
                            }}
                            onError={()=>{
                                console.log('加载错误')
                            }}
                            renderError={()=>{
                                console.log('渲染错误')
                            }}
                            onLoadEnd={()=>{
                                console.log('加载结束')
                            }}
                        />
                    </View>
                </View>
            )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EBEBEB',
        flex: 1
    },

});