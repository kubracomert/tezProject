import React,{Component}  from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View,Text,Image,StyleSheet,Dimensions,TouchableOpacity,ActivityIndicator,ScrollView,Alert}from'react-native';
import Button from '../../commons/Button';
import {Actions} from 'react-native-router-flux';
import {strings}from '../../Dil/strings'; 
import getIp from '../../commons/getIp';


const{width,height}=Dimensions.get('window');
class  frmaRedSil extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading:true,
    }
  }
  componentDidMount(){
      setTimeout(()=>{
        this.setState({loading:false})  
      },200)
    }

  renderAlertSil(){
    Alert.alert(
        'Firmayı Sil',
        'Bu firmayı kaldırmak istediğinizden emin misiniz?',
        [
          {
            text: 'İptal',
            onPress: () => Alert.alert("İptal edildi!"),
            style: 'cancel'
          },
          { text: 'Kaldır', onPress: () => {this.UpdatebasvuruReddi()} }
        ],
        { cancelable: false }
      );
  }

  renderAlertOnay(){
    Alert.alert(
        'Firmayı Onayla',
        'Bu firmayı onay listesine eklemek istediğinizden emin misiniz?',
        [
          {
            text: 'İptal',
            onPress: () => Alert.alert("İptal edildi!"),
            style: 'cancel'
          },
          { text: 'Onayla', onPress: () => {this.UpdatebasvuruOnayi()} }
        ],
        { cancelable: false }
      );
  }
  UpdatebasvuruReddi  = () =>{  
    
    const { navigation } = this.props;
    const {navigate}=this.props.navigation; 
    let degisken7=navigation.getParam('degisken7'); 
    console.log(this.props.navigation.getParam('degisken7'))  
    fetch( getIp() + '/react-native-insert/frmaRedSil.php', {
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
        });
  }
 

  UpdatebasvuruOnayi  = () =>{  
    const { navigation } = this.props;
    const {navigate}=this.props.navigation;
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
              console.error(error);
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
        let degisken1=navigation.getParam('degisken1');
        let degisken2=navigation.getParam('degisken2');
        let degisken3=navigation.getParam('degisken3');
        let degisken4=navigation.getParam('degisken4');
        let degisken5=navigation.getParam('degisken5');
        let degisken6=navigation.getParam('degisken6');
        let degisken8=navigation.getParam('degisken8');
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
                 
            {this.state.loading ? <ActivityIndicator size='large' color="white" />: 
              <>
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
                    <Text  style={style.section}>{degisken8}</Text> 
                         
                <View style={{width:width*0.7,height:height*0.2,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                
                    <TouchableOpacity onPress={()=>this.renderAlertOnay()} >
                      <Image source={require('../../img/tik.png')} style={style.tikc} Text={strings.Onayla}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>this.renderAlertSil()}>
                      <Image source={require('../../img/carpi.png')} style={style.tikc} Text={strings.Reddet}/>
                    </TouchableOpacity>
                </View>
              </>
            }
 
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
export default frmaRedSil;