import React from 'react';
import {
    Text,
    View,
    FlatList
} from 'react-native';

import { styles } from './styles';
import {
    Guild,
    GuildProps,
    ListDivider,
} from '../../components';

interface Props{
    handleGuildSelect(guild: GuildProps): void;
}

export function Guilds({ handleGuildSelect } : Props){
    const guilds = [
        {
            id: '1',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        },
        {
            id: '2',
            name: 'Não Lendários',
            icon: null,
            owner: false
        }
    ];

    return (
        <View style={styles.container}>
            <FlatList 
                data={guilds}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Guild 
                        data={item}
                        onPress={() => handleGuildSelect(item)} 
                    />
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ListDivider />}
                style={styles.guilds}
            />
        </View>
    );
}