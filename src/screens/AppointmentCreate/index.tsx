import React, { useEffect, useState, useRef } from 'react';
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
    GuildProps,
    AppointmentProps
} from '../../components';
import { Guilds } from '../Guilds';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { schedulePushNotification } from '../../configs/notifications';


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
            setDayMonthError('Escolha um dia v??lido');
            setHaveDateError(true);
            return true;
        }else if(Number(month) <= 0 || Number(month) > 12){
            setDayMonthError('Escolha um m??s v??lido');
            setHaveDateError(true);
            return true;
        }else{
            setDayMonthError('');
            setHaveDateError(false);
            return false;
        }
    }

    function hourMinutehInputsValidation(){
        if(Number(hour) < 0 || Number(hour) > 24){
            setHourMinuteError('Escolha uma hora v??lida');
            setHaveHourError(true);
            return true;
        }else if(Number(minute) < 0 || Number(minute) > 59){
            setHourMinuteError('Escolha minutos v??ldos');
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
            Alert.alert('Categoria', '?? necess??rio selecionar uma categoria');
            return;
        }
        if(!guild.name){
            Alert.alert('Servidor', '?? obrigat??ria a sele????o de um servidor!');
            return;
        }
        const invalidDate = dayMonthInputsValidation();
        const invalidHour = hourMinutehInputsValidation();

        if(!invalidDate && !invalidHour){
            const currentDate = new Date().getTime();
            const year = new Date().getFullYear();

            const dateGame = new Date(year, (Number(month) - 1), Number(day), Number(hour), Number(minute)).getTime() >= currentDate
                ? new Date(year, (Number(month) - 1), Number(day), Number(hour), Number(minute))
                : new Date(year + 1, (Number(month) - 1), Number(day), Number(hour), Number(minute));
            
            const dateAlarm = new Date(year, (Number(month) - 1), Number(day), Number(hour), Number(minute)).getTime() >= currentDate
                ? new Date(year, (Number(month) - 1), Number(day), Number(hour), (Number(minute) - 15))
                : new Date(year + 1, (Number(month) - 1), Number(day), Number(hour), (Number(minute) - 15));

            const diffGame = Math.abs(dateGame.getTime() - currentDate)
            const diffAlarm = Math.abs(dateAlarm.getTime() - currentDate);

            const secondsForGame = Math.ceil(diffGame / 1000)
            const secondsForAlarm = Math.ceil(diffAlarm / 1000);

            let minutes: number;
            if((secondsForGame / 60) <= 1) minutes = 1;
            else if((secondsForGame / 60) > 1 || (secondsForGame / 60) <= 5) minutes = 5;
            else if((secondsForGame / 60) > 5 || (secondsForGame / 60) <= 10) minutes = 10;
            else  minutes = 15;
            

            const newAlert = {
                content: {
                title: `Ta na hora de jogar no ${guild.name}! ????`,
                body: `Sua partida come??a em menos de ${minutes}min!`,
                data: { data: 'goes here' },
                },
                trigger: { seconds: secondsForAlarm < 60 ? 60 : secondsForAlarm },
            }

            console.log(secondsForAlarm);
                
            const dateFormatted = format(dateGame, "dd/MM ' ??s ' HH:mm", { locale: ptBR } );
            
            const newId = String(uuid.v4());
            const newAppointment: AppointmentProps = {
                id: newId,
                guild,
                category,
                date: dateGame,
                dateFormatted,
                description
            }
    
            const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
            const appointments = storage ? JSON.parse(storage) : [];

    
            await AsyncStorage.setItem(
                COLLECTION_APPOINTMENTS,
                JSON.stringify([...appointments, newAppointment])
            );

            await schedulePushNotification(newAlert);
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
                                    Dia e m??s
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
                                    Descri????o
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