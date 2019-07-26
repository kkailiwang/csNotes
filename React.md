# React

---

A Javascript library to build user interfaces

Handles events, state change over time, how data is prepared for display

Resources:

- www.reactjs.org/docs
- www.reactjs.org/tutorial





## JSX



JSX: a syntax extension to JavaScript. 

- produces React "elements"
- not required in React, but helps as a visual aid. 
- JSX expressions evaluate to JS objects, so it can be assigned to variables, arguments, return values 

```jsx
const name = 'kaili';
const element = (<h1 className="greeting">Hello, {name}</h1>); //javascript must be enclosed in {}
//recommended to enclose in parentheses to avoid autonomatic semicolon insertion
//^the same as: 
const element = React.createElement(
	'h1',
    {className: 'greeting'},
    'Hello, {name}'
);

//^which is the same thing as:
const element = { //react  element, a js object. aka description of what you see on the screen
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'Hello, {name}'
    }
};


const element2 = <div tabIndex="0"></div>; //quotes to specify string literals as attributes 
const element3 = ( //can have children too 
	<div>
    	<h1>Hi!</h1>
    </div>
);

ReactDOM.render(
	element,
    element2,
    element3,
	document.getElementById('root') //put all the elements in this root 
)

```

## Rendering



<img src='/home/kaili/.config/Typora/typora-user-images/1563440907587.png' style="border:2px dashed black">





Into the DOM:

in HTML, set a "root" DOM node:

```html
<div id="root"></div>
```

Everything inside will be managed by React DOM. (usually just one per app)



##### Updating:

React elements are immutable. (like a single frame in a movie)

So, you must create a new element every time. 

React only updates what's necessary by comparing element and its children with the previous one (and only updates that node) 





## Components and Props

Components splits UI into independent, reusable pieces. Sort of like javascript functions. 

They return inputs ("props"), and return React elements. 

```javascript
//function component
//ALWAYS START COMPONENT NAMES WITH CAPITAL LETTER 
function Comp(props) {
    return <h1>hi, {props.name}</h1>;
}

//OR: (THESE ARE EQUIVALENT)

class Comp extends React.Component  {
    render() {
        return <h1>hi, {this.props.name}</h1>;
    }
}

//ELEMENTS CAN ALSO REPRESENT USER-DEFINED COMPONENTS
const element = <Comp name="sara" />; 
//if there are no properties, then just do Comp() and <Comp />
```

#### Rendering a component

React treats components starting with lowercase as DOM tags. so start component names with capital letter! 

`shouldComponentUpdate` - used for performance optimization

`key`: a special React attribute

- when a `key` changes, React will create a new component instance rather than update the current one. 
- often used for dynamic lists 

#### Props must be read only

All react components must be pure functions with respect to their props (can never modify its own props).

Data passed in as props = **controlled**, because parent component controls that data. 

Instead, they can modify state. 

- `getDerivedStateFromProps` - exists to allow component to update its internal state as the result of changes in props. 
  - try to avoid. 



## State

Similar to props, but private and fully controlled by component. So then a component can keep itself updated.

##### Never modify a state directly

- do: `this.setState({field: value});`
- or: function is the parameter

```javascript
this.setState(func); //where func accepts parameters (state, props), which is from previous state 

or

this.setState((state, props) => ({ //or can just be state. 
    counter: state.counter + props.increment;
}))
```

- don't:` this.state.filed = value`



State updates are merged. If you only modify `this.state.prop1`, it will replace that but not touch `this.state.prop2`. 



Example: clock (see below)



### Lifecycle methods in a class

**mounting**: when class is rendered to the DOM for the first time

**unmounting**: when the DOM produced by the class is removed. 



```Javascript
class Clock extends React.Component { //'this' refers to class object 
 	constructor(props) {
   		super(props); //class components shoudl always call base constructor with props! 
   		this.state = {date: new Date()};
 	}
    
    //runs once when component mounts
 	componentDidMount() { //lifecycle method
        this.timerID = setInterval(() => this.tick(), 1000);
    }
    
    //when DOM will be removed 
    componentWillUnmount() { //lifecycle method
        clearInterval(this.timerID)
    }
    
    tick() {
        this.setState({date: new Date()});
    }

 	render() {
   		return (
     		<div>
       			<h1>Hello, world!</h1>
       			<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
     		</div>
   		);
 	}
}
```



