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
    return {
      stopSchedule: null,
      departureDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  getDepartures: function(stopSchedule) {
    var departures = [];
    for (var i = 0; i < stopSchedule['route-schedules'].length; i++) {
      var route = stopSchedule['route-schedules'][i];
      for (var j = 0; j < route['scheduled-stops'].length; j++) {
        var scheduledStop = route['scheduled-stops'][j];
        departures.push({
          routeNumber: route.number,
          variant: scheduledStop.variant.name,
          departureTime: scheduledStop.times.departure.estimated
        });
      }
    }
    return departures;
  },

  fetchData: function() {
    fetch(STOP_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          stopSchedule: responseData['stop-schedule'],
          departureDataSource: this.state.departureDataSource.cloneWithRows(this.getDepartures(responseData['stop-schedule'])),
          loaded: true
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

  renderDepature: function(departure) {
    return (
      <View>
        {departure.routeNumber} - {departure.variant} - {departure.departureTime}
      </View>
    );
  },

  renderStop: function(stop) {
    return (
      <View style={styles.container}>
        <Text style={styles.stopHeader}>
          {stop.stop.name}
        </Text>
        <ListView
          dataSource={this.state.departureDataSource}
          renderRow={this.renderDeparture}
        />
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
  stopHeader: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  departure: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('iRide2', () => iRide2);
