import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';
import LoadingAnimation from '../components/LoadingAnimation'
const {width, height}= Dimensions.get('window')
console.log(width,height)
console.log(Dimensions)
export default class LoadingContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading?
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <LoadingAnimation/>
                        <Text style={{fontSize:12, color:'#666',marginTop:6}}>加载中</Text>
                    </View>:
                    <View style={{ justifyContent:'center', alignItems:'center'}}>
                        <Image style={styles.img} source={require('../static/img/404.png')}/>
                        <Text style={{fontSize:14, color:'#666'}}>连接失败</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={()=>this.load()}
                        >
                            <Text style={{color:'#fff',fontSize:12}}>重试</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }

    load(){
        this.setState({
            isLoading:true
        },()=>{
            DeviceEventEmitter.emit(this.props.load, true)
        })

    }

    componentDidMount(){
        let name = this.props.load+'render'
        DeviceEventEmitter.emit(name, true)
        console.log(name+'加载好了')
        console.log(this.props.isLoading,this.props.load)

      this[this.props.isLoading] = DeviceEventEmitter.addListener(this.props.isLoading,(listenerMsg) => {
            console.log(this.props.isLoading+'收到加载失败')
            this.setState({
                isLoading:listenerMsg,
            })
        });
        console.log(DeviceEventEmitter)
    }
    componentWillUnmount(){
        this[this.props.isLoading].remove()
    }
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height-StatusBar.currentHeight-48-64,
        justifyContent:'center',
        alignItems:'center',

    },
    img:{
        width:125,
        height:125,
        position: 'absolute',
        top:-125-18,

    },
    btn:{
        width:70,
        height:30,
        borderRadius:15,
        backgroundColor:'#83b233',
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute',
        bottom:-30-18
    }
});


