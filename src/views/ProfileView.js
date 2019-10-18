import React from 'react';
import { AppRegistry, Image, View, Text, TouchableHighlight, Button, ProgressBarAndroid } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import StringsLanguage from '../utils/StringsLanguage';
import { Icon } from 'react-native-elements';

export default class ProfileView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navigate: this.props.navigation.navigate,
            userInfo: {},
            evocoins: 0,
            language: (!!this.props.navigation.getParam('language')) ? this.props.navigation.navigate.getParam('language') : null
        }
    }

    static navigationOptions = {
        drawerLabel: 'Home'
    };

    async componentDidMount(): void {
        const userInfo = await GoogleSignin.getCurrentUser();
        this.setState({ userInfo: userInfo.user });
        this.getEvocoins();
    }

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();

            this.setState({ userInfo: {}, error: null });
            this.state.navigate("HomeView");

        } catch (error) {
            this.setState({
                error,
            });
        }
    };

    render() {
        const { navigate } = this.props.navigation;
        return (

            <View style={styles.container}>
                <View style={styles.container_username}>
                    <Text style={styles.username}> {(!!this.state.userInfo.name) ? this.state.userInfo.name : 'Ha ocurrido un problema'} </Text>
                    <Button title="Salir" onPress={this.signOut} />
                </View>
                <View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.container_Start}>Inicio</Text>
                        <Image
                            style={styles.avatar}
                            source={require('../res/images/avatar.png')}
                        />
                    </View>
                    <View>
                        <Text style={{color:'white',fontSize:16,fontWeight: 'bold'}}>Experiencia</Text>
                        <Text style={{color:'white',fontSize:16,fontWeight: 'bold',marginLeft:250,marginBottom:-10}}> Lv1</Text>
                        <ProgressBarAndroid styleAttr="Horizontal" color="#FFFFFF" indeterminate={false}
                            progress={0.2} style={{height:50}} />
                    </View>
                    <TouchableHighlight style={styles.container_skill_1} onPress={() => this.state.navigate('SkillsView')} underlayColor={'#05BAFA'} activeOpacity={0.1}>
                        <Image
                            style={styles.skill}
                            source={require('../res/images/skill_1.png')}
                        />
                    
                    </TouchableHighlight>
                    <View style={styles.container_skill_2}>
                        <Image
                            style={styles.skill}
                            source={require('../res/images/skill_2.png')}
                        />
                    </View>
                    <View style={styles.container_skill_3}>
                        <Image
                            style={styles.skill}
                            source={require('../res/images/skill_3.png')}
                        />
                    </View>
                    <View style={styles.container_settings}>
                        <Icon
                            reverse
                            name='ios-settings'
                            type='ionicon'
                            color='#517fa4'
                            size={23}
                            onPress={() => { this.state.navigate('SettingsView') }}
                        />
                    </View>
                </View>
                <View style={styles.container_buttons}>
                    <View style={styles.item}>
                        <Text style={styles.text_buttons}>Evocoins {"\n"} {this.state.evocoins}</Text>
                    </View>
                    <TouchableHighlight style={styles.item} onPress={() => this.state.navigate('MisionListView')}>
                        <View>
                            <Text style={styles.text_buttons}>{StringsLanguage.view_missions_button}</Text>
                        </View>
                    </TouchableHighlight >
                </View>
                
            </View>
        );
    }

    getEvocoins() {
        fetch('/evocoin/balanceOf', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.userInfo.email
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ evocoins: responseJson.evocoins });
            })
            .catch((error) => {
                this.setState({ evocoins: 0 });
                console.log(error);
            });
    }


}
const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#05BAFA'
    },
    container_username: {
        width: 200,
        justifyContent: 'flex-start',
        paddingLeft:20,
        marginRight:400

    },
    container_Start: {
        width: '100%',
        color: '#FFFFFF',
        fontSize: 50,
        marginLeft: 95,
        fontWeight: 'bold',
    },
    username: {
        marginTop: 10,
        color: '#fff',
        textAlign: 'left',
        width: '100%',
        marginBottom:15
    },
    avatar: {
        height: 300,
        width: 300,
        marginTop: 40,
        borderRadius: 200
    },
    container_skill_1: {
        position: 'absolute',
        left: 100,
        top: 540
    },
    container_skill_2: {
        position: 'absolute',
        left: -80,
        top: 540,
    },
    container_skill_3: {
        position: 'absolute',
        left: 260,
        top: 540
    },
    skill: {
        height: 110,
        width: 80,
    },
    container_buttons: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop: 30
    },
    item: {
        width: '48%',
        alignItems: 'center',
        marginLeft: '1%',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 20,
        minHeight: 80,
        marginTop: 150,
        backgroundColor: 'white',

    },
    text_buttons: {
        fontSize: 28,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container_settings: {
        position: 'absolute',
        right: -70,
        top: 180
    }
};

AppRegistry.registerComponent('ProfileView', () => ProfileView);
