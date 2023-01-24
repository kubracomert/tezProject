import React  from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View,Text,TextInput,StyleSheet,TouchableOpacity,Dimensions,Alert}from'react-native';
import Button from '../../commons/Button';
import { strings } from '../../Dil/strings';
import getIp from '../../commons/getIp';
import Loader from '../../commons/Loader';
import {Actions} from 'react-native-router-flux';
const{width,height}=Dimensions.get('window');

class  dogrulamaKoduOnay extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
        TextInputKod: '',
        loading:false
      }
  };
  
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
  dogrulamaKoduO  = () =>{
      
    const { navigation } = this.props;
    const {navigate}=this.props.navigation;
    let degisken=navigation.getParam('degisken');
    console.log(degisken);
    const { TextInputKod}  = this.state;
    if(TextInputKod==""){
      Alert.alert('Boşluğu doldurunuz');
    }
    else{
    // Aşağıdaki noktalı yerde IP adresiniz yer almalı192.168.43.168
     fetch( getIp()+'/react-native-insert/dogrulamaKoduOnay.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        
        email:this.props.navigation.getParam('degisken'),
        kod: TextInputKod,
      })
    })
    .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson =='Sifreniz Sıfırlandı.Yeni Şifre epostanıza gönderildi.')
          {Alert.alert(
            
            'ŞifrenizSıfırlandı',
        'Yeni Şifre epostanıza gönderildi.',
        [
          { text: 'Tamam', onPress:()=>Actions.jump('Giris') }
        ],
        { cancelable: false });
         }
         else if(responseJson == 'Yanlış Kod')
         {  Alert.alert(responseJson);}
          else if(responseJson == 'Hata Oluştu.Tekrar deneyiniz.' )
              {  Alert.alert(responseJson);}
        })
                .catch((error) => {
                  console.log('hata');
            });
      }}
    render() {
        return (
            <LinearGradient 
            style={{flex: 1,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'blue'
            ,marginBottom:10}}
            colors={['#CACCEB', '#EAB6C1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
                 <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}></Text>
                 <TextInput
                  style={style.input}       
                  placeholder={'Lütfen doğrulama Kodunuzu giriniz.'}
                  onChangeText={TextInputKod => this.setState({TextInputKod})}
                  />
                    
                    
 <Loader
          loading={this.state.loading} />
 <Button borderWidth={0.7} borderColor='black'
          onPress={() => this.getCoordinates(this.dogrulamaKoduO())}
          text={'Kodu Onayla'} 
          />
                {/* <Button  onPress={()=>{this.dogrulamaKoduO()}}></Button> */}

                 

          </LinearGradient>
        );
    }
}
// <Button text={strings.LogIn} onPress={()=>{this.UserLoginFunction()}} style={style.section}></Button>


const style=StyleSheet.create({
    section:{
      marginTop:20,
      backgroundColor:'white',
      borderRadius:20,
      width:width*0.70,
      height:height*0.09,
      alignItems:'center',
      paddingLeft:10,
      paddingRight:10
    },
    input:{
      textAlign:'center',
      width:width*0.75,
      height:height*0.09,
      marginTop:20,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'white',
      backgroundColor:'white',
      borderRadius:20,
      borderWidth:1,
     
    }
  });
export default dogrulamaKoduOnay;
