import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../global/styles/theme';

interface Props extends RectButtonProps{}

export function ButtonAdd({ ...rest } : Props){
    return (
        <RectButton 
            style={styles.container} 
            { ...rest }
        >
            <MaterialCommunityIcons 
                name="plus"
                color={theme.colors.heading}
                size={24}
            />
        </RectButton>
    );
}