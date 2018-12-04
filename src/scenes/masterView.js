import React, { Component } from 'react';
import { Text, View, ListView, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native';

import Row from '../components/row'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    padding: 0,
    backgroundColor: '#364097'
  },
  text: {
    marginLeft: 16,
    fontSize: 16,
  },
  row: {
      flex: 1,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
  }
});

export default class MasterView extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTintColor: 'white',
    title: 'Channels',
    headerTitleStyle:{
      color: 'white'
    },
    headerStyle: {
     backgroundColor:'#AAA0A0'
   }
   //headerRight:  <ActivityIndicator style={{marginRight: 15}} animating={navigation.state.params.isAnimating} size="small" color="white" />
 });

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2'])
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  async fetchData(){
    try{
      let response = await fetch("https://api.sendbird.com/v3/open_channels", {
        method: 'GET', // or 'PUT'
        headers: {
          'Api-Token': '543f73a20f0c88e70be548ddbd4169de1733e327'
        }
      });
      let responseJson = await response.json();
      console.log(responseJson.results);
      this.setState({dataSource: this.state.dataSource.cloneWithRows(responseJson.channels)});
      //this.props.navigation.setParams({isAnimating: false});
    } catch(error){
      console.error(error);
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <ListView
        contentInset={{bottom:15}}
        automaticallyAdjustContentInsets={false}
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow = {
           (rowData) => (
             <TouchableHighlight
              onPress={() => navigate('DetailView', {data: rowData})}
              >
               <View>
                <Row name={rowData.name} gender={rowData.custom_type} />
              </View>
            </TouchableHighlight>
           )
        }
        />
      </View>
    );
  }
}
