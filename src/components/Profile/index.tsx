import React from 'react';
import { Alert, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { styles } from './styles';
import { Avatar } from '../Avatar';
import { useAuth } from '../../hooks/auth';

export function Profile(){
    const { user, singOut } = useAuth();

    async function handleSingOut(){
        Alert.alert('LogOut', 'Tem cerceza que deseja sair da sua conta?', [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                style: 'destructive',
                onPress: () => singOut()
            }
        ])
    }

    return (
        <View style={styles.container} >

            <RectButton
                onPress={handleSingOut}
            >
                <Avatar urlImage={user.avatar} />
            </RectButton>

            <View>
                <View style={styles.user} >
                    <Text style={styles.greeting} >
                        Olá,
                    </Text>
                    <Text style={styles.username}>
                        { user.firstName }
                    </Text>
                </View>
                    <Text style={styles.message}>
                        Hoje é dia de vitória
                    </Text>
            </View>
        </View>
    );
}