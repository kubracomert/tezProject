import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../commons/Button';
import getIp from '../../commons/getIp';
import { strings } from '../../Dil/strings';
//import {TouchableOpacity} from 'react-native-ge;sture-handler';
const { width, height } = Dimensions.get('window');

class ogrStajYapan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      durum: null,
      yazılıDurum: ''
    };
  }
  Updatebasvuru = () => {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    // const{navigation}=this.props;    <Text>{navigation.getParam('name')}</Text>
    let ogrenciId = navigation.getParam('ogrenciId');
    console.log(this.setState.durum);
    //const { navigation } = this.props;
    //const {navigate}=this.props.navigation;
    //const { gelenname }  = this.props.navigation.getParam('degisken6');
    // const { name }  = this.props.navigation.getParam('degisken1')
    // Aşağıdaki noktalı yerde IP adresiniz yer almalı192.168.43.168  172.16.0.158
    fetch(getIp() + '/react-native-insert/OgrenciOnaylamaHoca.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.props.navigation.getParam('ogrenciId'),
        durum: this.setState.durum
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {

        //Bilgileri kaydettikten sonra bilgi mesajını gösterme
        Alert.alert(responseJson);
        Actions.jump('ogrStajBasvuru');
      })

      .catch((error) => {
        console.error(error);
      });
  }
  renderAlert() {
    console.log(this.setState.yazılıDurum);
    if (this.setState.yazılıDurum == 'onay') {
      Alert.alert(
        'Öğrenciyi Onayla',
        'Bu öğrenciyi onaylamak istediğinizden emin misiniz?',
        [
          {
            text: 'iptal',
            onPress: () => Alert.alert("İptal edildi!"),
            style: 'cancel'
          },
          { text: 'Onayla', onPress: () => { this.Updatebasvuru(this.setState.durum = 2) } }
        ],
        { cancelable: false }
      );
    }
    else if (this.setState.yazılıDurum == 'red') {
      Alert.alert(
        'Öğrenciyi Reddet',
        'Bu öğrenciyi reddetmek istediğinizden emin misiniz?',
        [
          {
            text: 'İptal',
            onPress: () => Alert.alert("İptal edildi!"),
            style: 'cancel'
          },
          { text: 'Reddet', onPress: () => { this.Updatebasvuru(this.setState.durum = -2) } }
        ],
        { cancelable: false }
      );
    }
    else {
      Alert.alert('hata');
    }
  }


  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    let firmaId = navigation.getParam('firmaId');
    let ogrenciId = navigation.getParam('ogrenciId');
    return (
      <LinearGradient
        colors={['#D9CAC1', '#A3B0D9']}
        // colors={['white','blue','pink', 'purple']}
        style={styles.container}
        start={{ x: 0, y: 1, z: 0 }}
        end={{ x: 1, y: 0, z: 0 }}>

        <Button text="Staj Bilgileri" borderWidth={0.7} borderColor='black' color='black' onPress={() => Actions.ogrStajBilgileri({ ogrenciId: ogrenciId })}></Button>
        <Button text={strings.stajDeft} borderWidth={0.7} borderColor='black' color='black' onPress={() => Actions.grvStajDefteri({ ogrId: ogrenciId })}></Button>
        <Button text="Devlet Talep Katkı Formu" borderWidth={0.7} borderColor='black' color='black' onPress={() => Actions.hocaDTKF({ ogrId: ogrenciId })}></Button>
        <Button text={strings.degerlendirmeF} borderWidth={0.7} borderColor='black' color='black' onPress={() => Actions.gDegerlendirmeFormu({ ogrId: ogrenciId })}></Button>

        <View style={{ width: width * 0.7, height: height * 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this.renderAlert(this.setState.yazılıDurum = 'onay')}>
            <Image source={require('../../img/tik.png')} style={styles.tikc} Text={strings.Onayla} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.renderAlert(this.setState.yazılıDurum = 'red')}>
            <Image source={require('../../img/carpi.png')} style={styles.tikc} Text={strings.Reddet} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue'
    , marginBottom: 10
  },
  tikc: {
    marginLeft: 20,
    marginRight: 20,
    width: width * 0.2,
    height: height * 0.13,
    alignItems: 'center',

    borderRadius: 40,
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
}
);
export default ogrStajYapan;