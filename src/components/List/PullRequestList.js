import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';

import ListComponent from '../List';

import {
    Card,
    ListItem,
    Button,
    Icon,
} from 'react-native-elements';


import { REPO_API } from '../../utils/misc';

// const PR_URL = `https://api.github.com/repos/freeCodeCamp/freeCodeCamp/pulls`;

class PullRequestList extends Component {

    constructor(props){
        super(props);

        this.state = {
            url: `${REPO_API}/${this.props.user}/${this.props.repository}/pulls`
        }
    }


    //funcao q retorna novo estado
    updateList = (previousData, response, page) => {
        return {
            data: response,
            error: response.error || null,
            loading: false,
            refreshing: false
        }

    };

    renderItemCard = pr => (
        <Card
            title={pr.item.title}
            image={{
                uri: pr.item.user.avatar_url,
            }}>

            <Text style={{ marginBottom: 10, textAlign: 'center', padding: 10 }} >
                Author: {pr.item.user.login}
            </Text>

           
            <Text style={{ marginBottom: 10, textAlign: 'justify', padding: 10 }}>
                {pr.item.body}
            </Text>           

            <Button

                backgroundColor="#8E24AA"
                buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                }}
                title="View on Github"
                onPress={() => {
                    this.onItemPress(pr);
                }}
            />
        </Card>
    );


    onItemPress = (pr) => {

        console.log(pr.item.html_url)
        Linking.openURL(pr.item.html_url)
        // alert('press item')
        // this.props.navigation.navigate('Repository', {
        //     user: item.owner.login,
        //     repository: item.name
        // })
    }


    render() {
        console.log("URL DE PR",this.state.url)

        return this.state.url ?
        (
            <View style={styles.container}>
                <ListComponent
                    renderItem={this.renderItemCard}
                    updateList={this.updateList}
                    noPagination
                    url={this.state.url}
                />
            </View>
        )
        : null
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff'
    },
    cardBody:{
        height: 200
    }
})

export default PullRequestList;