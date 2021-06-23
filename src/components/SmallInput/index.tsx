import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { styles } from './styles';

interface Props extends TextInputProps{}

export function SmallInput({ ...rest } : Props){

    return (
        <TextInput 
            style={styles.container}
            keyboardType="numeric"
            { ...rest }
        />
    );
}