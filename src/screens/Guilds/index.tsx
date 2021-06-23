import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

interface Props{
    title: string;
}

export function Guilds({ title } : Props){

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                { title }
            </Text>
        </View>
    );
}