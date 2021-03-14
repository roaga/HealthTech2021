import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Modal, Alert, KeyboardAvoidingView, ScrollView} from 'react-native'
import {StatusBar} from 'expo-status-bar';
import {Feather} from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker';

import {uStyles, colors} from '../styles.js'
import {ImageUpload} from '../scripts/ImageUpload'
import PostCard from "../components/PostCard"
import CameraModal from '../components/CameraModal.js';
import {AI} from '../scripts/AI'

export default PostScreen = () => {
    const [post, setPost] = useState({id: "", username: "", uid: "", imageUrl: "", link: "", caption: "", type: "", cause: "", likes: 0, profileVisits: 0, shares: 0, comments: []});
    const [camVisible, setCamVisible] = useState(false);

    useEffect(() => {
        AI.analyzeSentiment("I love this awesome freaking intelligent smart workout app");
    }, []);

    const sendPost = async () => {
        if (post.imageUrl.length > 0 && post.cause.length > 0) {
            Alert.alert(
            "Make a post",
                "Are you sure you want to post this?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                    onPress: () => {return;}
                  },
                  {
                    text: "OK",
                  }
                ]
            );
            //TODO: add user info
            let toPost = {...post};
            toPost.caption = toPost.caption.trim();
            if (toPost.caption.length === 0) {
                toPost.link = "";
            }
            //TODO: upload
            
        } else {
            Alert.alert("You need an image and a tag!")
        }
    }

    const addPostPhoto = async () => {
        const uri = await ImageUpload.addPhoto();
        if (uri) {
            let newPost = {...post};
            newPost.imageUrl = uri;
            setPost(newPost);
        }
        //TODO: on upload, Firebase needs to create a new URL (not URI) to replace this local value
    }

    const takePostPhoto = async (camera) => {
        const uri = await ImageUpload.takePhoto(camera);
        if (uri) {
            let newPost = {...post};
            newPost.imageUrl = uri;
            setPost(newPost);
        }
        //TODO: on upload, Firebase needs to create a new URL (not URI) to replace this local value
    }

    const linkInput = () => {
        if (post.caption.length > 0) {
            Alert.prompt(
                "Enter link",
                "Enter a link you want your post to lead to.",
                [
                  {
                    text: "Cancel",
                    style: "cancel"
                  },
                  {
                    text: "OK",
                    onPress: text => {
                        let newPost = {...post};
                        newPost.link = text;
                        setPost(newPost);
                    }
                  },
                  {
                    text: 'Clear',
                    onPress: () => {
                        let newPost = {...post};
                        newPost.link = "";
                        setPost(newPost);
                    }
                  },
                ],
              );
        } else {
            Alert.alert(
                "Enter link",
                "You need a caption before you can add a link.",
                [
                  {
                    text: "OK",
                    style: "OK"
                  },
                ],
              );
        }
    }

    const toggleCamModal = () => {
        setCamVisible(!camVisible);
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={"padding"}>
                <ScrollView style={{marginTop: 96, paddingBottom: 96, overflow: "hidden",}}>
                    <PostCard post={post}/>

                    <TextInput 
                        style={[uStyles.input, {width: "85%", marginTop: 12, alignSelf: "center",}]} 
                        placeholder={"Add a caption..."}
                        placeholderTextColor={colors.light}
                        onChangeText={text => {
                            let newPost = {...post};
                            newPost.caption = text;
                            setPost(newPost);
                        }}
                        value={post.caption}
                        maxLength={2000}
                    />

                    <View style={{flexDirection: "row", marginTop: 12, alignItems: "center", justifyContent: "center"}}>
                        <Feather name="link" size={18} color={colors.light} style={{marginHorizontal: 8, alignSelf: "center"}}/>
                        <Text style={uStyles.message}>{post.link}</Text>
                    </View>

                    <View style={{marginBottom: 256, alignItems: "center"}}>
                        <DropDownPicker
                            items={[
                                {label: "Fitness", value: "fitness", icon: () => <Feather name="activity" size={18} color={colors.primary}/>},
                                {label: "Environment", value: "environment", icon: () => <Feather name="globe" size={18} color={colors.primary}/>},
                            ]}
                            containerStyle={{height: 32, width: 160, marginTop: 12}}
                            style={{backgroundColor: colors.light, borderWidth: 0, flexDirection: "row-reverse", borderTopRightRadius: 10, borderTopLeftRadius: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10}}
                            dropDownStyle={{backgroundColor: colors.light, borderWidth: 0, height: 512, borderBottomRightRadius: 10, borderBottomLeftRadius: 10}}
                            itemStyle={{justifyContent: "flex-start", textAlign: "right"}}
                            activeItemStyle={{backgroundColor: colors.primary, borderRadius: 10}}
                            globalTextStyle={[uStyles.body, {color: colors.dark}]}
                            onChangeItem={item => {
                                let newPost = {...post};
                                newPost.cause = item.label;
                                setPost(newPost);
                            }}
                            autoScrollToDefaultValue
                            searchable
                            searchablePlaceholder={"Search..."}
                            searchableStyle={{borderRadius: 20}}
                        />
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

            <View style={uStyles.roundButtonArray}>
                <TouchableOpacity style={uStyles.roundButton} onPress={() => toggleCamModal()}>
                    <Feather name="camera" size={24} color={colors.white}/>
                </TouchableOpacity>
                <TouchableOpacity style={uStyles.roundButton} onPress={() => addPostPhoto()}>
                    <Feather name="image" size={24} color={colors.white}/>
                </TouchableOpacity>
                <TouchableOpacity style={uStyles.roundButton} onPress={() => linkInput()}>
                    <Feather name="link" size={24} color={post.link.length > 0 ? colors.primary : colors.white}/>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide" 
                visible={camVisible} 
                onRequestClose={() => toggleCamModal()}
                transparent={true}
            >
                <CameraModal close={() => toggleCamModal()} takePhoto={() => takePostPhoto()}/>
            </Modal>

            <View style={uStyles.topBar}>
                <Text style={[uStyles.title, {color: colors.primary, textAlign: 'left', marginTop: 32}]}>Contribute</Text>
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={{alignItems: "right", marginTop: 32, marginLeft: 16}} onPress={() => sendPost()}>
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