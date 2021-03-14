import React, {useState, useEffect, useContext} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, FlatList, Modal, ScrollView} from 'react-native'
import {StatusBar} from 'expo-status-bar';
import {Feather} from "@expo/vector-icons";
import * as Reanimatable from 'react-native-animatable';

import {uStyles, colors} from '../styles.js'
import {FirebaseContext} from "../context/FirebaseContext"
import checkIfFirstLaunch from '../scripts/CheckFirstLaunch';
import SentimentModal from '../components/SentimentModal.js';

export default FeedScreen = () => {
    const firebase = useContext(FirebaseContext);
    const [upNext, setUpNext] = useState([]);
    const [goals, setGoals] = useState([]);
    const [onboardingVisible, setOnboardingVisible] = useState(false);    
    const [sentimentModalVisible, setSentimentModalVisible] = useState(false);

    useEffect(() => {
        const getTodosGoals = async () => {
            await firebase.getTodos().then(res => {
                setUpNext(res.filter(item => !item.data.completed));
            });
            await firebase.getGoals().then((res) => {
                setGoals(res.filter(item => !item.data.completed));
            });
        }
        getTodosGoals();

        const getIsFirstLaunch = async () => {
            const isFirstLaunch = await checkIfFirstLaunch();
            setOnboardingVisible(isFirstLaunch);
        }
        getIsFirstLaunch();
    }, []);

    const toggleOnboarding = () => {
        setOnboardingVisible(!onboardingVisible);
    }


    const toggleTodoComplete = (index) => {
        let newUpNext = [...upNext];
        newUpNext[index].data.completed = !newUpNext[index].data.completed;
        setUpNext(newUpNext);
        if (newUpNext[index].data.completed) {
            toggleSentimentModal();
        }

        //update backend
        firebase.editTodo(newUpNext[index]);
    }
    const toggleGoalComplete = (index) => {
        let newGoals = [...goals];
        newGoals[index].data.completed = !newGoals[index].data.completed;
        setGoals(newGoals);
        // if (newGoals[index].completed) {
        //     toggleSentimentModal();
        // }

        //update backend
        firebase.editGoal(newGoals[index]);
    }

    const toggleSentimentModal = () => {
        setSentimentModalVisible(!sentimentModalVisible);
    }

    const renderTodo = (item, index) => {
        return (
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={() => {
                    toggleTodoComplete(index); 
                }}>
                    <Feather name={item.data.completed ? "check-circle" : "circle"} color={colors.dark} size={32}/>
                </TouchableOpacity>
                <Text style={[uStyles.body, {color: colors.black, paddingHorizontal: 16}]}>{"I will do " + item.data.quantity + " of " + item.data.exercise + " on " + item.data.day + " at " + item.data.time + " in " + item.data.place + "."}</Text>
            </View>
        )
    }

    const renderGoal = (item, index) => {
        return (
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={() => {
                    toggleGoalComplete(index); 
                }}>
                    <Feather name={item.data.completed ? "check-circle" : "circle"} color={colors.dark} size={32}/>
                </TouchableOpacity>
                <Text style={[uStyles.body, {color: colors.black, paddingHorizontal: 16}]}>{"I will be able to " + item.data.goal + " by " + item.data.day + "."}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <Reanimatable.View animation="slideInUp" duration={500}>
                <View style={[uStyles.searchCard, {marginTop: 108, height: 300}]}>
                    <Text style={[uStyles.header, {marginTop: 4, color: colors.black, paddingBottom: 8}]}>Up Next</Text>
                    
                    <FlatList
                        data={upNext}
                        renderItem={({item, index}) => renderTodo(item, index)}
                        keyExtractor={(item) => item.id}
                        style={{flex: 1, height: "100%", paddingTop: 12}}
                        contentContainerStyle={{paddingBottom: 12}}
                        showsVerticalScrollIndicator={false}
                    />
                    
                </View>
            </Reanimatable.View>

            <Reanimatable.View animation="slideInUp" duration={500}>
                <View style={[uStyles.searchCard, {marginTop: 12, height: 300}]}>
                    <Text style={[uStyles.header, {marginTop: 4, color: colors.black, paddingBottom: 8}]}>All Planned</Text>
                    
                    <FlatList
                        data={goals}
                        renderItem={({item, index}) => renderGoal(item, index)}
                        keyExtractor={(item) => item.id}
                        style={{flex: 1, height: "100%", paddingTop: 12}}
                        contentContainerStyle={{paddingBottom: 12}}
                        showsVerticalScrollIndicator={false}
                    />
                    
                </View>
            </Reanimatable.View>
{/* 
            <View style={uStyles.roundButtonArray}>
                <Text style={[uStyles.body, {color: colors.primary, textAlign: 'center'}]}>{recentPoints ? "+" + recentPoints + "!" : ""}</Text>

                <TouchableOpacity style={uStyles.roundButton} onPress={() => toggleLikePost(postIndex)}>
                    <Feather name="heart" size={24} color={postIndex !== undefined && liked[postIndex] === true ? colors.primary : colors.white}/>
                    <Text style={[uStyles.message, {fontSize: 8}]}>{postIndex !== undefined ? tempData[postIndex].likes : "-"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={uStyles.roundButton} onPress={() => toggleComments(postIndex)}>
                    <Feather name="message-square" size={24} color={colors.white}/>
                    <Text style={[uStyles.message, {fontSize: 8}]}>{postIndex !== undefined ? tempData[postIndex].comments.length : "-"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={uStyles.roundButton} onPress={() => visitProfile(postIndex)}>
                    <Feather name="user" size={24} color={colors.white}/>
                    <Text style={[uStyles.message, {fontSize: 8}]}>{postIndex !== undefined ? tempData[postIndex].profileVisits : "-"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={uStyles.roundButton} onPress={() => sharePost(postIndex)}>
                    <Feather name="share" size={24} color={colors.white}/>
                    <Text style={[uStyles.message, {fontSize: 8}]}>{postIndex !== undefined ? tempData[postIndex].shares : "-"}</Text>
                </TouchableOpacity>
            </View> */}

            <View style={uStyles.topBar}>
                <Text style={[uStyles.title, {color: colors.primary, textAlign: 'left', marginTop: 32}]}>Stick to It!</Text>
                {/* <View style={{flexDirection: "row"}}>
                    <DropDownPicker
                        items={[
                            {label: "For You", value: "foryou", icon: () => <Feather name="list" size={18} color={colors.primary}/>},
                            {label: "Fitness", value: "fitness", icon: () => <Feather name="activity" size={18} color={colors.primary}/>},
                            {label: "Environment", value: "environment", icon: () => <Feather name="globe" size={18} color={colors.primary}/>},
                        ]}
                        defaultValue={category}
                        containerStyle={{height: 32, width: 160, marginTop: 32}}
                        style={{backgroundColor: colors.black, color: colors.white, borderWidth: 0, flexDirection: "row-reverse"}}
                        dropDownStyle={{backgroundColor: colors.black, borderWidth: 0, height: 512, borderBottomRightRadius: 10, borderBottomLeftRadius: 10}}
                        itemStyle={{justifyContent: "flex-start", textAlign: "right"}}
                        activeItemStyle={{backgroundColor: colors.primary, borderRadius: 10}}
                        globalTextStyle={uStyles.body}
                        onChangeItem={item => setCategory(item.value)}
                        autoScrollToDefaultValue
                        searchable
                        searchablePlaceholder={"Search..."}
                        searchableStyle={{borderRadius: 20}}
                    />
                </View> */}
            </View>

            <Modal
                animationType="slide" 
                visible={sentimentModalVisible} 
                onRequestClose={() => toggleSentimentModal()}
                transparent={true}
            >
                <SentimentModal close={() => toggleSentimentModal()}/>
            </Modal>

            {/* <Modal
                animationType="slide" 
                visible={profileModalVisible} 
                onRequestClose={() => visitProfile()}
                transparent={true}
            >
                <ProfileModal 
                    user={postIndex !== undefined ? tempData[postIndex].uid : ""}
                    username={postIndex !== undefined ? tempData[postIndex].username : ""}
                    close={() => visitProfile()}
                />
            </Modal> */}

            <Modal
                animationType="slide" 
                visible={onboardingVisible} 
                onRequestClose={() => toggleOnboarding()}
                transparent={true}
            >
                <OnboardingModal close={() => toggleOnboarding()}/>
            </Modal>

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
