import React, {useContext, useEffect, useState} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView, FlatList, Image} from 'react-native'
import {Feather} from "@expo/vector-icons";
import Onboarding from 'react-native-onboarding-swiper';

import {uStyles, colors} from '../styles.js'

export default OnboardingModal = (props) => {

    return (
        <Onboarding
            pages={[
                {
                    backgroundColor: colors.dark,
                    image: <Image source={require('../../assets/defaultProfilePhoto.png')} />,
                    title: 'Welcome to HealthTech',
                    subtitle: 'Achieving your important goals\n\n Motivating you to push further everyday',
                },
                {
                    backgroundColor: colors.dark,
                    image: <Image source={require('../../assets/defaultProfilePhoto.png')} />,
                    title: 'Commit to a Plan',
                    subtitle: 'Don\'t know where to start? \n\nMake your own goals and tasks to keep yourself fit and healthy',
                },
                {
                    backgroundColor: colors.dark,
                    image: <Image source={require('../../assets/defaultProfilePhoto.png')} />,
                    title: 'Experience the new feeling',
                    subtitle: 'See the impact that follows after you start planning \n\n The goals gradually become daily habits',
                },
                {
                    backgroundColor: colors.dark,
                    image: <Image source={require('../../assets/defaultProfilePhoto.png')} />,
                    title: 'Track Your Activity',
                    subtitle: "View your past activity and upcoming goals\n\n Even the little things matter, and we'll show you",
                },
                {
                    backgroundColor: colors.dark,
                    image: <Image source={require('../../assets/defaultProfilePhoto.png')} />,
                    title: 'Built For You',
                    subtitle: "After you finish your goal, take time to reflect and get suggestions",
                },
                {
                    backgroundColor: colors.dark,
                    image: <Image source={require('../../assets/defaultProfilePhoto.png')} />,
                    title: 'Ready?',
                    subtitle: "Time to jump into HealthTech.\n\n You can view this info again in your profile page anytime",
                },
            ]}
            titleStyles={{...uStyles.title, color: colors.primary, fontSize: 32}}
            subTitleStyles={{...uStyles.body, fontSize: 18, marginTop: 16}}
            imageContainerStyles={{paddingBottom: 0}}
            onDone={() => props.close()}
            skipToPage={5}
        />
    );
}