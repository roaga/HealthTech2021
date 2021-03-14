import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, SafeAreaView, KeyboardAvoidingView, Modal} from 'react-native'
import {Feather} from "@expo/vector-icons";

import {uStyles, colors} from '../styles.js'

export default SentimentModal = (props) => {
    const [input, setInput] = useState("");

    return (
        <View style={uStyles.modal}>
            <TouchableOpacity onPress={props.close} style={{alignSelf: 'flex-end', marginRight: 12, marginTop: 12}}>
                <Feather name="x" size={32} color={colors.black}/>
            </TouchableOpacity>

            <Text>Measure sentiment here</Text>
            
        </View>
    );
}
