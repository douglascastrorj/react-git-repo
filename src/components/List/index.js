import React, { Component } from "react";
import { View,  FlatList, ActivityIndicator, TextInput } from "react-native";
import { List,  SearchBar } from "react-native-elements";

class ListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page } = this.state;
    let url =  this.props.noPagination ? this.props.url : this.props.url + page ;

    console.log("CHEGUEI AQUI ", url);

    this.setState({ loading: true });

    setTimeout(() => {
      fetch(url)
        .then(res => res.json())
        .then(res => {

          //limite de uso da api excedido
          if(res.message){
            alert(res.message)
          }else{
            this.setState(this.props.updateList(this.state.data, res, page));
          }
          // this.setState({
          //   data: page === 1 ? res.items : [...this.state.data, ...res.items],
          //   error: res.error || null,
          //   loading: false,
          //   refreshing: false
          // });

          console.log("até aqui tudo bem", res)

          
        })
        .catch(error => {
          this.setState({ error, loading: false });
          console.log('deu pau', error)
        });
    }, 1500);
    
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {

    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return null;
    // return <SearchBar placeholder="Type Here..."  round onChangeText={(value) => {this.setState({search: value})}} />;
    // return (
    //   <View>
    //     <Input
    //                 placeholder="Search"
    //                 type="textinput"
    //                 value={this.state.search}
    //                 onChangeText={ value => this.setState({search: value})}
    //                 autoCapitalize={'none'}

    //             />
    //   </View>
    // )
  };

  renderFooter = () => {

    if(this.props.noPagination && this.state.data.length > 0){
      return null;
    }
   
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    // ItemSeparatorComponent={this.renderSeparator}
    return (
      <List containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={this.props.renderItem}
          keyExtractor={item => String(item.id)}
          
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </List>
    );
  }
}

export default ListComponent;