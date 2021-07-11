import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Header } from "react-native-elements";
import BarChart from "./BarChart";

export default class Graph extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{ barStyle: "dark-content" }}
          backgroundColor="#D9EEE9"
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: "700",
            color: "#344955",
            margin: 10,
          }}
        >
          Graph of Work
        </Text>

        <BarChart />
        <View style={{ justifyContent: "center" }}>
          <Text style={{ textAlign: "center", padding: 10, fontSize: 20 }}>
            This is the graph of your{" "}
            <Text style={{ color: "red", fontWeight: "bold", fontSize: 25 }}>
              Huslte
            </Text>
            .That you did in this week.
          </Text>
          <Image
            style={{
              width: 300,
              height: 150,
              alignSelf: "center",
              marginTop: 10,
            }}
            source={{
              uri: "https://i.pinimg.com/originals/32/f3/cb/32f3cb64a872d6b61e5aef31db92ad71.jpg",
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "white",
  },
});
