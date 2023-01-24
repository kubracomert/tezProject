import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from 'react-native-linear-gradient';
import { strings } from '../../Dil/strings';
import Button from '../../commons/Button';
import { StackNavigator } from 'react-navigation';
import { Actions } from 'react-native-router-flux'
import getIp from '../../commons/getIp';


const { width, height } = Dimensions.get('window');

class FirmaStajYapanlarDetay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      durum: 'boş',
    }
  }
  OnaylamaReddetme = () => {

    const { navigation } = this.props;
    console.log(this.setState.durum);
    const { navigate } = this.props.navigation;
    let degisken3 = navigation.getParam('degisken3');
    let degisken4 = navigation.getParam('degisken4');

    //console.log(this.setState.degiskendurum);


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


  async UpdatebasvuruOnayi() {
    try {

      const { navigation } = this.props;

      const { navigate } = this.props.navigation;
      let degisken3 = navigation.getParam('degisken3');
      let degisken4 = navigation.getParam('degisken4');
      durum = this.setState.degiskendurum;
      //console.log(this.setState.degiskendurum);
      console.log(durum);

      const response = await fetch(ip() + '/react-native-insert/firmaBasvuruButonları.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comEmail: degisken3,
          ogrenciId: degisken4,
          durum: this.setState.degiskendurum

        })
      })

      const responseJson = await response.json();
      Alert.alert(responseJson);


    }
    catch (error) {
      Alert.alert("Firma yok");
      { this.props.navigation.goBack() };
    }     // {this.props.navigation.goBack()};
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
    let comId = navigation.getParam('comId');
    let ogrenciId = navigation.getParam('ogrenciId');
    return (
      <LinearGradient
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'blue'
          , marginBottom: 10
        }}
        colors={['purple', 'blue']}
        colors={['#2B448C', '#B0BAD9', '#F2F2F2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={{ width: width * 0.7, height: height * 0.2, alignItems: 'center', justifyContent: 'center' }}>


          {this.renderSection(this.props.navigation.getParam('degisken'))}
          {this.renderSection(this.props.navigation.getParam('degisken1'))}
          {this.renderSection(this.props.navigation.getParam('degisken2'))}

          <Button text={strings.degerlendirmeF} onPress={() => Actions.DegerlendirmeFormu({ degiskencomId: comId, degiskenOgrenciId: ogrenciId })}></Button>

          <Button text={strings.devletTKF} onPress={() => Actions.frmaDTKF({ degiskencomId: comId, degiskenOgrenciId: ogrenciId })}></Button>


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
export default FirmaStajYapanlarDetay;