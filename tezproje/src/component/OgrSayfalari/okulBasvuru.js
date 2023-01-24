import React, { Component, useState } from 'react';
import { View, Text, ImageBackground, Dimensions, Image, TextInput, Keyboard, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { strings } from '../../Dil/strings';
import Button from '../../commons/Button';
import { Actions } from 'react-native-router-flux';
import getIp from '../../commons/getIp';
import { Alert } from 'react-native';
const { width, height } = Dimensions.get('window');

class okulBasvuru extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  basvuruOnayi = () => {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    //firma bilgilerini getiren değer   
    let firmaId = navigation.getParam('firmaId');
    //giriş yapan öğrencinin e-posta adresini getiren değer degisken1'de tutuluyor
    let degisken1 = navigation.getParam('degisken1');
    //Tarih sayfasından seçilen başlangıç ve bitiş tarihlerini getiren değerler tutuluyor
    let baslangicT = navigation.getParam('baslangicT');
    let bitisT = navigation.getParam('bitisT');
    console.log(this.props.navigation.getParam('baslangicT'), "deger burada görünüyor");
    console.log(this.props.navigation.getParam('bitisT'), "deger burada görünüyor");
    console.log(this.props.navigation.getParam('degisken1'));
    if (baslangicT == undefined || bitisT == undefined || firmaId == undefined) {
      Alert.alert("Lütfen gerekli bilgileri doldururun!?")
    }
    else {
      fetch(getIp() + '/react-native-insert/okulBasvuruGuncelle.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firmaId: this.props.navigation.getParam('firmaId'),
          bitisT: this.props.navigation.getParam('bitisT'),
          baslangicT: this.props.navigation.getParam('baslangicT'),
          email: this.props.navigation.getParam('degisken1'),
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {

          Alert.alert(responseJson);

        })
        .catch((error) => {
          console.log('yok');
        });
    }
  }

  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    //giriş yapan öğrencinin e posta adresini getiren değer
    let degisken1 = navigation.getParam('degisken1');
    console.log(this.props.navigation.getParam('degisken1'));
    //seçilen başlangıç ve bitiş tarihlerini tarih sayfasından gelen değer
    let baslangicT = navigation.getParam('baslangicT');
    let firmaAd = navigation.getParam('firmaAd');
    console.log(this.props.navigation.getParam('baslangicT'))
    let bitisT = navigation.getParam('bitisT');
    console.log(this.props.navigation.getParam('bitisT'))
    return (
      <LinearGradient
        colors={['#bedbbb', '#789e7f']}
        style={styles.container}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 0.50, height: height * 0.05 }}>
          <Text>Tarihleri Seçiniz: </Text>
          <TouchableOpacity onPress={() => Actions.Tarih({ sayfa: 'okulBasvuru' })}  >
            <Image source={require('../../img/2.png')} />
          </TouchableOpacity>

        </View>
        {/* başlangıç tarihi için */}
        {   baslangicT ?
          <View style={styles.input1}>
            <TextInput style={{ flex: 1 }}
              placeholder={baslangicT} placeholderTextColor={'black'} textAlign='center' keyboardType='numeric' />

          </View>
          :
          <View style={styles.input1}>
            <TextInput style={{ flex: 1 }}
              placeholder={"Başlangıç:" + " YYYY-MM-DD"} fontSize={14} textAlign='center' keyboardType='numeric' />
          </View>
        }
        {/* bitiş tarihi için */}
        {   bitisT ?
          <View style={styles.input1}>
            <TextInput style={{ flex: 1 }}
              placeholder={bitisT} placeholderTextColor={'black'} textAlign='center' keyboardType='numeric' />

          </View>
          :
          <View style={styles.input1}>
            <TextInput style={{ flex: 1 }}
              placeholder={"Bitiş:" + " YYYY-MM-DD"} fontSize={14} textAlign='center' keyboardType='numeric' />

          </View>
        }
        <Button text="Firmalardan seç" onPress={() => Actions.frmaOnayListe({ degisken2: 'okulBasvuru' })}></Button>
        <Text>{firmaAd}</Text>
        {/* düzeltilecek burası */}
        <Button text="Firma bilgilerini doldur" onPress={() => Actions.frmaBilgiDoldurma({ degisken2: degisken1 })}></Button>
        <Button text="Staja başvur" onPress={() => { this.basvuruOnayi() }}></Button>
      </LinearGradient>

    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input1: {
    flex: 0.13,
    borderWidth: 0.6,
    borderRadius: 32,
    width: width * 0.74,
    height: height * 0.02,
    backgroundColor: 'white',
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 20
  },
  input: {
    borderWidth: 0.6,
    borderRadius: 32,
    width: width * 0.74,
    height: height * 0.08,
    backgroundColor: 'white',
    marginTop: 20,
    textAlign: 'center'
  }
};
export default okulBasvuru;