import React, { Component } from "react";
import { View, Text, FlatList ,StyleSheet,Dimensions,Image} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../commons/Button';
import {StackNavigator} from 'react-navigation';
import {Actions} from 'react-native-router-flux' 
import getIp from '../../commons/getIp';
 

const{width,height}=Dimensions.get('window');

class FirmaOgrListe extends Component{

  constructor(props){
    super(props);
    this.state = {}
  }  
  async componentDidMount() {
    
    try {
      const response = await fetch(getIp() + '/react-native-insert/ogrenciListesi.php');
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

    render(){ 
        const { navigation } = this.props;
        const {navigate}=this.props.navigation;
        let degisken=navigation.getParam('degisken');
        return(
          
            <LinearGradient colors={['gray', 'blue']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}style={styles.container}>
                <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>BAŞVURAN BEBELER</Text>
              <FlatList    
                data={ this.state.dataSource }
                ItemSeparatorComponent = { this.FlatListItemSeparator }
                keyExtractor={ dataSource => dataSource.id }
                renderItem={({item}) => <Button text={item.name}  onPress={()=> Actions.FirmaOgrSyf({greet:item.name})}></Button> } 
              />
              
            <Button text="Parola güncelle" onPress={()=>Actions.parolaGuncelleme({degisken1:degisken})}> </Button>
            </LinearGradient>
        
        );
            
    }
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#859a9b',
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
      },
    image:{
        flex:1,

        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'flex-end',

    },
    container: {
     width,height,
     alignItems:'center',
     justifyContent:'center',
     flex: 1,
     paddingTop: 22
    },
    item: {
        textAlign:'center',
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    section:{
        flex:9,
        marginTop:20,
        backgroundColor:'white',
        borderRadius:20,
        width:width*0.70,
        height:height*0.07,
        alignItems:'center',
        paddingLeft:20,
        paddingTop:10,
        paddingRight:10
      },
  });
export default FirmaOgrListe;