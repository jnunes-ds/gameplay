import React from 'react';
import { View } from 'react-native';
import { Profile } from '../../components';

import { styles } from './styles';

export function Home(){
    return (
        <View
            style={styles.Container}
        >
            <View style={styles.header} >
                <Profile />
            </View>

        </View>
    );
}