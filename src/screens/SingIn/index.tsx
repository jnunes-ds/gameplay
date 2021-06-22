import React from 'react';
import {
    View,
    Text,
    Image, 
} from 'react-native';

import { ButtonIcon } from '../../components/ButtonIcon';
import IllustrationImg from '../../assets/illustration.png'
import { styles } from './styles';


export function SingIN(){


    return (
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
                    activeOpacity={.7}
                />
            </View>
        </View>
    );
}