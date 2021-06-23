import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { Avatar } from '../Avatar/index';

interface MemberProps{
    id: string;
    username: string;
    avatar_url: string;
    status: string;
}

interface Props{
    data: MemberProps;
}

export function Member({ data } : Props){
    const isOnline = data.status === 'online';

    return (
        <View style={styles.container}>
            <Avatar 
                urlImage={data.avatar_url}
            />
            <View>
                <Text style={styles.title}>
                    { data.username }
                </Text>

                <View style={styles.status}>
                    <Text style={styles.nameStatus}>
                        { isOnline ? 'Disponível' : 'Ocupado' }
                    </Text>
                    <View style={styles.bulletStatus}>

                    </View>
                </View>
            </View>
        </View>
    );
}