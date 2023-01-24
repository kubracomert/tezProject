import React,{Component}  from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View,Text,Image,StyleSheet,Dimensions,TouchableOpacity,ActivityIndicator,ScrollView,Alert}from'react-native';
import Button from '../../commons/Button';
import Loader from '../../commons/Loader';
import onayAlert from '../../commons/alertScreen';
import {Actions} from 'react-native-router-flux';
import {strings}from '../../Dil/strings'; 
import getIp from '../../commons/getIp';
 

const{width,height}=Dimensions.get('window');
class  frmaHocaOnay extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,    
    }
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

  renderAlertOnay(){
    Alert.alert(
        'Firmayı Onayla',
        'Bu firmayı onaylamak istediğinizden emin misiniz?',
        [
          {
            text: 'İptal Et',
            onPress: () => Alert.alert("İptal edildi!"),
            style: 'cancel'
          },
          { text: 'Onayla', onPress: () => {this.UpdatebasvuruOnayi()} }
        ],
        { cancelable: false }
      );
  }

  renderAlertReddi(){
    Alert.alert(
        'Firmayı Reddet',
        'Bu firmayı reddetmek istediğinizden emin misiniz?',
        [
          {
            text: 'İptal Et',
            onPress: () => Alert.alert("İptal edildi!"),
            style: 'cancel'
          },
          { text: 'Reddet', onPress: () => {this.UpdatebasvuruReddi()} }
        ],
        { cancelable: false }
      );
  }

  UpdatebasvuruReddi  = () =>{  
    const { navigation } = this.props;
    const {navigate}=this.props.navigation; 
    let degisken7=navigation.getParam('degisken7'); 
    console.log(this.props.navigation.getParam('degisken7'))  
    fetch(getIp() + '/react-native-insert/basvuruReddetme.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId:this.props.navigation.getParam('degisken7')
        
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
       
      //Bilgileri kaydettikten sonra bilgi mesajını gösterme
      Alert.alert(responseJson);})
            .catch((error) => {
              console.error(error);
        });{
        {this.props.navigation.goBack()};}
  }
 
  mailGonder=()=>{
    const { navigation } = this.props;
    const {navigate}=this.props.navigation;
    // const{navigation}=this.props;    <Text>{navigation.getParam('name')}</Text>
    let degisken7=navigation.getParam('degisken7'); 
    console.log(this.props.navigation.getParam('degisken7'))

    fetch(getIp() + '/react-native-insert/mailgonder.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id:this.props.navigation.getParam('degisken7')
      })
    })
    .then((response) => response.json())
    .then((responseJson) => { 
        Alert.alert(responseJson);}  
      )
    .catch((error) => {
        console.log(error.name+':::'+error.message);
   });
  }

  
  UpdatebasvuruOnayi  = () =>{  
    const { navigation } = this.props;
    const {navigate}=this.props.navigation;
    // const{navigation}=this.props;    <Text>{navigation.getParam('name')}</Text>
    let degisken7=navigation.getParam('degisken7'); 
    console.log(this.props.navigation.getParam('degisken7')) 
    
    fetch(getIp() + '/react-native-insert/basvuruOnaylama.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId:this.props.navigation.getParam('degisken7')
        
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
       
      //Bilgileri kaydettikten sonra bilgi mesajını gösterme
      Alert.alert(responseJson);})
            .catch((error) => {
              console.log('yok');
        });
        {this.props.navigation.goBack()};
  }
    renderSection(Baslik){
        return(
        
          <View>
              <Text style={{marginTop:10}}>{Baslik}</Text>

          </View>
          
        );}
    render() {
        const { navigation } = this.props;
        const {navigate}=this.props.navigation;
      // const{navigation}=this.props;    <Text>{navigation.getParam('name')}</Text>
        let degisken1=navigation.getParam('degisken1');
        let degisken2=navigation.getParam('degisken2');
        let degisken3=navigation.getParam('degisken3');
        let degisken4=navigation.getParam('degisken4');
        let degisken5=navigation.getParam('degisken5');
        let degisken6=navigation.getParam('degisken6');
        let degisken8=navigation.getParam('degisken8');
        /* if(navigation.getParam('degisken6') ==1)
          {degisken6 ='Onaylandı'}
        else 
         {degisken6 ='Beklemede'}

         */
        return (
            
            <LinearGradient 
            colors={['#D9CAC1', '#A3B0D9']}
            style={{flex: 1,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'blue'
            ,marginBottom:10}}
            // colors={['yellow', 'blue']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}> 

          
              
                  <Text  style={{textAlign:'center'}}>{degisken1}</Text> 
                  {this.renderSection('Faaliyet Alanı:')}
                  <Text  style={style.section}>{degisken2}</Text> 
                  {this.renderSection('Adres:')}
                  <Text  style={style.section}>{degisken3}</Text>
                  {this.renderSection('Telefon:')} 
                  <Text  style={style.section}>{degisken4}</Text> 
                  {this.renderSection('Eposta:')}
                  <Text  style={style.section}>{degisken5}</Text>
                  {this.renderSection('Açıklama:')}
                  <Text style={style.section}>{degisken8}</Text>
                
                  {degisken6==1 ?
                    <><Loader
                    loading={this.state.loading} />
                    <Button 
                    onPress={() => this.getCoordinates(this.mailGonder()) }
                    containerViewStyle={{width: '100%', marginBottom: 20}}
                    text={'Parola gönder'}
                    fontWeight="bold"
                    buttonStyle={{borderRadius: 2}}
                    backgroundColor='#333333'
                    underlayColor="#cccccc"  /></> 
                   
                   : console.log('elsee')}
                     

                  <View style={{width:width*0.7,height:height*0.2,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              
                  <TouchableOpacity onPress={()=>this.renderAlertOnay()} >
                    <Image source={require('../../img/tik.png')} style={style.tikc} Text={strings.Onayla}/>
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={()=>this.renderAlertReddi()}>
                    <Image source={require('../../img/carpi.png')} style={style.tikc} Text={strings.Reddet}/>
                  </TouchableOpacity>
                  </View>
              

          </LinearGradient>
        );
    }
}



const style=StyleSheet.create({
    tikc:{
        marginLeft:20,
        marginRight:20,
        width:width*0.2,
        height:height*0.13,
        alignItems:'center',
        borderRadius:30,
        flexDirection:'row'
    },
    section:{
      paddingTop:10,
      backgroundColor:'white',
      borderRadius:20,
      width:width*0.70,
      height:height*0.09,
      textAlign:'center',
      alignItems:'center',
      justifyContent:'center',
      paddingLeft:10,
      paddingRight:10
    }
});
export default frmaHocaOnay;