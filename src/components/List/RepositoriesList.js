import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListComponent from '../List';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Card,
    ListItem,
    Button,
} from 'react-native-elements';

import { SEARCH_API } from '../../utils/misc';
const REPO_URL = `${SEARCH_API}/repositories?q=language:javascript&sort=stars&order=desc&page=`

class RepositoriesList extends Component {



    //funcao q retorna novo estado
    updateList = (previousData, response, page) => {
        return {
            data: page === 1 ? response.items : [...previousData, ...response.items],
            error: response.error || null,
            loading: false,
            refreshing: false
        }

    };

    //usada para renderizar itens de lista
    renderRepositories = ({ item }) => (
        <ListItem
            roundAvatar
            title={`${item.name}`}
            subtitle={`Stars: ${item.stargazers_count}  \t Forks:  ${item.forks}`}
            avatar={{ uri: item.owner.avatar_url }}
            containerStyle={{ borderBottomWidth: 0 }}
            onPress={(item) => {
                this.onItemPress(item)
            }}
        />
    )

    //usada para renderizar cards
    renderItemCard = repo => (
        <Card
            title={repo.item.name}
            image={{
                uri: repo.item.owner.avatar_url,
            }}>

            <View style={styles.cardContainerText}>
                <View>
                    <Text style={{ fontWeight: 'bold' }}>Author </Text>
                    <Text  >
                        {repo.item.owner.login}
                    </Text>
                </View>

                <View>
                    <Text style={{ fontWeight: 'bold' }}>Stars </Text>
                    <Text >
                        {repo.item.stargazers_count}
                    </Text>
                </View>

                <View>
                    <Text style={{ fontWeight: 'bold' }}>Forks </Text>
                    <Text >
                        {repo.item.forks_count}
                    </Text>
                </View>

            </View>

            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",

                }}
            />

            <View style={styles.cardContainerText}>
                <Text style={{ marginBottom: 10, textAlign: 'center', padding: 10 }}>
                    {repo.item.description}
                </Text>
            </View>


            <Button
                backgroundColor="#8E24AA"
                buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 10,
                }}
                title="View Pull Requests"
                onPress={() => {
                    //alert(item.name)
                    this.onItemPress(repo.item);
                }}
            />
        </Card>
    );


    onItemPress = (item) => {

        // console.log(item)
        // alert('press item')
        this.props.navigation.navigate('Repository', {
            user: item.owner.login,
            repository: item.name
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <ListComponent
                    renderItem={this.renderItemCard}
                    updateList={this.updateList}
                    url={REPO_URL}
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
    },
    cardContainerText: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

export default RepositoriesList;