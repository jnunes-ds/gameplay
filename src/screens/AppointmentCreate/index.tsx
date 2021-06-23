import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import {
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

import {
    Background,
    Button,
    Header,
    CategorySelect,
    GuildIcon,
    SmallInput,
    TextArea
} from '../../components';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';


export function AppointmentCreate(){
    const [category, setCategory] = useState('');

    return (
        <KeyboardAvoidingView
            behavior={ Platform.OS === 'android' ? 'height' : 'padding' }
            style={styles.container}
        >
            <ScrollView>
                <Header 
                    title="Agendar partida"
                />

                <Text 
                    style={[
                        styles.label,
                        { marginBottom: 18, marginLeft: 24, marginTop: 36 }
                    ]}
                >
                    Categoria
                </Text>

                <CategorySelect 
                    hasCheckBox
                    setCategory={setCategory}
                    categorySelected={category}
                />

                <View style={styles.form}>
                    <RectButton>
                        <View style={styles.select}>
                            {
                                // <View style={styles.image}/>
                                <GuildIcon />
                            }

                            <View style={styles.selectBody}>
                                <Text style={styles.label}>
                                    Selecione um servidor
                                </Text>

                            </View>

                            <Feather 
                                name="chevron-right"
                                color={theme.colors.heading}
                                size={18}
                            />

                        </View>
                    </RectButton>

                    <View style={styles.field}>

                        <View>
                            <Text style={styles.label}>
                                Dia e mês
                            </Text>

                            <View style={styles.column}>
                                <SmallInput maxLength={2}/>
                                <Text style={styles.divider}>
                                    /
                                </Text>
                                <SmallInput maxLength={2}/>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.label}>
                                Hora e minuto
                            </Text>

                            <View style={styles.column}>
                                <SmallInput maxLength={2}/>
                                <Text style={styles.divider}>
                                    :
                                </Text>
                                <SmallInput maxLength={2}/>
                            </View>
                        </View>

                    </View>
                    
                    <View>
                        <View 
                            style={[
                                styles.field,
                                { marginBottom: 12 }
                            ]}
                        >
                            <Text style={styles.label}>
                                Descrição
                            </Text>

                            <Text style={styles.charactersLimit}>
                                Max 100 caracteres
                            </Text>
                        </View>
                        <TextArea 
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.footer}>
                        <Button title="Agendar"/>   
                    </View>

                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}