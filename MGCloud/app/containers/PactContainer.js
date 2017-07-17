
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
let url = 'http://www.58.com'

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        let  {params} = this.props.navigation.state
        return(
                <View style={styles.container}>
                    <TransparentStatusBar/>
                    <HeadNav header={params.title} onPress={() => {BackHandler.exitApp()}}/>
                    <View style={styles.container}>
                        <WebView
                            style={{width:width,height:height-20,backgroundColor:'gray'}}
                            source={{uri:params.url,method: 'GET'}}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            scalesPageToFit={false}
                            startInLoadingState={true}
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