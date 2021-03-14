import React, {useRef, useState, useEffect} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView, FlatList} from 'react-native'
import {StatusBar} from 'expo-status-bar';
import * as Sharing from 'expo-sharing';
import {Feather} from "@expo/vector-icons";
import ViewShot from "react-native-view-shot";
import { BarChart, ProgressCircle, XAxis, Grid } from 'react-native-svg-charts'
import * as Reanimatable from 'react-native-animatable';
import { ProgressBar, Colors } from 'react-native-paper';
import {uStyles, colors} from '../styles.js'

export default GameScreen = () => {
    const view = useRef();

    const tempPointsData = [
        {
            cause: "Days",
            Streak: 50,
        },
    ]

    const fill = 'rgb(134, 65, 244)'

    const data = [50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80]

    const types = ['Streak'];

    useEffect(() => {
        // get milestone of month

        // get local milestones

        // generate new milestones if needed
    }, []);


    const sharePost = async () => {
        view.current.capture().then(uri => {
            Sharing.shareAsync(uri);
        });
    }

    const renderCauseItem = ({item}) => {
        return (
            <View style={[uStyles.commentCard, {flexDirection: "row", alignItems: "center", width: "100%", backgroundColor: colors.light, alignSelf: "center", marginTop: 4, height: 48}]}>
                <Feather name="award" size={24}/>
                <Text style={[uStyles.body, {color: colors.black}]}>{item.cause}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ViewShot ref={view} style={{height: "100%"}}>
                <ScrollView style={{marginTop: 98}} contentContainerStyle={{paddingBottom: 96}}>
                    <Reanimatable.View animation="slideInUp" duration={500}>
                        <View style={[uStyles.searchCard, {height: 400}]}>
                            <Text style={[uStyles.header, {marginTop: 4, color: colors.black, paddingBottom: 8}]}>Streak</Text>                   
                            <Text style={[uStyles.body, {alignSelf: "center", color: colors.black, marginTop: 16}]}>You have a {tempPointsData.map(item => (item.Streak)).reduce((a, b) => a + b)} day streak!</Text>
                            <Text></Text>
                            <Text></Text>
                            <View>
                                <ProgressCircle style={{ height: 150, marginTop: 16}} progress={0.5} progressColor={colors.primary}/>
                                <Text style={[uStyles.body,{color: colors.black, position: "absolute", top: "50%", alignSelf: "center"}]}>50</Text>
                            </View>
                            <Text></Text>
                            <Text style={{alignSelf: "center"}}>Streak Goal: 100 days</Text>
                            <FlatList
                                data={tempPointsData}
                                renderItem={renderCauseItem}
                                keyExtractor={(item) => item}
                                style={{flex: 1, height: "100%", paddingTop: 32}}
                                contentContainerStyle={{paddingBottom: 12}}
                                horizontal={true}
                                showsVerticalScrollIndicator={false}
                                removeClippedSubviews={true} // Unmount components when outside of window 
                                initialNumToRender={2} // Reduce initial render amount
                                maxToRenderPerBatch={1} // Reduce number in each render batch
                            />
                        </View>
                    </Reanimatable.View>
<<<<<<< Updated upstream
                    
                    <Reanimatable.View animation="slideInUp" duration={500}>
                        <View style={[uStyles.searchCard, {height: 754}]}>
                            <Text style={[uStyles.header, {marginTop: 4, color: colors.black, paddingBottom: 8}]}>Milestones</Text>

                            <View>
                                <ProgressCircle style={{ height: 250, marginTop: 12}} progress={0.7} progressColor={colors.primary}/>
                                <Text style={[uStyles.body,{color: colors.black, position: "absolute", top: "50%", alignSelf: "center"}]}>Milestone of the Month</Text>
                            </View>
                            <View>
                                <ProgressCircle style={{ height: 150, marginTop: 16}} progress={0.5} progressColor={colors.primary}/>
                                <Text style={[uStyles.body,{color: colors.black, position: "absolute", top: "50%", alignSelf: "center"}]}>Milestone 2</Text>
                            </View>
                            <View>
                                <ProgressCircle style={{ height: 150, marginTop: 16}} progress={0.6} progressColor={colors.primary}/>
                                <Text style={[uStyles.body,{color: colors.black, position: "absolute", top: "50%", alignSelf: "center"}]}>Milestone 3</Text>
                            </View>
                            
                            <Text style={[uStyles.body,{color: colors.black, alignSelf: "center", marginTop: 32}]}>Last completed milestone 4!</Text>
                            <Text style={[uStyles.body, {alignSelf: "center", color: colors.black, marginTop: 16}]}>32 milestones already reached!</Text>
                        </View>
                    </Reanimatable.View>
=======

                    <Reanimatable.View animation="slideInUp" duration={500}>
                        <View style={[uStyles.searchCard, {height: 340}]} animation="slideInUp" duration={500}>
                            <Text style={[uStyles.header, {marginTop: 4, color: colors.black, paddingBottom: 8}]}>Up Next (Bullets incoming)</Text>
                            <Text style={[uStyles.body, {alignSelf: "flex-start", color: colors.dark, marginTop: 16, marginHorizontal: 12, textAlign: "center", fontSize: "20"}]}> - You have to do 20 pushups today</Text>
                            <Text style={[uStyles.body, {alignSelf: "flex-start", color: colors.dark, marginTop: 16, marginHorizontal: 12, textAlign: "center", fontSize: "20"}]}> - You have to do yoga for 10 mins</Text>
                            <Text style={[uStyles.body, {alignSelf: "flex-start", color: colors.dark, marginTop: 16, marginHorizontal: 12, textAlign: "center", fontSize: "20"}]}> - You have to do 10 sit-ups</Text>
                        </View>
                    </Reanimatable.View>
                    
                    <View style={[uStyles.searchCard, {height: 754}]}>
                        <View>
                            <Text style={[uStyles.header, {marginTop: 4, color: colors.black, paddingBottom: 8}]}>Overall Goal Progress</Text>
                            <Text style={[uStyles.body, {alignSelf: "center", color: colors.dark, marginTop: 16, marginHorizontal: 12, textAlign: "center", fontSize: "20"}]}>Pushups</Text>
                            <Text style={{color: "darkgreen", alignSelf: "center"}}>300 Completed</Text>
                            <Text></Text>
                            <ProgressBar progress={0.3} color={colors.dark} style={{height: 35}}/>
                        </View>
                        <Text></Text>
                        <View>
                            <Text style={[uStyles.body, {alignSelf: "center", color: colors.dark, marginTop: 16, marginHorizontal: 12, textAlign: "center", fontSize: "20"}]}>Curl-ups</Text>
                            <Text style={{color: "darkgreen", alignSelf: "center"}}>800 Completed</Text>
                            <Text></Text>
                            <ProgressBar progress={0.8} color={colors.dark} style={{height: 35}}/>
                        </View>
                        <Text></Text>
                        <View>
                            <Text style={[uStyles.body, {alignSelf: "center", color: colors.dark, marginTop: 16, marginHorizontal: 12, textAlign: "center", fontSize: "20"}]}>Walk for 10 mins</Text>
                            <Text style={{color: "darkgreen", alignSelf: "center"}}>500 Completed</Text>
                            <Text></Text>
                            <ProgressBar progress={0.5} color={colors.dark} style={{height: 35}}/>
                        </View>
                    </View>
>>>>>>> Stashed changes
                </ScrollView>
            </ViewShot>

            <View style={uStyles.roundButtonArray}>
                <TouchableOpacity style={uStyles.roundButton} onPress={() => sharePost()}>
                    <Feather name="share" size={24} color={colors.white}/>
                </TouchableOpacity>
            </View>

            <View style={uStyles.topBar}>
                <Text style={[uStyles.title, {color: colors.primary, textAlign: 'left', marginTop: 32}]}>Impact</Text>
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
    barPosition: {
        alignItems: 'center'
    },
});