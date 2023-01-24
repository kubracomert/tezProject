import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Alert, AppRegistry } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { strings } from '../../Dil/strings';
import Button from '../../commons/Button';
import { Actions } from 'react-native-router-flux';
import getIp from '../../commons/getIp';
import Loader from '../../commons/Loader';
const { width, height } = Dimensions.get('window');

class FirmaKayit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      TextInputName: '',
      TextInputEmail: '',
      TextInputPhoneNumber: '',
      TextInputAdres: '',
      TextInputfaaliyetAlani: '',
      TextInputAciklama: '',
      tur: 3,
      loading: false,
    }
  };
  submitAndClear = () => {
    setTimeout(() => {
      this.setState({
        TextInputName: '',
        TextInputEmail: '',
        TextInputPhoneNumber: '',
        TextInputAdres: '',
        TextInputfaaliyetAlani: '',
        TextInputAciklama: '',
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

  InsertDataToServer = () => {
    const { TextInputName } = this.state;
    const { TextInputEmail } = this.state;
    const { TextInputPhoneNumber } = this.state;
    const { TextInputfaaliyetAlani } = this.state;
    const { TextInputAdres } = this.state;
    const { TextInputAciklama } = this.state;
    if (TextInputName == "" || TextInputEmail == "" ||
      TextInputPhoneNumber == "" ||
      TextInputfaaliyetAlani == "" ||
      TextInputAdres == "" ||
      TextInputAciklama == "" ) {
      Alert.alert("Lütfen gerekli alanları doldurunuz!");
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 125);
    }
    else {
      // Aşağıdaki noktalı yerde IP adresiniz yer almalı
      fetch(getIp() + '/react-native-insert/submit_user_info.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: TextInputName,
          email: TextInputEmail,
          phone_number: TextInputPhoneNumber,
          tur: 3,
          faaliyetAlani: TextInputfaaliyetAlani,
          adres: TextInputAdres,
          aciklama: TextInputAciklama
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Bilgileri kaydettikten sonra bilgi mesajını gösterme

          Alert.alert(responseJson);
        })
        .catch((error) => {
          console.error(error);
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
          backgroundColor: 'blue',
          marginBottom: 10
        }}
        colors={['#cdd0cb', '#e8eae6', '#cfdac8', '#7c9473']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>

        <View style={style.section}>
          <TextInput placeholderTextColor={'white'} placeholder={strings.KurumAdi} value={this.state.TextInputName} onChangeText={TextInputName => this.setState({ TextInputName })}></TextInput>
        </View>

        <View style={style.section}>
          <TextInput placeholderTextColor={'white'} placeholder={strings.eposta} value={this.state.TextInputEmail} onChangeText={TextInputEmail => this.setState({ TextInputEmail })}></TextInput>
        </View>


        <View style={style.section}>
          <TextInput placeholderTextColor={'white'} placeholder={strings.Telefon} value={this.state.TextInputPhoneNumber} keyboardType='name-phone-pad' onChangeText={TextInputPhoneNumber => this.setState({ TextInputPhoneNumber })}></TextInput>
        </View>

        <View style={style.section}>
          <TextInput placeholderTextColor={'white'} placeholder={strings.FaaliyetAlani} value={this.state.TextInputfaaliyetAlani} onChangeText={TextInputfaaliyetAlani => this.setState({ TextInputfaaliyetAlani })}></TextInput>
        </View>

        <View style={style.section}>
          <TextInput placeholderTextColor={'white'} placeholder={strings.adres} value={this.state.TextInputAdres} onChangeText={TextInputAdres => this.setState({ TextInputAdres })}></TextInput>
        </View>

        <View style={style.section}>
          <TextInput placeholderTextColor={'white'} placeholder={"Açıklama"} value={this.state.TextInputAciklama} onChangeText={TextInputAciklama => this.setState({ TextInputAciklama })}></TextInput>
        </View>


        <Loader
          loading={this.state.loading} />
        <Button
          onPress={() => this.getCoordinates(this.InsertDataToServer(), this.submitAndClear())}
          text={strings.kayıt}
          color='#4A5845'
          borderColor='#4A5845' />

      </LinearGradient>
    );
  }
}
const style = StyleSheet.create({
  section: {
    marginTop: 15,
    backgroundColor: '#7c9473',
    opacity: 0.4,
    borderTopColor: '#4A5845',
    borderRadius: 5,
    width: width * 0.70,
    height: height * 0.06,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },

  input: {
    textAlign: 'left',
    marginTop: 5,
  },
  container: {
    backgroundColor: '#CCCCCC',
    height: height,
    padding: 15,
    display: 'flex',
    alignItems: 'flex-start',
    width: width,
    paddingTop: 50
  }
}
);

export default FirmaKayit;
