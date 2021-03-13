import React, {useRef, useState, useEffect} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView, FlatList} from 'react-native'
import {StatusBar} from 'expo-status-bar';
import * as Sharing from 'expo-sharing';
import {Feather} from "@expo/vector-icons";
import ViewShot from "react-native-view-shot";
import { StackedBarChart, ProgressCircle, YAxis, XAxis } from 'react-native-svg-charts'
import * as Reanimatable from 'react-native-animatable';

import {uStyles, colors} from '../styles.js'

export default GameScreen = () => {
    const view = useRef();
    const milestones = useState([{}, {}, {}]);

    const tempMilestonesData = {
        labels: ["Swim", "Bike", "Run"], // optional
        data: [0.4, 0.6, 0.8]
    };

    const tempPointsData = [
        {
            cause: "Environment",
            Thoughts: 3840,
            Volunteering: 1920,
            Activism: 960,
            Contribution: 400,
            Awareness: 400,
        },
        {
            cause: "Fitness",
            Thoughts: 4140,
            Volunteering: 190,
            Activism: 960,
            Contribution: 350,
            Awareness: 400,
        },
    ]

    const types = ['Thoughts', 'Volunteering', 'Activism', 'Contribution', 'Awareness'];

    useEffect(() => {
        // get milestone of month

        // get local milestones

        // generate new milestones if needed
    }, []);

    const getMilestones = async () => {

    }

    const genIndividualMilestones = () => {
        let maxIndex = 0;
        let maxSum = 0;
        let minIndex = 0;
        let minSum = 0;
        tempPointsData.forEach((item, index) => {
            let sum = item.Thoughts + item.Volunteering + item.Activism + item.Contribution + item.Awareness;
            if (sum > maxSum) {
                maxIndex = index;
                maxSum = sum;
            } else if (sum < minSum) {
                minIndex = index;
                minSum = sum;
            }
        });
        return ([
            {cause: tempPointsData[maxIndex].cause, goal: Math.ceil(maxSum / 100) * 120},
            {cause: tempPointsData[minIndex].cause, goal: Math.ceil(minSum / 100) * 120}
        ]);
    }

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
                            <Text style={[uStyles.header, {marginTop: 4, color: colors.black, paddingBottom: 8}]}>Points</Text>

                            <View style={{flexDirection: "row", marginBottom: 8}}>
                                <FlatList
                                    data={tempPointsData}
                                    scrollEnabled={false}
                                    renderItem={({item}) => {
                                        return (
                                            <Text style={[uStyles.message, {color: colors.dark, fontSize: 8}]}>{item.cause}</Text>
                                        );
                                    }}
                                    keyExtractor={(item) => item.cause}
                                    style={{flex: 1, height: 200}}
                                    contentContainerStyle={{flex: 1, justifyContent: "space-evenly"}}
                                    showsVerticalScrollIndicator={false}
                                />    
                                <StackedBarChart
                                    style={{height: 200, width: "90%"}}
                                    keys={types} 
                                    colors={[colors.dark, colors.primary, colors.white, colors.black]}
                                    data={tempPointsData}
                                    showGrid={false}
                                    contentInset={{ top: 8, bottom: 8 }}
                                    horizontal={true}
                                />
                            </View>
                            <XAxis
                                style={{ marginHorizontal: 10, width: "90%" }}
                                data={[0, 1, 2, 3, 4]}
                                formatLabel={(a, index) => (index * (tempPointsData[0].Thoughts + tempPointsData[0].Volunteering + tempPointsData[0].Activism + tempPointsData[0].Contribution + tempPointsData[0].Awareness) / [0, 1, 2, 3, 4].length)}
                                contentInset={{ left: 32, right: 16 }}
                                svg={{ fontSize: 10, fill: colors.black }}
                            />                    
                            <Text style={[uStyles.body, {alignSelf: "center", color: colors.black, marginTop: 16}]}>You earned {tempPointsData.map(item => (item.Thoughts + item.Volunteering + item.Activism + item.Contribution + item.Awareness)).reduce((a, b) => a + b)} points total!</Text>
                            
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

                    <Reanimatable.View animation="slideInUp" duration={500}>
                        <View style={[uStyles.searchCard, {height: 340}]} animation="slideInUp" duration={500}>
                            <Text style={[uStyles.header, {marginTop: 4, color: colors.black, paddingBottom: 8}]}>Impact Facts</Text>

                            <Feather name="plus-circle" color={colors.primary} size={32} style={{alignSelf: "center"}}/>
                            <Text style={[uStyles.body, {alignSelf: "center", color: colors.black, marginTop: 16, marginHorizontal: 12, textAlign: "center"}]}>You made a post that engaged 1321 people on Environment!</Text>
                            <Feather name="share" color={colors.primary} size={32} style={{alignSelf: "center", marginTop: 8}}/>
                            <Text style={[uStyles.body, {alignSelf: "center", color: colors.black, marginTop: 16, marginHorizontal: 12, textAlign: "center"}]}>You shared a post representing 120 people on Fitness!</Text>
                            <Feather name="message-circle" color={colors.primary} size={32} style={{alignSelf: "center", marginTop: 8}}/>
                            <Text style={[uStyles.body, {alignSelf: "center", color: colors.black, marginTop: 16, marginHorizontal: 12, textAlign: "center"}]}>You made a comment on a post that engaged 149 people!</Text>
                        </View>
                    </Reanimatable.View>
                    
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
});