import React from 'react';
import { Image } from 'react-native';

import { styles } from './styles';

export function GuildIcon(){
    const uri = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Fcereja-in-2021--578501514632438924%2F&psig=AOvVaw0EUV4krSCZTtCBOTqxS6RN&ust=1624476559488000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCPix-PX8q_ECFQAAAAAdAAAAABAS';

    return (
        <Image
            source={{ uri }} 
            style={styles.image}
            resizeMode="cover"
        />
    );
}