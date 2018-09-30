import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ListComponent from '../List';
import { Avatar } from 'react-native-elements';

import { SEARCH_API } from '../../utils/misc';
const REPO_URL = `${SEARCH_API}/repositories?q=language:javascript&sort=stars&order=desc&page=`

class RepositoriesList extends Component {


    updateList = (previousData, response, page) => {
        return {
            data: page === 1 ? response.items : [...previousData, ...response.items],
            error: response.error || null,
            loading: false,
            refreshing: false
        }

    };


    renderItem = repo => (
        <TouchableOpacity
            onPress={() => {
                this.onItemPress(repo.item);
            }}>
            <View style={styles.listItem}>
                <Avatar size="xlarge" source={{ uri: repo.item.owner.avatar_url }} />

                <View style={styles.listContent}>
                    <Text
                        style={styles.listTitle}>
                        {repo.item.name}
                    </Text>

                    <View
                        style={styles.flexRow}>
                        <View
                            style={styles.flexRow}>
                            <Text style={styles.textBold}>Stars </Text>
                            <Text style={styles.text}>
                                {repo.item.stargazers_count}
                            </Text>
                        </View>
                        <View
                            style={styles.flexRow}>
                            <Text style={styles.textBold}>Forks </Text>
                            <Text style={styles.text}>{repo.item.forks}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );



    onItemPress = (item) => {

        this.props.navigation.navigate('Repository', {
            user: item.owner.login,
            repository: item.name
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <ListComponent
                    renderItem={this.renderItem}
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
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    listContent: { 
        marginLeft: 10, 
        paddingRight: 10, 
        flex: 1 
    },
    listTitle:{
        textAlign: 'left',
        fontSize: 20,
        marginBottom: 5,
        color: '#666',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row',
    },
    textBold:{ 
        fontWeight: 'bold', 
        color: '#666' 
    },
    text:{
        color: '#aaa' 
    }
})

export default RepositoriesList;