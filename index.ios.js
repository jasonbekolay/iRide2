/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} = React;

var STOP_URL = 'http://api.winnipegtransit.com/v2/stops/60239/schedule.json?api-key=7z8e2GUnJZ6Z17x2iueI';

var iRide2 = React.createClass({
  getInitialState: function() {
    return { stopSchedule: null };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(STOP_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          stopSchedule: responseData['stop-schedule']
        })
      })
      .done();
  },
  render: function() {
    if (!this.state.stopSchedule) {
      return this.renderLoading();
    }
    return this.renderStop(this.state.stopSchedule);
  },
  renderLoading: function() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  },
  renderStop: function(stop) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {stop.stop.name}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('iRide2', () => iRide2);
