

import { Alert } from 'react-native';

export async function frmaListe() {
  try {
    //Noktalı yere kendi ip adresinizi yazın.192.168.43.168
    var response = await fetch('http://172.16.0.218/react-native-insert/tumfirmalar.php');
    var responseJson = await response.json();
    
      this.setState({
        dataSource: responseJson,
        refreshing:false
      }); 
  } 
  catch (error) {
    Alert.alert("Yeni Başvuru Yok!");  
  }
}






export function serializeKey(data) {
	var formBody = [];
	for (var property in data) {
	  var encodedKey = encodeURIComponent(property);
	  var encodedValue = encodeURIComponent(data[property]);
	  formBody.push(encodedKey + "=" + encodedValue);
	}
	formBody = formBody.join("&");
	return formBody;
}


export async function isLogin() {
	var session = await AsyncStorage.getItem("session_ticket");
	if (session != null)
		return true;
	return false;
}

export async function setSessionTicket(ticket) { // giriş yapınca gelen değeri kayıt ediyoruz
	AsyncStorage.setItem("session_ticket", ticket);
}