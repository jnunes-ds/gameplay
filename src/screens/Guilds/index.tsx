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
        },
        {
            id: '3',
            name: 'Talvez seja bom',
            icon: null,
            owner: false
        },
        {
            id: '4',
            name: 'Fodão',
            icon: null,
            owner: true
        },
        {
            id: '5',
            name: 'Melhor',
            icon: null,
            owner: true
        },
        {
            id: '6',
            name: 'Meêro',
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
                ItemSeparatorComponent={() => <ListDivider isCentered/>}
                ListHeaderComponent={() => <ListDivider isCentered/>}
                contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
                style={styles.guilds}
            />
        </View>
    );
}