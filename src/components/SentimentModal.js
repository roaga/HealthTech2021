import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, SafeAreaView, KeyboardAvoidingView, Modal} from 'react-native'
import {Feather} from "@expo/vector-icons";

import {uStyles, colors} from '../styles.js'
import {AI} from '../scripts/AI'

export default SentimentModal = (props) => {
    const [input, setInput] = useState("TEST STRING");
    useEffect(() => {
        AI.analyzeSentiment("I love this awesome freaking intelligent smart workout app");
    }, []);

    return (
        <View style={uStyles.modal}>
            <TouchableOpacity onPress={async () => {
                let res = await AI.analyzeSentiment(input);
                // TODO: save res in backend

                props.close();
            }} style={{alignSelf: 'flex-end', marginRight: 12, marginTop: 12}}>
                <Feather name="x" size={32} color={colors.black}/>
            </TouchableOpacity>

            <Text style={[uStyles.title, {color: colors.black, marginTop: 32}]}>How are you feeling?</Text>
            <Text style={[uStyles.header, {color: colors.black, marginTop: 4}]}>(in one sentence)</Text>

            <TextInput 
                style={[uStyles.input, {height: "50%", margin: 16, marginTop: 32, paddingTop: 16}]}
                multiline={true}
            />
            
        </View>
    );
}
