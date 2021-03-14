import React, {useContext, useEffect, useState} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView, FlatList, Modal} from 'react-native'
import {Feather} from "@expo/vector-icons";

import {uStyles, colors} from '../styles.js'
import {FirebaseContext} from "../context/FirebaseContext"
import { UserContext } from '../context/UserContext'
import PostCard from '../components/PostCard'
import {ImageUpload} from '../scripts/ImageUpload'
import OnboardingModal from '../components/OnboardingModal.js';
import NotificationsModal from '../components/NotificationsModal'
import SettingsModal from '../components/SettingsModal.js';

export default ProfileScreen = () => {
    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);
    const [userData, setUserData] = useState();
    const [onboardingVisible, setOnboardingVisible] = useState(false);
    const [settingsVisible, setSettingsVisiible] = useState(false);
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState(false);

    useEffect(() => {
        //get user data, posts, and set it with state
        
    }, []);

    // const tempData = [
    //     {id: "141415252", username: "Aritro", uid: "8301u410", imageUrl: "houar", link: "https://expo.io", caption: "uaohfauwf", type: "Volunteering", cause: "Environment", likes: 32, profileVisits: 10, shares: 2, comments: [{id: "23804u2309", username: "Rohan", uid: "owrhf", text: "oierjhe"},]},
    //     {id: "1414152523", username: "Hane", uid: "238823", imageUrl: "ref", link: "", caption: "fefe", type: "Volunteering", cause: "Environment", likes: 33, profileVisits: 3, shares: 12, comments: [{id: "2049230942", username: "Rohan", uid: "owrhf", text: "oierjhe"},]},
    // ];

    const toggleOnboarding = () => {
        setOnboardingVisible(!onboardingVisible);
    }

    const toggleNotifications = () => {
        setNotificationsVisible(!notificationsVisible);
    }

    const toggleSettings = () => {
        setSettingsVisiible(!settingsVisible);
    }

    const renderPost = ({item}) => {
        return (
            <PostCard post={item} isOwn/>
        )
    }

    const addPostPhoto = async () => {
        const uri = await ImageUpload.addPhoto();
        if (uri) {
            let url = await firebase.uploadProfilePhoto(uri);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{marginTop: 64}}>
                <TouchableOpacity style={[uStyles.pfpBubble, {alignSelf: "center"}]} onPress={() => addPostPhoto()}>
                    <ImageBackground 
                        style={uStyles.pfp}
                        source={
                            user.profilePhotoUrl === "default" ?
                            require("../../assets/defaultProfilePhoto.png")
                            : {uri: user.profilePhotoUrl}
                        }
                    />
                </TouchableOpacity>
                <Text style={[uStyles.header, {marginTop: 16}]}>{user.username}</Text>

                {/* <View style={{alignItems: "center", marginTop: 16, flexDirection: "row", justifyContent: "space-between"}}>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <Text style={uStyles.subheader}>{userData ? userData.posts.length : "-"}</Text>
                        <Text style={uStyles.body}>Posts</Text>
                    </View>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <Text style={uStyles.subheader}>{userData ? userData.points : "-"}</Text>
                        <Text style={uStyles.body}>Points</Text>
                    </View>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <Text style={uStyles.subheader}>{userData ? userData.causes.length : "-"}</Text>
                        <Text style={uStyles.body}>Causes</Text>
                    </View>
                </View> */}

                {/* <View>
                    <FlatList
                        data={tempData}
                        renderItem={renderPost}
                        keyExtractor={(item) => item.id.toString()}
                        style={{flex: 1, height: "100%", paddingTop: 32}}
                        contentContainerStyle={{paddingBottom: 192}}
                        showsVerticalScrollIndicator={false}
                        removeClippedSubviews={true} // Unmount components when outside of window 
                        initialNumToRender={2} // Reduce initial render amount
                        maxToRenderPerBatch={1} // Reduce number in each render batch
                    />
                </View> */}
            </ScrollView>

            <Modal
                animationType="slide" 
                visible={onboardingVisible} 
                onRequestClose={() => toggleOnboarding()}
                transparent={true}
            >
                <OnboardingModal close={() => toggleOnboarding()}/>
            </Modal>

            <Modal
                animationType="slide" 
                visible={notificationsVisible} 
                onRequestClose={() => toggleNotifications()}
                transparent={true}
            >
                <NotificationsModal close={() => toggleNotifications()}/>
            </Modal>

            <Modal
                animationType="slide" 
                visible={settingsVisible} 
                onRequestClose={() => toggleSettings()}
                transparent={true}
            >
                <SettingsModal close={() => toggleSettings()}/>
            </Modal>

            <View style={uStyles.topBar}>
                <Text style={[uStyles.title, {color: colors.primary, textAlign: 'left', marginTop: 32}]}>Profile</Text>
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={{alignItems: "right", marginTop: 32}} onPress={() => toggleOnboarding()}>
                        <Feather name="help-circle" size={24} color={colors.white}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems: "right", marginTop: 32, marginLeft: 16}} onPress={() => toggleSettings()}>
                        <Feather name="settings" size={24} color={colors.white}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems: "right", marginTop: 32, marginLeft: 16}} onPress={() => toggleNotifications()}>
                        <Feather name="bell" size={24} color={unreadNotifications ? colors.primary : colors.white}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark,
    },
});