import react from "react";
import { NativeAppEventEmitter } from "react-native";
import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

class Button extends Component {

    render() {
        return (
            <TouchableOpacity style={{
                borderWidth: this.props.borderWidth ? this.props.borderWidth : 1,
                borderColor: this.props.borderColor ? this.props.borderColor : 'black',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                marginBottom:this.props.marginBottom ? this.props.marginBottom : 1,
                borderRadius: 32,
                width: width * 0.74,
                height: height * 0.08,
                marginTop: 15
            }}
                onPress={() => this.props.onPress()}
            >

                <Text style={{
                    color: this.props.color ? this.props.color : 'black', fontSize: 20
                }}>{this.props.text}</Text>

            </TouchableOpacity>



        );
    }
}
export default Button;