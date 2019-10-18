import React from 'react';
import { AppRegistry, Button, View, ImageBackground, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {GoogleSignin} from "react-native-google-signin";
import Constants from "../utils/Constants";
import StringsLanguage from '../utils/StringsLanguage';
import config from "../../config";

export default class HomeView extends React.Component {
    static navigationOptions = {
        title: 'Evoke'
    };
    constructor(props) {
        super(props);
        this.state = {
            navigate: this.props.navigation.navigate,
            labelStartButton: '',
            labelValidateButton: ''
        };
        this.loadLanguage();
    }

    async componentDidMount(): void {
        HomeView.configureGoogleSignIn();
    }

    static configureGoogleSignIn() {
        GoogleSignin.configure({
            webClientId: config.CLIENT_ID,
            offlineAccess: false,
        });
    }

    async verifyAuth(){
        const isSignedIn = await GoogleSignin.isSignedIn();

        if(isSignedIn){
            this.state.navigate('ProfileView');
        }else{
            this.state.navigate('AuthView');
        }
    }

    async loadLanguage(){
        try {
            let language = await AsyncStorage.getItem('language');
            if(language === undefined || language === null){
                language = Constants.DEFAULT_LANGUAGE;
                await AsyncStorage.setItem('language', language);
            }
            StringsLanguage.setLanguage(language);
            this.setState({
                labelStartButton: StringsLanguage.start_button,
                labelValidateButton: StringsLanguage.validate_button
            })
        } catch (error) {
            console.log('Error', error);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../res/images/background_home.png')} style={styles.background}>
                    <View style={styles.container_button}>
                        <Button
                            style={styles.button}
                            title={this.state.labelStartButton}
                            onPress={() => this.verifyAuth()}
                        />
                        <Button
                            style={styles.button}
                            title={this.state.labelValidateButton}
                            onPress={() => this.state.navigate('CodeValidationView')}
                        />
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        
    },
    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        color:'#979797',
        flex: 1
    },
    container_button: {
        flex: 3,
        justifyContent: 'space-between',
        alignContent:"center",
        paddingBottom: 390,
        paddingTop:410,
        marginLeft:10,
        marginRight:10,
        color:'red',
    },
    button: {
        flex: 1,
        width: '100%',
        height:'100%',
        alignContent:"center",
        backgroundColor: 'transparent',
        top: 50,

        
    }
});

AppRegistry.registerComponent('HomeView', () => HomeView);
