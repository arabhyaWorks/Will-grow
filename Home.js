import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { Header } from "react-native-elements";
import { AirbnbRating } from "react-native-elements";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      task: "",
      taskItems: [],
      completedTask: [],
      completedAll: false,
      date: null,
      rating: 0,
    };
  }

  componentDidMount() {
    let deta = new Date();
    let month = deta.getMonth() + 1;
    let year = deta.getFullYear();
    // let data = this.state.data;

    if (this.state.data.length === 0) {
      this.monthsSetting(month, this.state.data, year);
    }

    // console.log(this.state.data.length);
  }

  handleAddTask = () => {
    Keyboard.dismiss();

    var deta = new Date();
    var date = deta.getDate();
    var month = deta.getMonth();
    var year = deta.getFullYear();

    if (date <= 9) {
      date = "0" + date;
    }
    if (month <= 9) {
      month = "0" + month;
    }
    var fullDate = date + "/" + month + "/" + year;

    // console.log('whole data:', this.state.data);

    if (this.state.task !== "") {
      this.setState({ completedAll: false });
      let data = this.state.taskItems;
      data.push(this.state.task);
      this.setState({ taskItems: data });
      this.setState({ task: "" });

      let bata = this.state.data;
      let val = new Date().getDate();
      console.log("data:", bata[0][val - 1][1]);
      if (bata[0][val - 1].length === 4) {
        // console.log('resetting rating', bata[0][val - 1]);
        bata[0][val - 1].pop();
        // console.log('resetting rating', bata[0][val - 1]);
      }
      // console.log("length",bata[0][val-1].length)
      bata[0][val - 1][1].push(this.state.task);
      // console.log('data:', bata[0][val-1][1]);
      this.setState({ data: bata });

      // console.log( this.state.data);
      // console.log('Data 2 :', bata[val - 1]);
    }
  };

  handleDeleteTask = (index) => {
    var data = this.state.taskItems;
    var data2 = this.state.completedTask;

    let bata = this.state.data;
    let val = new Date().getDate();
    data2.push(bata[0][val - 1][1][index]);

    bata[0][val - 1][2] = data2;
    this.setState({ data: bata });

    bata[0][val - 1][1].splice(index, 1);

    this.setState({ data: bata });

    this.setState({ task: "" });

    if (bata[0][val - 1][1].length === 0) {
      this.setState({ completedAll: true });
    }
  };

  ratingCompleted = (rating) => {
    // console.log('Rating is: ' + ratedVal);
    let data = this.state.data;
    let date = new Date().getDate();
    // console.log(data[0][date-1]);
    data[0][date - 1].push(rating);
    // this.setState({data:data})
    // console.log(this.state.data[0][date - 1]);
    // console.log(this.state.rating);
  };

  monthsSetting(month, data, year) {
    if (month === 1) {
      this.setMonth(31, month, year, data);
    } else if (month === 2) {
      this.setMonth(28, month, year, data);
    } else if (month === 3) {
      this.setMonth(31, month, year, data);
    } else if (month === 4) {
      this.setMonth(30, month, year, data);
    } else if (month === 5) {
      this.setMonth(31, month, year, data);
    } else if (month === 6) {
      this.setMonth(30, month, year, data);
    } else if (month === 7) {
      this.setMonth(31, month, year, data);
    } else if (month === 8) {
      this.setMonth(31, month, year, data);
    } else if (month === 9) {
      this.setMonth(30, month, year, data);
    } else if (month === 10) {
      this.setMonth(31, month, year, data);
    } else if (month === 11) {
      this.setMonth(30, month, year, data);
    } else if (month === 12) {
      this.setMonth(31, month, year, data);
    }
  }

  setMonth = (noOfDays, month, year, data) => {
    for (let i = 1; i <= noOfDays; i++) {
      if (i <= 9) {
        i = "0" + i;
      }
      let date = i + "/" + month + "/" + year;
      let data2 = data;
      // console.log('yours data', data2);
      data2.push([date, ["↻ Reply emails"], []]);
      this.setState({ data: [data2] });
    }
  };

  render() {
    const date = new Date().getDate();
    const data =
      this.state.data.length !== 0 ? this.state.data[0][date - 1] : undefined;

    console.log(this.state.rating);

    return (
      <View style={{ flex: 1, backgroundColor: "#D9EEE9" }}>
        <Header
          backgroundColor="#D9EEE9"
          statusBarProps={{ barStyle: "dark-content" }}
        />
        <Text style={styles.sectionTitle}>Today's Hustle 😎</Text>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.tasksWrapper}>
            <View style={{ flex: 1 }}>
              <Text>
                {this.state.completedAll ? "You are set for the day." : "  "}
              </Text>
            </View>
            <View
              style={
                data !== undefined && data[1].length !== 0
                  ? styles.items
                  : undefined
              }
            >
              {data !== undefined && date !== undefined
                ? data[1].map((item, index) => {
                    return (
                      <TouchableOpacity
                        style={{ flexDirection: "row" }}
                        key={index}
                        onPress={() => {
                          this.handleDeleteTask(index);
                        }}
                      >
                        <Text style={{ fontSize: 30, color: "black" }}>• </Text>
                        <Text style={{ fontSize: 18, marginTop: 6 }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                : undefined}
            </View>
            <View>
              {this.state.completedAll ? (
                <View style={{ margin: 20 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: 40,
                    }}
                  >
                    Rate your <Text style={{ color: "red" }}>Day</Text>.
                  </Text>
                  <AirbnbRating
                    count={7}
                    reviews={[
                      "Terrible",
                      "Bad",
                      "Meh",
                      "OK",
                      "Hmm..",
                      "Amazing",
                      "Unbelievable",
                    ]}
                    defaultRating={0}
                    onFinishRating={this.ratingCompleted}
                    size={23}
                  />
                </View>
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    margin: 20,
                    fontWeight: "600",
                    fontSize: 20,
                  }}
                >
                  Go and <Text style={{ color: "red" }}>Hustle</Text>
                </Text>
              )}
            </View>
            <View
              style={
                data !== undefined && data[2].length !== 0
                  ? styles.items
                  : undefined
              }
            >
              <View>
                {data !== undefined && data[2].length !== 0 ? (
                  <Text style={{ fontWeight: "600", fontSize: 18 }}>
                    Completed ones
                  </Text>
                ) : undefined}
              </View>
              {data !== undefined && date !== undefined
                ? data[2].map((item, index) => {
                    return (
                      <View style={{ flexDirection: "row" }} key={index}>
                        <Text style={{ fontSize: 30, color: "black" }}>• </Text>
                        <Text style={{ fontSize: 18, marginTop: 6 }}>
                          {item}
                        </Text>
                      </View>
                    );
                  })
                : undefined}
            </View>
          </View>
        </ScrollView>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={"Write a task"}
            value={this.state.task}
            onChangeText={(text) => this.setState({ task: text })}
          />
          <TouchableOpacity onPress={() => this.handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>Add</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tasksWrapper: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 10,
    marginTop: 15,
  },
  items: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  writeTaskWrapper: {
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontWeight: "500",
    fontSize: 20,
    margin: 5,
  },
});
