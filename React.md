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



#### Props must be read only

All react components must be pure functions with respect to their props (can never modify its own props).

Instead, they can modify state. 



## State

Similar to props, but private and fully controlled by component. So then a component can keep itself updated.

##### Never modify a state directly

- do: `this.setState({field: value});`
- or: function is the parameter

```javascript
this.setState(func); //where func accepts parameters (state, props), which is from previous state 

or

this.setState((state, props) => ({
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

