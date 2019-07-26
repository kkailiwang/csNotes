# Redux

Source: https://redux.js.org/basics

What it is: a predictable state container for JS apps that imposes restrictions on how/when updates can happen.

It has no relation with React, but tends to work especially well with React. 



USE THIS FOR AN APP! 



### Structure

State of the app is stored in a **store**. You can change the state by emitting an **action**. A **reducer** specifies how the actions transforms the state tree.  



### Core Concepts

#### Three principles

- Single source of truth: state of whole app is stored within an object tree in a store.

- State is read-only: you have to emit an action to change the state

  - ```react
    store.dispatch({
        type: 'COMPLETE_TODO',
        index: 1
    })
    ```

- Changes are made with pure functions

  - write a reducer, which is a function that takes the previous state and an action, then returns the next state. 

  - ```javascript
    function counter(state, action) {
        switch (action.type) {
            case 'action1':
                return state + 1;
            case 'action2':
                return state - 1;
        }
    }
    
    store.subscribe(function render() {
        //update display
    })
    
    //dispatch actions 
    
    ```

***Relationships: if things reference each other, try not to next. have them reference other separate parts of the state 

### Basics:

If there's too many actions, you can later put in a separate module:

```javascript
import { ACTION1, ACTION2 } from '../actionTypes'
```



**Action Creators**: functions that create actions

can be asynchronous

```javascript
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

dispatch(addTodo(text));


OR can create a bound action creator that automatically dispatches:

const boundAddTodo = text => dispatch(addTodo(text))
```



**Reducers:** takes the previous state and an action, returns the next state

It should never mutate arguments, do side effects like API calls and routing transitions, or call non-pure functions like Math.random() or Date.now()

```javascript
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
          
      //ALWAYS CREATE A COPY OF THE STATE! NOT MUTATE 
      return Object.assign({}, state, { //MUST SUPPLY EMPTY OBJECT AS FIRST PARAM
        visibilityFilter: action.filter
      })
    default:
      return state //MUST RETURN PREVIOUS STATE FOR ANY UNKNOWN ACTION
  }
}
```

If you need to create new arrays with same items except at one index often, then use a immutability-helper or a library like "Immutable" (like in the todo list example)

Reducer composition: dividing a reducer into multiple pieces, and you call one reducer with only part of the state 

```javascript
//each reducer is managing asection of the global state 
export default function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}

//WHICH IS THE SAME AS:


import { combineReducers } from 'redux'

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp

//or you could do something like: 

const reducer = combineReducers({ //root reducer 
  a: doSomethingWithA,
  b: processB,
  c: c
})

//or something like:

function reducer(state = {}, action) {
  return {
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
  }
}

//or:
import * as reducers from 'file_with_reducers';
const todoApp = combineReducers(reducers) 
```





**Store**: This object holds the app state, allows access via `getState()`, allows state updates via `dispatch(action)`, registers listeners via `subscribe(listener)` , unregisters listeners through the function returned by subscribe. You have one store in a Redux app. 

```javascript
const store = createStore(rootReducer);
//or
const store = createStore(rootReducer, initialState) //initial state could be window.STATE_FROM_SERVER

const unsubscribe = store.subscribe(function_executed_when_state_changes;
```



**Dispatching Actions**

`store.dispatch(action(args))` //automatically calls mainReducer 



**Data Flow** : strict unidirectional data flow. 

1. store.dispatch(action)
2. Redux store calls the reducer function you gave it (with current state tree and action)
3. Root reducer may combine output of multiple reducers into single state tree
4. Redux store saves complete state tree returned by root reducer



## Using with React

`yarn add react-redux`

|                | Presentational Components        | Container Components                           |
| -------------: | :------------------------------- | ---------------------------------------------- |
|        Purpose | How things look (markup, styles) | How things work (data fetching, state updates) |
| Aware of Redux | No                               | Yes                                            |
|   To read data | Read data from props             | Subscribe to Redux state                       |
| To change data | Invoke callbacks from props      | Dispatch Redux actions                         |
|    Are written | By hand                          | Usually generated by React Redux               |



Container component: a React component that uses `store.subscribe()` to read part of a Redux state tree and supplies props to a presentational component it renders.

Normally, use `connect()` to automatically generate container component. This would result in not having to implement `shouldComponentUpdate` yourself.

- to use `connect()`, define `const mapStateToProps = state => {}`

  - describes how to transform the redux state to the props for a presentational component. 
  - called every time the store state changes. 

- mapDispatchToProps(): receives dispatch method, returns callback props for the presentational component

  - if it's a function, will be called once on component creation. returns object of functions that dispatch actions
  - if it's an object full of action creators, each action will be turned into a prop function that automatically dispatches its action when called. (shorthand) 

- then, do:

- ```javascript
  import { connect } from 'react-redux'
  
  const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
  )(TodoList)
  
  export default VisibleTodoList
  ```

- or: 

  ```javascript
  const mapStateToProps = (state, ownProps) => ({
    // ... computed data from state and optionally ownProps
    return {
      //object with fields that will be passed onto the component
  }
  })
  
  const mapDispatchToProps = {
    // ... normally is an object full of action creators
  }
  
  // We normally do both in one step, like this:
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component)
  ```

`<Provider>` automatically makes store available to all container components 

```javascript
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

const store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

```

Full example: https://redux.js.org/basics/example

## Advanced

### Asynchronous

- Actions needed:
  - toggling `isFetching` to inform reducers that request began (show spinner)
  - showing request finished successfully, resets `isFetching`
  - showing request failed, resets `isFetching`