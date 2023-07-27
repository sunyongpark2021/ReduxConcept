import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0, //this defines the initial state of counter
};

const counterSlice = createSlice({
  // createSlice helps create actions and reducers. Basically we are "creating a Slice of reducers here"
  name: "counter", //name is provided to prevent confusion with other slices
  initialState, //= (counter: 0) as defined above
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
    //We are creating two different reducers for this store "counter". The name of the argument (state) can be any.
    //These recuers will change th value of counter
  },
});

const store = configureStore({
  reducer: counterSlice.reducer,
}); //We are creating one whole complete store here. The store contains a group of reducers (In this case, increment and decrement from counterSlice)

export default function App() {
  return (
    <Provider store={store}>
      {/* Any components under this Provider tag will have access to the store
      defined above */}
      <Counter />
    </Provider>
  );
}

function Counter() {
  const counter = useSelector((turtle) => turtle.counter);
  // We only have 1 store in the code (multiple stores are rarely used).
  // Therefore, useSelector automatically selects that one store. So what you put in arguments
  // doesn't really matter. I put turtle as argument to show that the naming doesn't matter here
  const dispatch = useDispatch();
  //dispatch is used to send actions to the Redux store
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Counter: {counter}</Text>
      {/* this counter value is updated as soon as reducer is executed */}
      <View style={styles.button}>
        <Button
          title="Increment"
          onPress={() => dispatch(counterSlice.actions.increment())}
        />
        {/* dispatch will invoke the action that leads to execution of certain
        reducer */}
        <Button
          title="Decrement"
          onPress={() => dispatch(counterSlice.actions.decrement())}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 250,
    height: 50,
  },
});
