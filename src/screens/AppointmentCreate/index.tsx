import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert
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

    const [ haveDateError, setHaveDateError ] = useState(false);
    const [ haveHourError, setHaveHourError ] = useState(false);
    const [ dayMonthErros, setDayMonthError ] = useState('');
    const [ hourMinuteError, setHourMinuteError ] = useState('');

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

    function dayMonthInputsValidation(){
        if(Number(day) <= 0 || Number(day) >30){
            setDayMonthError('Escolha um dia válido');
            setHaveDateError(true);
            return true;
        }else if(Number(month) <= 0 || Number(month) > 12){
            setDayMonthError('Escolha um mês válido');
            setHaveDateError(true);
            return true;
        }else{
            setDayMonthError('');
            setHaveDateError(false);
            return false;
        }
    }

    function hourMinutehInputsValidation(){
        if(Number(hour) <= 0 || Number(hour) > 24){
            setHourMinuteError('Escolha uma hora válida');
            setHaveHourError(true);
            return true;
        }else if(Number(minute) <= 0 || Number(minute) > 59){
            setHourMinuteError('Escolha minutos váldos');
            setHaveHourError(true);
            return true;
        }else{
            setHourMinuteError('');
            setHaveHourError(false);
            return false;
        }
    }

    async function handleSave(){
        if(!category){
            Alert.alert('Categoria', 'É necessário selecionar uma categoria');
            return;
        }
        if(!guild.name){
            Alert.alert('Servidor', 'É obrigatória a seleção de um servidor!');
            return;
        }
        const invalidDate = dayMonthInputsValidation();
        const invalidHour = hourMinutehInputsValidation();

        if(!invalidDate && !invalidHour){
            const currentDate = new Date().getTime();
            const year = new Date().getFullYear();

            const date = new Date(year, (Number(month) - 1), Number(day), Number(hour), Number(minute)).getTime() >= currentDate
                ? new Date(year, (Number(month) - 1), Number(day), Number(hour), Number(minute))
                : new Date(year + 1, (Number(month) - 1), Number(day), Number(hour), Number(minute));
                
            const dateFormatted = format(date, "dd/MM ' às ' HH:mm", { locale: ptBR } );
            const newAppointment = {
                id: uuid.v4(),
                guild,
                category,
                date,
                dateFormatted,
                description
            }
    
            const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
            const appointments = storage ? JSON.parse(storage) : [];

            console.log(date);
    
            await AsyncStorage.setItem(
                COLLECTION_APPOINTMENTS,
                JSON.stringify([...appointments, newAppointment])
            );
            navigation.navigate('Home');
        }

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
                                {
                                    haveDateError &&
                                    <Text style={styles.errors}> { dayMonthErros } </Text>
                                }
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
                                {
                                    haveHourError &&
                                    <Text style={styles.errors}> { hourMinuteError } </Text>
                                }
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