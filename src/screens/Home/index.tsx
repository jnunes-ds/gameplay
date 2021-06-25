import React, { useState, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {
    Profile,
    ButtonAdd,
    CategorySelect,
    ListHeader,
    Appointment,
    AppointmentProps,
    ListDivider,
    Background,
    Load
} from '../../components';


import { styles } from './styles';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

export function Home(){
    const [category, setCategory] = useState('');
    const [ loading, setLoading ] = useState(true);
    const [ appointments, setAppointments ] = useState<AppointmentProps[]>([] as AppointmentProps[]);

    const navigation = useNavigation();

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails(){
        navigation.navigate('AppointmentDetails');
    }

    function handleAppointmentCreate(){
        navigation.navigate('AppointmentCreate');
    }

    async function loadAppointments(){
        const response =  await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage : AppointmentProps[] = response 
            ? JSON.parse(response) : [];
        
            if(category){
                setAppointments(storage.filter(item => item.category === category));
            }else{
                setAppointments(storage);
            }

            setLoading(false);
    }

    // async function removeAllAppointments(){
    //     await AsyncStorage.removeItem(COLLECTION_APPOINTMENTS);
    // }

    useFocusEffect(useCallback(() => {
        loadAppointments();
        // removeAllAppointments();
    }, [category]));

    return (
        <Background>
            <View
                style={styles.Container}
            >
                <View style={styles.header} >
                    <Profile />
                    <ButtonAdd 
                        onPress={handleAppointmentCreate}
                    />
                </View>

                <CategorySelect 
                    categorySelected={category}
                    setCategory={handleCategorySelect}
                />
                {
                    loading
                    ?   <Load />
                    :   <>
                            <ListHeader 
                                title="Partidas agendadas"
                                subtitle="Total 6"
                            />
                            <FlatList 
                                data={appointments}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <Appointment 
                                        data={item}
                                        onPress={handleAppointmentDetails}
                                    />
                                )}
                                ItemSeparatorComponent={() => <ListDivider />}
                                contentContainerStyle={{ paddingBottom: 69 }}
                                style={styles.matches}
                                showsVerticalScrollIndicator={false}
                            />
                        </>
                }

            </View>
            
        </Background>
    );
}