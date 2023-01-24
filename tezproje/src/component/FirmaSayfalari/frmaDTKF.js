import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, TextInput, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import getIp from '../../commons/getIp';
import Button from '../../commons/Button';

class frmaDTKF extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      TextInputCalısanSayisi: '',
      TextInputWebAdresi: '',
      TextInputIbanNo: '',
      TextInputYetkiliAdSoyad: '',
      TextInputIsletmeVergiNo: ''
    }
  };

  kayıt = () => {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    let degiskencomId = navigation.getParam('degiskencomId');
    let degiskenOgrenciId = navigation.getParam('degiskenOgrenciId');
    const { TextInputCalısanSayisi } = this.state;
    const { TextInputWebAdresi } = this.state;
    const { TextInputIbanNo } = this.state;
    const { TextInputYetkiliAdSoyad } = this.state;
    const { TextInputIsletmeVergiNo } = this.state;
    if (TextInputCalısanSayisi == "" && TextInputIbanNo == "" && TextInputYetkiliAdSoyad == "" && TextInputIsletmeVergiNo == "")
      Alert.alert("Lütfen alanları doldurunuz!");
    else {
      // Aşağıdaki noktalı yerde IP adresiniz yer almalı192.168.43.168
      fetch(getIp() + '/react-native-insert/FirmaDevletTKF.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comEmail: degiskencomId,
          ogrId: degiskenOgrenciId,
          CalısanSayisi: TextInputCalısanSayisi,
          WebAdresi: TextInputWebAdresi,
          IbanNo: TextInputIbanNo,
          YetkiliAdSoyad: TextInputYetkiliAdSoyad,
          IsletmeVergiNo: TextInputIsletmeVergiNo,

        })
      })
        .then((response) => response.json())
        .then((responseJson) => {

          Alert.alert(responseJson);
        })
        .catch((error) => {
          console.log('error');
        });
    }
  }

  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    let degiskencomId = navigation.getParam('degiskencomId');
    let degiskenOgrenciId = navigation.getParam('degiskenOgrenciId');
    return (
      <LinearGradient
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'blue'
        }}
        colors={['#2B448C', '#B0BAD9', '#F2F2F2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', paddingLeft: 10, paddingRight: 10, color: 'black', fontSize: 20, fontWeight: 'bold', alignItems: 'center', justifyContent: 'center' }}>STAJ YAPAN ÖĞRENCİLER İÇİN DEVLET KATKISI TALEP FORMU</Text>

          <Text style={{ textAlign: 'center', color: '#1c1c1c', fontSize: 15, alignItems: 'center', justifyContent: 'center' }}>Pamukkale Üniversitesi Mühendislik Fakültesi Dekanlığı bünyesinde yükseköğrenimlerini görmekte
          iken 3308 sayılı Mesleki Eğitim Kanunu kapsamında 2021/2022 yılı içerisinde firmamız bünyesinde
          zorunlu staja tabi tutulan ve taraflarına yapılan ödemelere ilişkin ispat edici belgeler (banka dekontu )
          ile ekte yer alan öğrencilerinize ilişkin firmamıza yapılacak Mesleki Eğitim devlet Katkısının aşağıda
            belirtilen bilgiler doğrultusunda firmamız hesaplarına aktarılmasını arz ederiz.</Text>
          <TextInput
            placeholder={'çalışan sayısı'}
            onChangeText={TextInputCalısanSayisi => this.setState({ TextInputCalısanSayisi })}
          />
          <TextInput
            placeholder={'web Adresi'}
            onChangeText={TextInputWebAdresi => this.setState({ TextInputWebAdresi })}
          />
          <TextInput
            placeholder={'Iban No'}
            onChangeText={TextInputIbanNo => this.setState({ TextInputIbanNo })}
          />
          <TextInput
            placeholder={'Yetkili Ad Soyad'}
            onChangeText={TextInputYetkiliAdSoyad => this.setState({ TextInputYetkiliAdSoyad })}
          />
          <TextInput
            placeholder={'Vergi No'}
            onChangeText={TextInputIsletmeVergiNo => this.setState({ TextInputIsletmeVergiNo })}
          />
        </View>
        <Button text={'Kaydet'} onPress={() => this.kayıt()}></Button>
      </LinearGradient>
    );
  }
}
export default frmaDTKF;