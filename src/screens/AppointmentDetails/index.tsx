import React, { useEffect, useState } from 'react';
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import {
    Alert,
    ImageBackground,
    Text,
    View,
    FlatList,
    Share,
    Platform
} from 'react-native';
import { useRoute } from '@react-navigation/native';

import { styles } from './styles';
import {
    Background,
    Header,
    ListHeader,
    Member,
    MemberProps,
    ListDivider,
    ButtonIcon,
    AppointmentProps,
    Load
} from '../../components';
import { theme } from '../../global/styles/theme';
import BannerPng from '../../assets/banner.png';
import { api } from '../../services/api';


interface Params{
    guildSelected: AppointmentProps;
}

interface GuildWidget{
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
    resence_count: number;
}

export function AppointmentDetails(){
    const [ widget, setWidget ] = useState<GuildWidget>({} as GuildWidget);
    const [ loading, setLoading ] = useState(true)

    const route = useRoute();
    const { guildSelected } = route.params as Params;

    async function fetchGuildWidget(){
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);

        } catch {
            Alert.alert("Widget não encontrado", "Verifique as configurações do servidor.");
        } finally {
            setLoading(false);
        }
    }

    function handleShareInvitation(){
        const message = Platform.OS === 'ios'
            ? `Junte-se a ${guildSelected.guild.name}`
            : widget.instant_invite;

            Share.share({
                message,
                url: widget.instant_invite
            });
    }

    useEffect(() => {
        fetchGuildWidget();
    }, [])

    return (
        <Background>
            <Header 
                title="Detalhes"
                action={
                    guildSelected.guild.owner &&
                    <BorderlessButton onPress={handleShareInvitation}>
                        <Fontisto 
                            name="share"
                            size={24}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />

            <ImageBackground
                source={BannerPng}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        { guildSelected.guild.name }
                    </Text>

                    <Text style={styles.subtitle}>
                        { guildSelected.description }
                    </Text>
                </View>
            </ImageBackground>
            {
                loading
                ?   <Load />
                :   <>
                        <ListHeader 
                            title="Jogadores"
                            subtitle={`Total ${widget.members ? widget.members.length : '-'}`}
                        />

                        <FlatList 
                            data={widget.members}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <Member data={item} />
                            )}
                            ItemSeparatorComponent={() => <ListDivider isCentered />}
                            style={styles.members}
                        />
                    </>
            }    

            <View style={styles.footer}>
                <ButtonIcon 
                    title="Entrar na partida"
                />
            </View>

        </Background>
    );
}