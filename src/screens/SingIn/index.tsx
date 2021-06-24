import React, { useContext } from 'react';
import {
    View,
    Text,
    Image, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ButtonIcon, Background } from '../../components';
import IllustrationImg from '../../assets/illustration.png'
import { styles } from './styles';
import { useAuth } from '../../hooks/auth';


export function SingIn(){
    const navigation = useNavigation();

    function handleSingIn(){
        navigation.navigate('Home');
    }

    return (
        <Background>
            <View style={styles.container} >
                <Image 
                    source={IllustrationImg}
                    style={styles.image} 
                />
                <View style={styles.content} >
                    <Text style={styles.title} >
                        Conecte-se {'\n'}
                        e organize suas {'\n'}
                        jogatinas
                    </Text>

                    <Text style={styles.subtitle} >
                        Crie grupos para jogar games {`\n`}
                        favoritos com seus amigos
                    </Text>

                    <ButtonIcon 
                        title="Entrar com o Discord"
                        onPress={handleSingIn}
                    />
                </View>
            </View>
        </Background>
    );
}