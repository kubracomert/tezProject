import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions, Image, TouchableOpacity } from 'react-native';
//import { linear } from 'react-native/Libraries/Animated/src/Easing';
import LinearGradient from 'react-native-linear-gradient';
import { strings } from '../Dil/strings';
import Button from '../commons/Button';
import { Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('window');


class Anasayfa extends Component {

    render() {

        return (
            <LinearGradient
                colors={['white', '#D8CAC1','#ffe4c4']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >

                <Image source={require('../img/drawable-ldpi/logo.png')} />
                <Text style={{
                    color: '#3f4441', fontSize: 25,
                    width: width * 0.59,
                    height: height * 0.2,
                    textAlign: 'center',
                }}
                >{strings.slogan}</Text>

                <Button onPress={() => Actions.Giris()}
                    text={strings.giris}  borderColor='#3f4441'  color='#3f4441' 
                />

                <Button text={strings.frmaKyt} color='#3f4441'  borderColor='#3f4441' 
                    onPress={() => Actions.FirmaKayit()}
                > </Button>

            </LinearGradient>

        )

    }
}
const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    section: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 32,
        width: width * 0.74,
        height: height * 0.08,
        marginTop: 15
    }
};
export default Anasayfa;



