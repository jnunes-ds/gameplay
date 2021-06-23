import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import {
    Background,
    Header
} from '../../components';


export function AppointmentDetails(){

    return (
        <Background>
            <Header 
                title="Detalhes"
            />
        </Background>
    );
}