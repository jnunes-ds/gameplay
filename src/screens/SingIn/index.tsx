import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './styles';


export function SingIN(){
    const [text, setText] = useState('Júnior');


    return (
        <View style={styles.container} >
            <Text>Hello World, NLW Together!</Text>

            <TextInput 
                style={styles.input}
                value={text}
                onChangeText={setText} 
            />

            <Text>
                Você digitou: { text }
            </Text>
        </View>
    );
}