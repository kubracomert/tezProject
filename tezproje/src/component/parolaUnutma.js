import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Button from '../commons/Button';
import { Actions } from 'react-native-router-flux';
import getIp from '../commons/getIp';
import Loader from '../commons/Loader';
const { width, height } = Dimensions.get('window');

class parolaUnutma extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      TextInputEmail: '',
    }
  };
  submitAndClear = () => {
    setTimeout(() => {
      this.setState({
        TextInputEmail: '',
      });
    }, 2500);
  }

  async getCoordinates(query) {
    this.setState({
      loading: true
    });

    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 2500);
  }

  dogrulamaKodu = () => {
    const { TextInputEmail } = this.state;
    if (TextInputEmail == "")
      Alert.alert("Lütfen bir e-posta adresi giriniz!");
    else {
      // Aşağıdaki noktalı yerde IP adresiniz yer almalı192.168.43.168
      fetch(getIp() + '/react-native-insert/dogrulamaKodu.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          email: TextInputEmail,
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == 'E-postanıza kod gönderildi.') {
            Alert.alert(

              'ŞifrenizSıfırlandı',
              'Epostanıza Kod Gönderildi',
              [
                { text: 'Tamam', onPress: () => Actions.dogrulamaKoduOnay({ degisken: TextInputEmail }) }
              ],
              { cancelable: false });
          }
          else if (responseJson == 'Hata Oluştu.Tekrar deneyiniz.') { Alert.alert(responseJson); }
        })
        .catch((error) => {
          Alert.alert('Hata Oluştu.Tekrar deneyiniz. ')
        });
    }
  }
  render() {
    return (
      <LinearGradient
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'blue'
          , marginBottom: 10
        }}
        colors={['#CACCEB', '#EAB6C1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}></Text>
        <TextInput
          style={style.input}
          placeholder={'Lütfen e-posta adresinizi giriniz.'}
          value={this.state.TextInputEmail}
          onChangeText={TextInputEmail => this.setState({ TextInputEmail })}
        />
        <Loader
          loading={this.state.loading} />
        <Button
          borderWidth={0.7} borderColor='black'
          onPress={() => this.getCoordinates(this.dogrulamaKodu())}
          text={'Kod Gönder'}
        />


      </LinearGradient>
    );
  }
}


const style = StyleSheet.create({
  section: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: width * 0.70,
    height: height * 0.09,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    textAlign: 'center',
    width: width * 0.75,
    height: height * 0.09,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,

  }
});
export default parolaUnutma;