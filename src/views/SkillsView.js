import React from 'react';
import { AppRegistry, Image, View, Text, TouchableHighlight, Alert, Button } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';



export default class SkillsView extends React.Component {
    static navigationOptions = {
        title: 'Evoke'
    };
    constructor(props) {
        super(props);
        this.state = {
            navigate: this.props.navigation.navigate,
            userInfo: {}
        }
    }


    async componentDidMount(): void {
        const userInfo = await GoogleSignin.getCurrentUser();
        this.setState({ userInfo: userInfo.user });
    }


    render() {


        const { navigate } = this.props.navigation;
        return (

            <View style={styles.container}>

                <View style={styles.container_skills}>
                    <Image
                        style={styles.skill1}
                        source={require('../res/images/triangulo.jpg')} />
                    <Text style={{ marginLeft: -100, marginTop: -60 }}>SI</Text>

                    <Image
                        style={styles.skill2}
                        source={require('../res/images/hexagono.jpg')} />
                    <Text style={{ marginLeft: -100, marginTop: -50 }}>PC</Text>
                    <Image
                        style={styles.skill3}
                        source={require('../res/images/circulo.jpg')} />
                    <Text style={{ marginLeft: -100, marginTop: -60 }}>CV</Text>
                    <Image
                        style={styles.skill4}
                        source={require('../res/images/cuadrado.jpg')} />
                    <Text style={{ marginLeft: -100, marginTop: 450 }}>DC</Text>
                    <Image
                        style={styles.skill5}
                        source={require('../res/images/pentagono.jpg')} />
                    <Text style={{ marginLeft: -100, marginTop: 600 }}>EP</Text>

                    
                </View>
                <View style={styles.container_text}>


                </View>
            </View>
        );
    }

    
}
const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    skill1: {
        height: 110,
        width: 100,
        marginLeft: -250
    },
    skill2: {
        height: 110,
        width: 90,
        marginLeft: -250,
        marginTop: 40
    },
    skill3: {
        height: 110,
        width: 100,
        marginLeft: -250,
        marginTop: 50
    },
    skill4: {
        height: 120,
        width: 120,
        marginLeft: -260,
        marginTop: 400
    },
    skill5: {
        height: 110,
        width: 100,
        marginLeft: -250,
        marginTop: 550
    },
    container_skills: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop: 30
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop: 30
    },
    item: {
        width: 100,
        height: 100,
        alignItems: 'center',


    }
};

AppRegistry.registerComponent('SkillsView', () => SkillsView);
