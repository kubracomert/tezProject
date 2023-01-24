import {Alert} from 'react-native';

export async function onayAlert(dene) {
    return  Alert.alert(
        'Firmayı Onayla',
        'Bu firmayı onaylamak istediğinizden emin misiniz?',
        [
          {
            text: 'İptal Et',
            onPress: () => Alert.alert("İptal edildi!"),
            style: 'cancel'
          },
          { text: 'Onayla', onPress: () => {this.dene} }
        ],
        { cancelable: false }
      );
}