import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView, FlatList, Modal} from 'react-native'
import {StatusBar} from 'expo-status-bar';
import {Feather} from "@expo/vector-icons";
import * as Reanimatable from 'react-native-animatable';

import {uStyles, colors} from '../styles.js'
import ProfileModal from '../components/ProfileModal.js';

export default ExploreScreen = () => {
    const [searchText, setSearchText] = useState("");
    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const [userIndex, setUserIndex] = useState(0);

    useEffect(() => {
        // get data, TODO: replace all tempData with state variable
    }, []);

    const renderCauseItem = ({item}) => {
        return (
            <SearchCard user={null} isCause={true} cause={item} toggleFollowing={() => toggleFollowingCause()} getFollowing={() => isFollowingCause()} visitProfile={visitProfile}/>
        );
    }

    const renderUserItem = ({item, index}) => {
        return (
            <SearchCard user={item} isCause={false} cause={null} toggleFollowing={() => toggleFollowingUser()} getFollowing={() => isFollowingUser()}
                visitProfile={() => {
                    setUserIndex(index);
                    visitProfile();
                }}
            />
        );
    }

    const toggleFollowingCause = (cause) => {
        //TODO
    }

    const toggleFollowingUser = (user) => {
        //TODO
    }

    const isFollowingCause = (cause) => {
        //TODO
    }

    const isFollowingUser = (user) => {
        //TODO
    }

    const visitProfile = () => {
        setProfileModalVisible(!profileModalVisible);
    }

    const tempUserData = [
        {username: "Aritro", uid: "8301u410", pfpUrl: "default", causes: ["Environment"], points: 32},
        {username: "Hane", uid: "238823", pfpUrl: "default", causes: ["Environment"], points: 33},
    ];

    const tempCausesData = [
        "Environment",
        "Fitness"
    ]

    return (
        <View style={styles.container}>
            
            <TextInput 
                style={[uStyles.input, {width: "85%", marginTop: 96, alignSelf: "center",}]} 
                placeholder={"Search..."}
                placeholderTextColor={colors.light}
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
                maxLength={2000}
            />

            <Reanimatable.View animation="slideInUp" duration={500}>
                <View style={uStyles.searchCard}>
                    <Text style={[uStyles.header, {marginTop: 4, color: colors.black, paddingBottom: 8}]}>Causes</Text>

                    <FlatList
                        data={tempCausesData.filter(str => str.includes(searchText))}
                        renderItem={renderCauseItem}
                        keyExtractor={(item) => item}
                        style={{flex: 1, height: "100%", paddingTop: 32}}
                        contentContainerStyle={{paddingBottom: 12}}
                        showsVerticalScrollIndicator={false}
                        removeClippedSubviews={true} // Unmount components when outside of window 
                        initialNumToRender={2} // Reduce initial render amount
                        maxToRenderPerBatch={1} // Reduce number in each render batch
                    />
                </View>

                <View style={uStyles.searchCard}>
                    <Text style={[uStyles.header, {marginTop: 4, color: colors.black, paddingBottom: 8}]}>Top Contributors</Text>

                    <FlatList
                        data={tempUserData.filter(user => user.username.includes(searchText))}
                        renderItem={renderUserItem}
                        keyExtractor={(item) => item.uid.toString()}
                        style={{flex: 1, height: "100%", paddingTop: 32}}
                        contentContainerStyle={{paddingBottom: 12}}
                        showsVerticalScrollIndicator={false}
                        removeClippedSubviews={true} // Unmount components when outside of window 
                        initialNumToRender={2} // Reduce initial render amount
                        maxToRenderPerBatch={1} // Reduce number in each render batch
                    />
                </View>
            </Reanimatable.View>

            <Modal
                animationType="slide" 
                visible={profileModalVisible} 
                onRequestClose={() => visitProfile()}
                transparent={true}
            >
                <ProfileModal 
                    user={userIndex !== undefined ? tempUserData[userIndex].uid : ""}
                    username={userIndex !== undefined ? tempUserData[userIndex].username : ""}
                    close={() => visitProfile()}
                />
            </Modal>

            <View style={uStyles.topBar}>
                <Text style={[uStyles.title, {color: colors.primary, textAlign: 'left', marginTop: 32}]}>Explore</Text>
            </View>

            <StatusBar style="light" />
        </View>
    );
}

const SearchCard = (props) => {
    let icon = ""
    if (props.isCause) {
        switch (props.cause) {
            case "Environment":
                icon = "globe";
                break;
            case "Fitness":
                icon = "activity";
                break;
            default:
                icon = "list";
        }
    }

    return (
        <View style={[uStyles.commentCard, {flexDirection: "row", alignItems: "center", width: "100%", backgroundColor: colors.light, alignSelf: "center", marginTop: 4}]}>
            {props.isCause ? 
                <Feather name={icon} size={24} color={colors.primary} style={{marginTop: 0, marginRight: 8}}/>
            :
                <View style={[uStyles.pfpBubble, {width: 32, height: 32, marginTop: 0, marginRight: 8, shadowColor: colors.primary}]}>
                    <ImageBackground 
                        style={[uStyles.pfp, {width: 32, height: 32}]}
                        source={
                            props.user.pfpUrl === "default" ?
                            require("../../assets/defaultProfilePhoto.png")
                            : {uri: props.user.pfpUrl}
                        }
                    />
                </View>
            }

            <TouchableOpacity onPress={() => {if (!props.isCause) { props.visitProfile(); }}}>
                <Text style={[uStyles.body, {color: colors.black}]}>{props.isCause ? props.cause : props.user.username}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{position: "absolute", right: 12}} onPress={() => props.toggleFollowing()}>
                <Feather name="heart" size={24} color={props.getFollowing() ? colors.primary : colors.dark}/>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark,
    },
});