import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../commons/Button';
import { strings } from '../../Dil/strings';
import { StackNavigator } from 'react-navigation';
import { Actions } from 'react-native-router-flux'
import getIp from '../../commons/getIp';


const { width, height } = Dimensions.get('window');

class OgrenciDetayFirma extends Component {
  constructor(props) {
    super(props);
    this.state = {
      durum: 'boş',
    }
  }
  OnaylamaReddetme = () => {

    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    let degisken3 = navigation.getParam('degisken3');
    let degisken4 = navigation.getParam('degisken4');


    fetch(getIp() + '/react-native-insert/firmaBasvuruButonları.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comEmail: degisken3,
        ogrenciId: degisken4,
        durum: this.setState.durum
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {

        //Bilgileri kaydettikten sonra bilgi mesajını gösterme
        Alert.alert(responseJson);
        { this.props.navigation.goBack(); }
      })

      .catch((error) => {
        console.error(error);
      });
  }



  renderSection(text) {
    return (
      <View style={style.section} >
        <View
          style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ textAlign: 'center' }}>{text}</Text>
        </View>

      </View>);
  }

  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    // const{navigation}=this.props;    <Text>{navigation.getParam('name')}</Text>
    let degisken = navigation.getParam('degisken');
    let degisken1 = navigation.getParam('degisken1');
    let degisken2 = navigation.getParam('degisken2');
    return (
      <LinearGradient
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'blue'
          , marginBottom: 10
        }}
        colors={['#2B448C', '#B0BAD9', '#F2F2F2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>


        {this.renderSection(this.props.navigation.getParam('degisken'))}
        {this.renderSection(this.props.navigation.getParam('degisken1'))}
        {this.renderSection(this.props.navigation.getParam('degisken2'))}
        {/*
          <Button text={strings.degerlendirmeF} onPress={()=>Actions.DegerlendirmeFormu()}></Button>  
          
           <Button text={strings.devletTKF} onPress={()=>Actions.DevletTKF()}></Button>      
          <Button text={strings.sigortaB} onPress={()=>Actions.SigortaB()}></Button>  */}
        <View style={{ width: width * 0.7, height: height * 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => { this.OnaylamaReddetme(this.setState.durum = 'onay') }} >
            <Image source={require('../../img/tik.png')} style={style.tikc} Text={strings.Onayla} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.OnaylamaReddetme(this.setState.durum = 'red') }}>
            <Image source={require('../../img/carpi.png')} style={style.tikc} Text={strings.Reddet} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const style = StyleSheet.create({

  tikc: {
    marginLeft: 20,
    marginRight: 20,
    width: width * 0.2,
    height: height * 0.13,
    alignItems: 'center',

    borderRadius: 30,
    marginTop: 20,
    flexDirection: 'row'
  },
  section: {

    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: width * 0.70,
    height: height * 0.09,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
});
export default OgrenciDetayFirma;