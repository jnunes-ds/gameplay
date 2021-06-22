import React from 'react';
import { View } from 'react-native';
import {
    Profile,
    ButtonAdd,
    CategorySelect
} from '../../components';

import { styles } from './styles';

export function Home(){
    return (
        <View
            style={styles.Container}
        >
            <View style={styles.header} >
                <Profile />
                <ButtonAdd />
            </View>

            <View>
                <CategorySelect />
            </View>

        </View>
    );
}