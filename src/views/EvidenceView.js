import React from 'react';
import {AppRegistry, ScrollView, Text, Button, TextInput, Alert, Image,ToastAndroid} from 'react-native';
import { Icon } from 'react-native-elements';
import StringsLanguage from '../utils/StringsLanguage';
import  {GoogleSignin} from 'react-native-google-signin';



export default class EvidenceView extends React.Component {
    static navigationOptions = {
        title: 'Evoke'
    };
    constructor(props) {
        super(props);
        this.state = {
            navigate: this.props.navigation.navigate,
            mision: this.props.navigation.getParam('mision'),
            activity: this.props.navigation.getParam('activity'),
            image:null,
            token: null
            
        }
    }
    // async componentDidMount(){
    //     var token= await GoogleSignin.getTokens();
    //     this.setState({token});
    // }
    static getDerivedStateFromProps(nextProps, prevState) {
        return {image: nextProps.navigation.getParam('pathPhoto')};
    }
    

    GoogleDrive = async () => {
        
        var token= await GoogleSignin.getTokens();
        console.log(token.accessToken);
        console.log(this.state.image);
            fetch('https://40.117.251.50/save-drive', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    access_token:token.accessToken,
                    mimeType: 'image/jpeg',
                    name: 'imagen1',
                    image: this.state.image
                }),
                
            }).then((response) => response.json()).then((responseJson) => {
                console.log(responseJson);
                if(responseJson.status){
                console.log('guardada');
                ToastAndroid.show('Imagen guardada exitosamente!')
                }else{
                console.log('error');
                ToastAndroid.show('Error al subir imagen')
                }
                console.log(responseJson);
            });
        
        
        
    }


    render() {
        return (
            <ScrollView>
                <Text style={styles.title}>{StringsLanguage.title_section_evidence} {this.state.activity}</Text>
                { (this.state.image) ?
                    <Image style={{width: 200, height: 200}} source={{uri: this.state.image, isStatic:true}}/> :
                    <Icon
                        reverse
                        name='ios-camera'
                        type='ionicon'
                        color='#517fa4'
                        size={40}
                        onPress={() => {this.state.navigate('CameraView', {mision: this.state.mision, activity: this.state.activity})} }
                    />

                }

                <TextInput
                    style={styles.textInput}
                    placeholder={StringsLanguage.evidence_placeholder_description}
                />
                <Button title={StringsLanguage.send_evidence_button} onPress={() => this.state.navigate('MisionDetailView', {mison: this.state.mision})}/>
                <Button title="subir" onPress={this.GoogleDrive}/>
            </ScrollView>
        );
    }
}

const styles = {
    title:{
        fontSize: 35,
        marginTop: 20,
        marginBottom: 15,
        marginLeft: 10
    },
    camera:{
        fontSize: 40
    },
    textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 20,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 30,
        marginBottom: 30
    }
};

AppRegistry.registerComponent('EvidenceView', () => EvidenceView);
