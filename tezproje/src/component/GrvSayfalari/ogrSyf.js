import React,{Component}  from 'react';
import {Actions} from 'react-native-router-flux';
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,FlatList,Alert,Image}from'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../commons/Button';
import {strings} from '../../Dil/strings';
import getIp from '../../commons/getIp';
//import {TouchableOpacity} from 'react-native-ge;sture-handler';
const{width,height}=Dimensions.get('window');

class  ogrSyf extends Component {
  
  constructor(props){
    super(props);
    this.state = {}
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
    let ogrenciId=navigation.getParam('ogrenciId'); 
    console.log(this.props.navigation.getParam('ogrenciId'))  
    console.log(this.props.navigation.getParam('firmaId')) ;
    fetch(getIp() + '/react-native-insert/ogrbasvuruReddetme.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId:this.props.navigation.getParam('ogrenciId'),
        firmaId:this.props.navigation.getParam('firmaId')
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
 
  
  UpdatebasvuruOnayi  = () =>{  
    const { navigation } = this.props;
    const {navigate}=this.props.navigation;
    // const{navigation}=this.props;    <Text>{navigation.getParam('name')}</Text>
    let ogrenciId=navigation.getParam('ogrenciId'); 
    let firmaId=navigation.getParam('firmaId');  
    console.log(this.props.navigation.getParam('ogrenciId')) ;
    console.log(this.props.navigation.getParam('firmaId')) ;
    
    fetch(getIp() + '/react-native-insert/ogrbasvuruOnaylama.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId:this.props.navigation.getParam('ogrenciId'),
        firmaId:this.props.navigation.getParam('firmaId')
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
//dursun bir şimdilik--------------------------
  // mailGonder=()=>{
  //   const { navigation } = this.props;
  //   const {navigate}=this.props.navigation;
  //   // const{navigation}=this.props;    <Text>{navigation.getParam('name')}</Text>
  //   let ogrenciId=navigation.getParam('ogrenciId'); 
  //   console.log(this.props.navigation.getParam('ogrenciId'))

  //   fetch(getIp() + '/react-native-insert/mailgonder.php', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id:this.props.navigation.getParam('ogrenciId')
  //     })
  //   })
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     if(responseJson=='Parola Gönderildi!'){
  //       Alert.alert(responseJson);} } 
  //     )
  //   .catch((error) => {
  //       console.log('yok');
  //  });
  // }

 

   async componentDidMount(){ 
      const { navigation } = this.props;
      const {navigate}=this.props.navigation;
      let ogrenciId=navigation.getParam('ogrenciId');  
      console.log(this.props.navigation.getParam('ogrenciId'),"buraya da zahmet olmazsa öğrencinin idsini yazıve") ;
      try {
        const response = await fetch(getIp() + '/react-native-insert/ogrStajBasvuranlar.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Populate User email from JSON $obj array and store into $email.
                ogrenciId:this.props.navigation.getParam('ogrenciId')
          })
        });
        const responseJson = await response.json();
        this.setState({
          dataSource: responseJson
        }); 
      }
      catch (error) {
        console.error(error);
      }
    }

    FlatListItemSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "gray",
          }}
        />
      );
    }

    render() { 
      const { navigation } = this.props;
      const {navigate}=this.props.navigation;  
      let ogrenciAd=navigation.getParam('ogrenciAd'); 
      let ogrenciId=navigation.getParam('ogrenciId'); 
      console.log(this.props.navigation.getParam('ogrenciId'),"buraya zahmet olmazsa öğrencinin idsini yazıve") 
        return (
            <LinearGradient  colors={['#D9CAC1', '#A3B0D9']}
            // colors={['white','gray','pink', 'purple']}
            style={styles.container}
            start={{ x: 0, y: 1,z:0 }}
            end={{ x: 1, y: 0,z:0 }}> 
            
            <Text>{ogrenciAd}</Text> 
             
            <FlatList    
                  data={ this.state.dataSource }
                  ItemSeparatorComponent = { this.FlatListItemSeparator }
                  keyExtractor={ dataSource => dataSource.id }
                  renderItem={({item}) => <>
                  <Text  style={styles.section}>{item.name}</Text>  
                  <Text  style={styles.section}>{item.faaliyetAlani}</Text> 
                  <Text  style={styles.section}>{item.aciklama}</Text>
                  <Text  style={styles.section}>{item.adres}</Text>
                  <Text  style={styles.section}>{item.phone_number}</Text>
                  <Text  style={styles.section}>{item.email}</Text>
                  <Text  style={styles.section}>{item.baslangicT}</Text>
                  <Text  style={styles.section}>{item.bitisT}</Text>
                  </>} 
             /> 

         
          <View style={{width:width*0.7,height:height*0.2,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity onPress={()=>this.renderAlertOnay()}>
              <Image source={require('../../img/tik.png')} style={styles.tikc} Text={strings.Onayla}/>
          </TouchableOpacity>
         <TouchableOpacity onPress={()=>this.renderAlertReddi()}  >
              <Image source={require('../../img/carpi.png')} style={styles.tikc} Text={strings.Reddet}/>
         </TouchableOpacity>
         </View>
          </LinearGradient>
        );
    }   
}
const styles=StyleSheet.create({
      container:{flex: 1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'blue',
      marginBottom:10
    },
      tikc:{
          marginLeft:20,
          marginRight:20,
          width:width*0.2,
          height:height*0.13,
          alignItems:'center',
          borderRadius:30,
          marginTop:20,
          flexDirection:'row'
      },
      section:{
        marginTop:20,
        backgroundColor:'white',
        borderRadius:20,
        width:width*0.70,
        height:height*0.09,
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10
      }
    });
   export default ogrSyf;