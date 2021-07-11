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
import CalendarPicker from "react-native-calendar-picker";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      task: "",
      taskItems: [],
      completedAll: false,
      rating: 0,
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  componentDidMount() {
    let deta = new Date();
    let month = deta.getMonth() + 1;
    let year = deta.getFullYear();
    // let data = this.state.data;

    if (this.state.data.length === 0) {
      this.monthsSetting(month, this.state.data, year);
    }
  }

  handleAddTask = (val) => {
    Keyboard.dismiss();

    if (this.state.task !== "") {
      this.setState({ completedAll: false });
      let data = this.state.taskItems;
      data.push(this.state.task);
      this.setState({ taskItems: data });
      this.setState({ task: "" });

      let bata = this.state.data;

      //console.log(val);
      //console.log(bata);
      //console.log('data 1', bata[0][val - 1]);
      //console.log('data:', bata[0][val - 1][1]);
      bata[0][val - 1][1].push(this.state.task);
      //console.log('data:', bata[0][val - 1][1]);
      this.setState({ data: bata });
      //console.log('data 2', bata[0][val - 1]);
      //console.log(bata[0]);

      // //console.log( this.state.data);
      // //console.log('Data 2 :', bata[val - 1]);
    }
  };

  handleDeleteTask = (index, val) => {
    var data = this.state.taskItems;

    let bata = this.state.data;

    bata[0][val - 1][2].push(bata[0][val - 1][1][index]);
    this.setState({ data: bata });

    bata[0][val - 1][1].splice(index, 1);

    this.setState({ data: bata });

    this.setState({ task: "" });

    if (bata[0][val - 1][1].length === 0) {
      this.setState({ completedAll: true });
    }
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
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";

    console.log("whole data", this.state.data);
    // if(startDate === ''){
    //   const selectedDate =  startDate.split(' ')[2];
    // }else{
    //   const selectedDate = new Date().getDate();
    // }

    // console.log(new Date().getMonth());

    const selectedDate =
      selectedStartDate !== null
        ? startDate.split(" ")[2]
        : new Date().getDate();
    ///console.log(typeof startDate, typeof selectedDate);

    // if (startDate !== null) {
    // if(this.state.data.length !== 0){
    //   /console.log(this.state.data[0][selectedDate-1])
    // }
    // }

    const data =
      startDate !== null && this.state.data.length !== 0
        ? this.state.data[0][selectedDate - 1]
        : undefined;
    //console.log('data', data);
    //console.log('date:', new Date().getDay());

    //console.log(this.state.data);

    return (
      <View style={{ flex: 1, backgroundColor: "#D9EEE9" }}>
        <Header
          statusBarProps={{ barStyle: "dark-content" }}
          backgroundColor="#D9EEE9"
          placement={"left"}
          centerComponent={{
            text:
              selectedStartDate === null
                ? new Date().getDate() + " Today"
                : startDate.split(" ")[2] +
                  " " +
                  startDate.split(" ")[0] +
                  " " +
                  startDate.split(" ")[1],
            style: styles.txt,
          }}
        />

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <CalendarPicker
            previousTitle=""
            nextTitle=" "
            startFromMonday={true}
            todayBackgroundColor="#fff"
            selectedDayColor="#0ECC9C"
            selectedDayTextColor="#FFF"
            todayTextStyle={{
              color: "black",
            }}
            scaleFactor={340}
            textStyle={{
              fontWeight: "600",
              color: "#000000",
            }}
            onDateChange={this.onDateChange}
          />
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
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                {data !== undefined && data[1].length !== 0
                  ? "scheduled Task"
                  : undefined}
              </Text>
              {data !== undefined
                ? data[1].map((item, index) => {
                    return (
                      <TouchableOpacity
                        style={{ flexDirection: "row" }}
                        key={index}
                        onPress={() => {
                          this.handleDeleteTask(
                            index,
                            startDate.split(" ")[2] !== undefined
                              ? startDate.split(" ")[2]
                              : new Date().getDate()
                          );
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

            <View
              style={
                data !== undefined && data[2].length !== 0
                  ? styles.items
                  : undefined
              }
            >
              <View>
                {data !== undefined && data[2].length !== 0 ? (
                  <Text style={{ fontWeight: "500", fontSize: 16 }}>
                    Completed ones
                  </Text>
                ) : undefined}
              </View>
              {data !== undefined && selectedDate !== undefined
                ? data[2].map((item, index) => {
                    return (
                      <View key={index}>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ fontSize: 30, color: "black" }}>
                            •{" "}
                          </Text>
                          <Text style={{ fontSize: 18, marginTop: 6 }}>
                            {item}
                          </Text>
                        </View>
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
          <TouchableOpacity
            onPress={() =>
              this.handleAddTask(
                startDate.split(" ")[2] !== undefined
                  ? startDate.split(" ")[2]
                  : new Date().getDate()
              )
            }
          >
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
  items: {
    marginTop: 15,
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
  txt: {
    fontSize: 20,
    fontWeight: "700",
  },
});
