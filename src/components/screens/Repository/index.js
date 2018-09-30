import React, { Component } from 'react';
import {  StyleSheet, View, Text } from 'react-native';
import createNavBar from '../../Navbar';

import PullRequestList from '../../List/PullRequestList';


export default class Repository extends Component {

    static navigationOptions = createNavBar('Pull Requests');

    constructor(props){
        super(props);
        const user = props.navigation.getParam('user', 'NO-USER');
        const repo = props.navigation.getParam('repository', 'NO-REPO');

        this.state = {
            user: user,
            repository: repo
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <PullRequestList 
                    navigation={this.props.navigation}
                    user={this.state.user}
                    repository={this.state.repository}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff'
    }
})