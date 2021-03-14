import React, { useEffect, useState, useContext } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Modal, Alert, KeyboardAvoidingView, ScrollView} from 'react-native'
import {StatusBar} from 'expo-status-bar';
import {Feather} from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker';
import * as Reanimatable from 'react-native-animatable';

import {uStyles, colors} from '../styles.js'
import {ImageUpload} from '../scripts/ImageUpload'
import PostCard from "../components/PostCard"
import CameraModal from '../components/CameraModal.js';
import {FirebaseContext} from "../context/FirebaseContext"
import {getQuote} from '../scripts/quoteGetter'
import {AI} from '../scripts/AI'
import {TestDB} from '../scripts/TestDB'

export default PostScreen = () => {
    const [todo, setTodo] = useState({id: "", uid: "", quantity: "", exercise: "", day: "", time: "", place: "", completed: false});
    const [goal, setGoal] = useState({id: "", uid: "", goal: "", day: "", completed: false});
    const [todoOverGoal, setTodoOverGoal] = useState(true);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        AI.analyzeSentiment("I love this awesome freaking intelligent smart workout app");
        getQuote.giveQuote("test");
    }, []);

    const sendTodo = () => {
        // todo: call backend
        setTodo({id: "", uid: "", quantity: "", exercise: "", day: "", time: "", place: ""});
    }

    const flip = () => {
        setTodoOverGoal(!todoOverGoal);
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={"padding"}>
                <ScrollView style={{marginTop: 96, paddingBottom: 96, overflow: "hidden",}}>
                    <Reanimatable.View animation="slideInUp" duration={500}>
                    <View style={[uStyles.postCard, {height: "70%"}]}>
                        <Text style={[uStyles.header, {color: colors.black, marginTop: 32}]}>{todoOverGoal ? "I will do" : "I will"}</Text>
                        <TextInput 
                            style={[uStyles.input, {width: "85%", marginTop: 0, alignSelf: "center", backgroundColor: colors.light, color: colors.black, textAlign: "center"}]} 
                            placeholder={todoOverGoal ? "enter a quantity..." : "enter a goal..."}
                            placeholderTextColor={colors.dark}
                            onChangeText={text => {
                                if (todoOverGoal) {
                                    let newPost = {...todo};
                                    newPost.quantity = text;
                                    setTodo(newPost);
                                } else {
                                    let newPost = {...goal};
                                    newPost.goal = text;
                                    setGoal(newPost);
                                }
                            }}
                            value={todo.quantity}
                            maxLength={2000}
                        />

                        <Text style={[uStyles.header, {color: colors.black, marginTop: 16}]}>{todoOverGoal ? "of" : "by"}</Text>
                        <TextInput 
                            style={[uStyles.input, {width: "85%", marginTop: 0, alignSelf: "center", backgroundColor: colors.light, color: colors.black, textAlign: "center"}]} 
                            placeholder={"enter an exercise..."}
                            placeholderTextColor={colors.dark}
                            onChangeText={text => {
                                if (todoOverGoal) {
                                    let newPost = {...todo};
                                    newPost.exercise = text;
                                    setTodo(newPost);
                                } else {
                                    let newPost = {...goal};
                                    newPost.day = text;
                                    setGoal(newPost);
                                }
                            }}
                            value={todo.exercise}
                            maxLength={2000}
                        />

                        {todoOverGoal ?
                            <View>
                            <Text style={[uStyles.header, {color: colors.black, marginTop: 16}]}>on</Text>
                            <TextInput 
                                style={[uStyles.input, {width: "85%", marginTop: 0, alignSelf: "center", backgroundColor: colors.light, color: colors.black, textAlign: "center"}]} 
                                placeholder={"enter a day..."}
                                placeholderTextColor={colors.dark}
                                onChangeText={text => {
                                    let newPost = {...todo};
                                    newPost.day = text;
                                    setTodo(newPost);
                                }}
                                value={todo.day}
                                maxLength={2000}
                            />
    
                            <Text style={[uStyles.header, {color: colors.black, marginTop: 16}]}>at</Text>
                            <TextInput 
                                style={[uStyles.input, {width: "85%", marginTop: 0, alignSelf: "center", backgroundColor: colors.light, color: colors.black, textAlign: "center"}]} 
                                placeholder={"enter a time..."}
                                placeholderTextColor={colors.dark}
                                onChangeText={text => {
                                    let newPost = {...todo};
                                    newPost.time = text;
                                    setTodo(newPost);
                                }}
                                value={todo.time}
                                maxLength={2000}
                            />
    
                            <Text style={[uStyles.header, {color: colors.black, marginTop: 16}]}>in</Text>
                            <TextInput 
                                style={[uStyles.input, {width: "85%", marginTop: 0, alignSelf: "center", backgroundColor: colors.light, color: colors.black, textAlign: "center"}]} 
                                placeholder={"enter a place..."}
                                placeholderTextColor={colors.dark}
                                onChangeText={text => {
                                    let newPost = {...todo};
                                    newPost.place = text;
                                    setTodo(newPost);
                                }}
                                value={todo.place}
                                maxLength={2000}
                            />
                            </View>
                        :
                            null
                        }
                    </View>
                    <View style={{marginBottom: 256, alignItems: "center"}}>

                    </View>
                    </Reanimatable.View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={uStyles.roundButtonArray}>
                <TouchableOpacity style={uStyles.roundButton} onPress={() => flip()}>
                    <Feather name="refresh-ccw" size={24} color={colors.white}/>
                </TouchableOpacity>
            </View>

            {/* <Modal
                animationType="slide" 
                visible={camVisible} 
                onRequestClose={() => toggleCamModal()}
                transparent={true}
            >
                <CameraModal close={() => toggleCamModal()} takePhoto={() => takePostPhoto()}/>
            </Modal> */}

            <View style={uStyles.topBar}>
                <Text style={[uStyles.title, {color: colors.primary, textAlign: 'left', marginTop: 32}]}>{todoOverGoal ? "Plan a Workout" : "Plan a Goal"}</Text>
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={{alignItems: "right", marginTop: 32, marginLeft: 16}} onPress={() => sendTodo()}>
                            <Feather name="send" size={24} color={colors.white}/>
                    </TouchableOpacity>
                </View>
            </View>

            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark,
    },
});