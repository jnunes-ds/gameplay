import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    TextArea,
    ModalView,
    GuildProps
} from '../../components';
import { Guilds } from '../Guilds';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';


export function AppointmentCreate(){
    const [category, setCategory] = useState('');
    const [openGuildsModal, setOpenGuildsModal] = useState(false);
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

    const [ day, setDay ] = useState('');
    const [ month, setMonth ] = useState('');
    const [ hour, setHour ] = useState('');
    const [ minute, setMinute ] = useState('');
    const [ description, setDescription ] = useState('');

    const navigation = useNavigation();

    function handleOpenGuilds(){
        setOpenGuildsModal(true);
    }

    function handleCloseGuilds(){
        setOpenGuildsModal(false);
    }

    function handleGuildSelect(guildSelected : GuildProps){
        setGuild(guildSelected);
        setOpenGuildsModal(false);
    }

    function handleCategorySelect(categoryId: string){
        setCategory(categoryId)
    }

    async function handleSave(){
        const newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description
        }

        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const appointments = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([...appointments, newAppointment])
        );

        navigation.navigate('Home');
    }

    return (
        <KeyboardAvoidingView
            behavior={ Platform.OS === 'android' ? 'height' : 'padding' }
            style={styles.container}
        >
            <Background>
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
                        setCategory={handleCategorySelect}
                        categorySelected={category}
                    />

                    <View style={styles.form}>
                        <RectButton
                            onPress={handleOpenGuilds}
                        >
                            <View style={styles.select}>
                                {
                                    guild.icon
                                    ? <GuildIcon 
                                        guildId={guild.id}
                                        iconId={guild.icon}
                                      />
                                    : <View style={styles.image}/>
                                }

                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        { !guild.name ? 'Selecione um servidor' : guild.name }
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
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Dia e mês
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput 
                                        maxLength={2}
                                        onChangeText={setDay}
                                    />
                                    <Text style={styles.divider}>
                                        /
                                    </Text>
                                    <SmallInput 
                                        maxLength={2}
                                        onChangeText={setMonth}
                                    />
                                </View>
                            </View>

                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Hora e minuto
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput 
                                        maxLength={2}
                                        onChangeText={setHour}
                                    />
                                    <Text style={styles.divider}>
                                        :
                                    </Text>
                                    <SmallInput 
                                        maxLength={2}
                                        onChangeText={setMinute}
                                    />
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
                                onChangeText={setDescription}
                            />
                        </View>

                        <View style={styles.footer}>
                            <Button 
                                title="Agendar"
                                onPress={handleSave}
                            />   
                        </View>

                    </View>

                </ScrollView>
            </Background>

            <ModalView 
                visible={openGuildsModal}
                closeModal={handleCloseGuilds}
            >
                <Guilds 
                    handleGuildSelect={handleGuildSelect}
                />
            </ModalView>
        </KeyboardAvoidingView>
    );
}