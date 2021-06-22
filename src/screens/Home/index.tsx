import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
    Profile,
    ButtonAdd,
    CategorySelect
} from '../../components';

import { styles } from './styles';

export function Home(){
    const [category, setCategory] = useState('');

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    return (
        <View
            style={styles.Container}
        >
            <View style={styles.header} >
                <Profile />
                <ButtonAdd />
            </View>

            <View>
                <CategorySelect 
                    categorySelected={category}
                    setCategory={handleCategorySelect}
                />
                <View style={styles.content}>
                    
                </View>
            </View>

        </View>
    );
}