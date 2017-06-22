import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    ScrollView
} from 'react-native';
import ColorStyle from '../style/ColorStyle'
import UserHead from '../components/UserHead'
import TextConst from '../const/TextConst'
import Title from '../components/Title'
import VipBuy from '../components/VipBuy'
import GiftBag from '../components/GiftBag'

export default class user extends Component {

    render() {
        return (
            <ScrollView>
                <View style={styles.centering}>
                    <UserHead navigation={this.props.navigation}/>
                    <View style={styles.container}>
                        <Title
                            titleText={TextConst.VipBuyText.title}
                            color={ColorStyle.colorBlack}
                            fontWeight="400"
                            style={{marginBottom:15}}/>
                        <VipBuy
                            backgroundColor="#FAF0E6"
                            borderColor="#F4A460"
                            buttonColor ='darkorange'
                            recommend={true}
                            name={TextConst.VipBuyText.Exclusive.name}
                            price ={TextConst.VipBuyText.Exclusive.Price}
                            time = {TextConst.VipBuyText.Exclusive.SingleMonth}
                            buttonText = {TextConst.VipBuyText.Exclusive.open}
                        />
                        <VipBuy
                            backgroundColor="#ffffff"
                            borderColor="#cccccc"
                            buttonColor ='#83b233'
                            recommend={false}
                            name={TextConst.VipBuyText.Featured.name}
                            price ={TextConst.VipBuyText.Featured.Price}
                            time = {TextConst.VipBuyText.Featured.SingleMonth}
                            buttonText = {TextConst.VipBuyText.Featured.open}
                        />
                    </View>
                    <View style={[styles.container,{marginBottom:23}]}>
                        <Title
                            titleText={TextConst.equityText.title}
                            color={ColorStyle.colorBlack}
                            fontWeight="400"
                            style={{marginBottom:15}}/>
                        <GiftBag
                            color="#ea8e4a"
                            border={true}
                            name={TextConst.equityText.exclusive.name}
                            gameTimeText={TextConst.equityText.exclusive.gameTimeText}
                            intro={TextConst.equityText.exclusive.intro}
                        />
                        <GiftBag
                            color="#ffba00"
                            border={true}
                            name={TextConst.equityText.chosen.name}
                            gameTimeText={TextConst.equityText.chosen.gameTimeText}
                            intro={TextConst.equityText.chosen.intro}
                        />
                        <GiftBag
                            color="#999999"
                            name={TextConst.equityText.tasteOf.name}
                            gameTimeText={TextConst.equityText.tasteOf.gameTimeText}
                            intro={TextConst.equityText.tasteOf.intro}
                        />
                     </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    centering: {
        flex:1,
        backgroundColor:"darkgray",
        flexDirection:'column',
        backgroundColor:'#fff',

    },
    container:{
        marginTop:26,
        paddingLeft:12,
        paddingRight:12
    },
});

