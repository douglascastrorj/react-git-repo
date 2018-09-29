

import React, {Component} from 'react';
import { StyleSheet,  View} from 'react-native';

import  createNavBar from '../../Navbar';
import RepoList from '../../List/RepositoriesList';


export default class Home extends Component {
    static navigationOptions = createNavBar('Most Popular')
  

    render() {
      return (
        <View style={styles.container}>
        <RepoList 
          navigation={this.props.navigation}
        />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      width: '100%',
      backgroundColor: '#ffffff'
    }
  })