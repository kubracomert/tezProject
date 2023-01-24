import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {strings} from './Dil/strings';
import moment from 'moment';
import Button from './commons/Button';
import { TouchableOpacity } from 'react-native';
import { cond } from 'react-native-reanimated';
import { Actions } from 'react-native-router-flux';
const {width,height}= Dimensions.get('window');
 
 
export default class Tarih extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
 
  onDateChange(date, type) {
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: moment(date).format('YYYY-MM-DD'),
      });
    } else {
      this.setState({
        selectedStartDate:moment(date).format('YYYY-MM-DD'),
        selectedEndDate: null,
      });
    }
   }

  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';
    const minDate = new Date(2019,11,18); // Today
    const maxDate = new Date(2021, 11, 18);

    const { navigation } = this.props;
    const {navigate}=this.props.navigation; 
    //hangi sayfadan geldiğini anlamak için sayfa değişkenini tutuyorum
    let sayfa=navigation.getParam('sayfa');
    //staj defterinden gelen giriş yapan öğrencinin veri tabanında kayıtlı olan tarihlerini aralamak için bu iki değişkeni tutuyorum  
    let baslangicT=navigation.getParam('baslangicT'); 
    let bitisT=navigation.getParam('bitisT'); 
   

    return (
      <View style={styles.container}>
      {sayfa=='okulBasvuru'
      ? 
      <>
          <CalendarPicker
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          weekdays={[strings.pazar,strings.pzt, strings.sali,strings.carsamba, strings.persembe, strings.cuma,strings.cumartesi]}
          months={[strings.ocak,strings.subat,strings.mart,strings.nisan,strings.mayis,strings.haziran,strings.temmuz,strings.agustos,strings.eylul,strings.ekim,strings.kasim,strings.aralik]}
          previousTitle={strings.once}
          nextTitle={strings.sonra}
          scaleFactor={400}
          onDateChange={this.onDateChange}
        />
        <View>
          <Text style={{paddingLeft:25}}>{strings.tarih}  { startDate }</Text>
          <Text style={{paddingLeft:25 }}>{strings.bitisTarih}  :  { endDate }</Text>
          <Button text="Tarihi Onayla" style={styles.button} onPress={()=>Actions.jump('okulBasvuru',{baslangicT:startDate,bitisT:endDate})}></Button>
        </View>
      </>
      : 
      sayfa=='StajDefteri' ?
      <>
      <CalendarPicker
        minDate={baslangicT}
        maxDate={bitisT}
        weekdays={[strings.pazar,strings.pzt, strings.sali,strings.carsamba, strings.persembe, strings.cuma,strings.cumartesi]}
        months={[strings.ocak,strings.subat,strings.mart,strings.nisan,strings.mayis,strings.haziran,strings.temmuz,strings.agustos,strings.eylul,strings.ekim,strings.kasim,strings.aralik]}
        previousTitle={strings.once}
        nextTitle={strings.sonra}
        onDateChange={this.onDateChange}
      />
      <View>
        {console.log("hocada")}
        <Text style={{paddingLeft:25}}>{strings.tarih}  { startDate }</Text>
        <Button text="Tarihi Onayla" style={styles.button} onPress={()=>Actions.jump('grvStajDefteri',{gun:startDate,genebaslangicT:baslangicT,genebitisT:bitisT})}></Button>
      </View> 
    </>

      :
      <>
        <CalendarPicker
          minDate={baslangicT}
          maxDate={bitisT}
          weekdays={[strings.pazar,strings.pzt, strings.sali,strings.carsamba, strings.persembe, strings.cuma,strings.cumartesi]}
          months={[strings.ocak,strings.subat,strings.mart,strings.nisan,strings.mayis,strings.haziran,strings.temmuz,strings.agustos,strings.eylul,strings.ekim,strings.kasim,strings.aralik]}
          previousTitle={strings.once}
          nextTitle={strings.sonra}
          onDateChange={this.onDateChange}
        />
        <View>
          <Text style={{paddingLeft:25}}>{strings.tarih}  { startDate }</Text>
          <Button text="Tarihi Onayla" style={styles.button} onPress={()=>Actions.jump('Defter',{gun:startDate,sayfa:'Tarih',genebaslangicT:baslangicT,genebitisT:bitisT})}></Button>
        </View> 
      </>

      }

      </View>
    );
  }
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  }, 
  button: {
    borderWidth:0.6,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    borderRadius:32,
    width:width*0.74,
    height:height*0.08,
    marginTop:15
  },
});





