import React, { Component } from 'react';
import { Text, Button, View, StyleSheet, Image } from 'react-native';
import email from 'react-native-email'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    padding: 10,
    backgroundColor: '#364097',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  name: {
    color: '#D20A4B',
    fontSize: 24,
    padding:10,
    textAlign:'center',
    marginTop:10
  },
  text:{
    color:'white',
    fontSize:16,
    textAlign:'center',
    padding:5
  }
});

export default class DetailView extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTintColor: 'white',
    //title: navigation.state.params.data.name,
    title: 'Details',
    headerTitleStyle:{
      color: 'white'
    },
    headerStyle: {
     backgroundColor:'#AAA0A0'
   }
 });

  render() {
    const { params } = this.props.navigation.state;
    return(
      <View style={styles.container}>
        <View style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
          <Image
            source={{uri: params.data.cover_url}}
            style={{width: 128, height: 128, margin: 20, borderRadius: 100}}
            />
          <Text style={styles.name}>{params.data.name}</Text>
          <Text style={styles.text}>{params.data.custom_type}</Text>
          <Text style={styles.text}>URL: {params.data.channel_url}</Text>
          <Text style={styles.text}> </Text>
          <Button
            onPress={() => {
              const to = ['ardeleanalexandru3@gmail.com'] // string or array of email addresses
              email(to, {
                  // Optional additional arguments
                  cc: [], // string or array of email addresses
                  bcc: '', // string or array of email addresses
                  subject: 'Show how to use',
                  body: 'Some body right here'
              }).catch(console.error)
            }}
            title="Email Channel"
            color="#841584"
            accessibilityLabel="Send an email to the admin of this channel"
          />
        </View>
      </View>
    );
  }
}
