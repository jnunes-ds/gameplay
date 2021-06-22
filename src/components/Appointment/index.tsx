import React from 'react';
import { Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';

export interface GuildProps{}

export interface AppointmentProps{
    id: string;
    guild: GuildProps;
    category: string;
    date: string;
    description: string;
}

interface Props extends RectButtonProps{
    data: AppointmentProps;
}

export function Appointment({ data, ...rest } : Props){
    return (
        <RectButton 
             { ...rest }
        >
            <View style={styles.container}>
                <GuildIcon />
            </View>

        </RectButton>
    );
}