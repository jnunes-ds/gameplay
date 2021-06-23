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

export function Guilds(){
    const guilds = [
        {
            id: '1',
            name: 'Lendários',
            icon: null,
            owner: true
        }
    ];

    return (
        <View style={styles.container}>
            <FlatList 
                data={guilds}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Guild data={item} />
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ListDivider />}
                style={styles.guilds}
            />
        </View>
    );
}