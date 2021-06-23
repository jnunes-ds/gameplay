import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import {
    Text,
    View,
} from 'react-native';

import {
    Background,
    Header,
    CategorySelect,
    GuildIcon,
    SmallInput
} from '../../components';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';


export function AppointmentCreate(){
    const [category, setCategory] = useState('');

    return (
        <Background>
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
            </View>

        </Background>
    );
}