#### Data Flow

state is local/encapsulated. It is not accessible to any component other than the one that owns/sets it. 

You can pass a state property down into another child: (top-down/unidirectional data flow)

```jsx
<h2>it is {this.state.date}}.</h2>

or

<FormattedDate date={this.state.date} /> //user-defined component
    
//FormattedDate would receive date in its props, but doesn't know where it came from. 
```



## Handling Events

Handling events with React elements is similar to handling events on DOM elements. 

Differences:

- React events are camelCase
- event handler:
  - HTML: `<button onclick="activateLasers()"></button>`
  - jsx: `button onclick={activateLasers}></button>`
- cannot return false to prevent default behavior (see www.reactjs.org/docs/handling-events.html)



Synthetic events: can use function handleClick(e) inside function ActionLink() 

- a cross-browser wrapper around browser's native event. 
- can be used to preventDefault()



Don't need to call addEventListener; just add listener when element initially renders. 



Must bind `this` in call functions: 

```javascript
this.method = this.method.bind(this) //binds this as the this for the method, then returns the updated method. 
```





## Conditional Rendering

```javascript
//within render:

<Greeting isLoggedIn={false} />
```

Can also have conditionals within rendering. 

#### Inline "if and &&"

true && expression returns expression

false && expression returns false (React would skip it)			

```jsx
{x > - && <h2> this is {x} </h2>} 
```

#### If-else inline conditional

`{condition ? trueValue : falseValue}`

#### Preventing Component from rendering

just return null instead of element/component 



## Lists and Keys

render() can display {arrayOfElements} (which could've been generated by map())

Or, you could just return a `<ul><li>......</li></ul>`



#### Keys

Keys help React identify which items have changed/added/removed.

When creating a \<li\> (line in a list), you must provide a key (string).

Pick a string that uniquely identifies a list item among its siblings.

- But doesn't need to be GLOBALLY Unique

Only necessary in the context of an array! (ie. directly in a map function)

Can't get passed down as a property under the name "key" - just assign as a different name 

```jsx
//within a map function: 
<li key={number.toString()}> {number} </li>
```

Could also do the mapping inline 



## Forms (read later)

#### Controllled component

Def: an input form element whose value is based on what happened before.





## Lifting State up 

If multiple components need to keep track of a state, then life the state up to something that can pass the state as a prop

There must be one single source of truth. 

"top-down data flow" 

(see water boiling example in www.reactjs.org/docs/lifting-state-up.html)



## Composition vs. Inheritance  

#### Containment

- props.children: passed directly into their output 
  - {props.children}
  - In some cases, you can split up the children (eg. props.left, props.right)



#### Specialization

#### Composition:

Where a more specific component renders a more generic one 

```javascript
function general(props) {
    return ...
}
    
class specificClass extends React.Component {
    constructor(props) {
        super(props);
        //etc.
    }
    
    render() {
        return <general prop1="something" prop2="something">;
    }
}
   
```

Don't use inheritance! 



## General tips (read more! reactjs.org)

1. Decide on components: 
   1. single responsibility principle: each component should only do one thing. (otherwise, decompose!)
2. Build a static version in React
   1. without interactivity (dont' use state)
   2. for big projects, it's easier to go from bottom-up and test as you build 
3. Identify minimal (but complete) representation of UI state
   1. It isn't a state if it:
      1. is passed in from a parent via props
      2. remains unchanged over time
      3. can compute it based on any other state or props 
4. Identify where state should live
   1. identify ever component that renders something based on that state
   2. find a common owner component
   3. either the common owner or another component higher up in the hierarchy should own the state
   4. if that doesn't work, create a new component to hold the state 
5. Add inverse data flow
   1. callbacks with setState 
   2. in the child, you can access parent's callbacks through the property passed to them. The parent's callback will set the state 







