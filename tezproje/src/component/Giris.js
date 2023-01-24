import React, { Component, useState } from 'react';
import { View, Text, ImageBackground, Dimensions, Image, TextInput, Keyboard, TouchableWithoutFeedback, AppRegistry, FlatList, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { strings } from '../Dil/strings';
import Button from '../commons/Button';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import Loader from '../commons/Loader';
const { width, height } = Dimensions.get('window');
import getIp from '../commons/getIp';


class Giris extends Component {

  constructor(props) {
    super(props);
    this.state = {
      TextInputEmail: '',
      TextInputPass: '',
    }
  };

  submitAndClear = () => {
    this.setState({
      TextInputEmail: '',
      TextInputPass: '',
    })
  }

  UserLoginFunction = () => {
    const { TextInputEmail } = this.state;
    const { TextInputPass } = this.state;
    if (TextInputEmail == "" || TextInputPass == "")
      Alert.alert("Lütfen gerekli alanları doldurunuz!");
    else {
      // Aşağıdaki noktalı yerde IP adresiniz yer almalı192.168.43.168
      fetch(getIp() + '/react-native-insert/deneme1.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          email: TextInputEmail,
          pass: TextInputPass,
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson === 'Ogrenci') { Actions.Menu({ degisken: TextInputEmail }); }
          else if (responseJson === 'Görevli') { Actions.Grvli({ degisken: TextInputEmail }); }
          else if (responseJson === 'Firma') { Actions.FirmaGiris({ degisken: TextInputEmail }); }
          else { Alert.alert(responseJson); }
        })
        .catch((error) => {
          Alert.alert("Kullanıcı Adı veya Parola Yanlış!")
        });
    }
  } 
  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    let degisken = navigation.getParam('degisken');
    return (
      <LinearGradient
        colors={['#D8CAC1','#e2d7d1', 'white']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.modalBackground}>
        <ImageBackground source={require('../img/arkaPlan.jpeg')} style={styles.backgroundImage}>
   
          <TextInput
            style={styles.input}
            placeholder={strings.kAdi}
            value={this.state.TextInputEmail}
            onChangeText={TextInputEmail => this.setState({ TextInputEmail })} />

          <TextInput
            style={styles.input}
            placeholder={strings.parola}
            secureTextEntry={true}
            value={this.state.TextInputPass}
            onChangeText={TextInputPass => this.setState({ TextInputPass })} />

          <Button borderWidth={0.7}  borderColor='black' text={'Giriş'} onPress={() => (this.UserLoginFunction(), this.submitAndClear())} > </Button>

          <TouchableOpacity onPress={() => Actions.parolaUnutma()}>
            <Text style={{ textDecorationLine: 'underline', color: 'black' }}>{strings.unutkan}</Text>
          </TouchableOpacity>
        </ImageBackground>
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
  input: {
    borderWidth:0.7,
    backgroundColor: 'white',
    borderRadius: 32,
    width: width * 0.74,
    height: height * 0.08,
    marginTop: 20,
    textAlign: 'center'
  },
  backgroundImage: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center', 
    height: height * 0.45,
    width: width,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
};
export default Giris;

