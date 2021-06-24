import React from 'react';
import {
    View,
    Text,
    Image,
    Alert,
    ActivityIndicator 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ButtonIcon, Background } from '../../components';
import IllustrationImg from '../../assets/illustration.png'
import { styles } from './styles';
import { useAuth } from '../../hooks/auth';
import { theme } from '../../global/styles/theme';


export function SingIn(){
    const { loading, singIn } = useAuth();

    async function handleSingIn(){
        try {
            await singIn();
        } catch (error) {
            Alert.alert(`${error}`);
        }
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

                    {
                        loading
                        ?   <ActivityIndicator color={theme.colors.primary} />
                        :   <ButtonIcon 
                                title="Entrar com o Discord"
                                onPress={handleSingIn}
                            />
                    }
                </View>
            </View>
        </Background>
    );
}