# Javascript notes

---

Resources: 

- Udacity, Intro to Javascript
- Udacity, ES6
- [https://github.com/getify/You-Dont-Know-JS/tree/master/this%20%26%20object%20prototypes](https://github.com/getify/You-Dont-Know-JS/tree/master/this %26 object prototypes)
- https://medium.com/better-programming/prototypes-in-javascript-5bba2990e04b=

---

##Basics

### Data types

|   Type    | Passed by | Notes                                                        |      |      |      |
| :-------: | :-------: | ------------------------------------------------------------ | ---- | ---- | ---- |
|   bool    |   array   |                                                              |      |      |      |
|   null    | function  | value = nothing                                              |      |      |      |
| undefined |  Object   | absence of value                                             |      |      |      |
|  string   |           | \'\' is preferred over \" \" <br>\\ to escape                |      |      |      |
|  Number   |           | Positive, negative or decimal <br>Could be NaN if returns error |      |      |      |
|   Array   |           |                                                              |      |      |      |
| function  |           |                                                              |      |      |      |
|  Object   |           |                                                              |      |      |      |



**Equality:**

​        `"1" == 1`returns `true`

​       ` 0==false` returns` true`

​        strict equality:` ===` (depends on type)

​		falsy turns false when evaluated in context of boolean expression. (ie.` false, null, undefined, 0, \"\", NaN`)

---

**concatenation**: "hello"+ 5*10 -> hello50

​		in strings, don't have to do \n anymore. 

​		`'${teacher.name} please see ${teacher}'`

**comments**: //, /* */

**ternary operator**: `var color = isGoing ? "green" : "red"` //where isGoing is bool

`switch (option) {`

​        `case 1: \n ....\n  case 2: \n ..`.

​       ` default:` (will fall through and execute this too)

**variables**: 

​	` 	let`- could change later 

​	`const` - won't change

 and const 

 **loops**

```Python
while (x <= 1000) {
}
for (var i = 0; i < 6; i += 1) {
	i++ //returns i and then implements the addition
	++i //implements addition then returns i 
```



---

###Functions

*functions are objects! 

a constructor is just a function that has "new" in front of it

**Prototype**: javascript automatically adds the "prototype" property to a function object.

​        func.prototype.constructor() points directly back to func

​        obj.\_\__proto\_\_ points to the prototype object. \_\_proto\_\_ = "dunder proto"

​        func.prototype===obj.\_\_proto\_\_

​        you can add a property/method to the prototype object. func.prototype.prop = "field"

​            and the rest of the objects created from that construction (with 'new') will be updated with that field 

​            when you do obj.prop, it will first see if obj has a property named prop, then go into obj.prototype's properties 

​		<center>![img ](https://cdn-images-1.medium.com/max/1600/1*5qHhF8HTzZD2xdx3p-RLIQ.png) </center>

**Example**

```python
function heat(a, b) {
	return "hi";
}
```

​    //if there's no return value, undefined will be returned automatically



  **scope:** 

​        can reassign variables from higher in the scope. (everything is by reference...)

​            "shadowing"

  **hoisting** - function declarations are hoisted to the top of the current scope, so you can use them before they're declared

​        in functions, variable declarations are always hoisted to the top of the scope, but not the assignment. so if you did `var x = 6 `later, it would be undefined at the top of the scope but assigned later.

​		NOT FOR LET OR CONST!

or: **function expression** (not hoisted!)

​    `var func = function(max)` { //anonymous function, but can also be named (function name(max))

​        lwejfwoie.....

​       ` return cat`

   ` };`

​    `func();`

​    func will return the function code

​    can use func as an argument for another function! 

​    if a function would only be used once, you can declare inline:

  `  func(function display(x) { console.log("hi")}, "param2");`

​    or can just declare function as usual



**default parameters:** function func(param = 1 )

`Func([a=5, b=5] = []) {  //func() `can also be called, will invoke [a, b]



#### arrow functions

​		paramName => returnValue

​       ` const upperizedNames = ['Kaili', 'Kevin'].map(name => name.toUpperCase()); `(name is the parameter/elem, and changes it.

​        ALWAYS EXPRESSIONS. stored in a variable, passed as an argument to a function, or stored in object's property 

​        if there are 0 or >1 parameters, do: 

​            `const sayHi = () => console.log('hello'); //or could use _ instead of ()`

​            `or const sayHi = (param1, param2) => .... `

block body syntax: 

```javascript
name => { //multiline, use curly braces and return keyword
	name = name.toUpperCase();
	return '${name}';}
```



​    with "this":

​        'this' is based on context. 'this' within arrow function is the same as outside arrow function

​        refers to what obj called the func





---



### arrays

​    `var donuts = [1, 2, 3]`

​    can mix data types

​    methods/properties:

​        length

​        push() -> adds to the end of an array (array.push(3));

​        pop() -> removes element from end of array

​        splice(indexLoc, numToRemove, elemToAdd, elemToAdd, etc.)

​        

​    forEach (only for arrays)

​    **_array_.forEach()**=(func); //where func is the name of a function, func(element), or func(element, index, array)

​        or __array__.forEach(function(param) {

​            ..s ...

​        });



​    **.map(func)** //returns new array, doesn't modify the old one. func has to have "return elem" at the end 

​    **.filter**(condition function that returns true or false)

​	**destructuring** 

​			specifying elements you want to extract from array on left side:`const [x, y, z] = point; //where point = [a, b, c]`

​       	 ignoring elements: `const [x, , z] = point;`

​			







---



### objects

​    includes arrays

​    `var obj = {};`

​    or: 

```javascript
var obj = { //this is object-literal notation
  color: "pink", //key: value 
	isOpen: false,
	open: function() {
}
```

​    data structure that allows you to store any data. 

​    **typeof \_\_** -> returns the type

​    **property vs method** 

​        obj.prop or obj["prop"] (dot vs bracket notation)

​        obj.method()

​        property names: don't use numbers as the first character in property names

​            don't use spaces or hyphens either

​	**destructuring** - `const {prop1, prop2, prop3} = obj; `//given that those are the actual property names

​	 **object literal shorthand**

​        if the variables are the same names as the fields, then just do 

​            `let objName = {field1, field2, field3}; `//assumign fields are vars with values 

​       	 `let objName = {field1, method1() {...}};`

'



##es6, harmony, es2015



   ### iteration



​        there is a new iterable protocol

​        **for...in loop** - elimates counting logic and exit condition.

​            `for (const index in digits) { `//where digits is an array //index is literally the index, not the elem

​            doesn't really work if you add another method to an object (will loop over this property too)

​        **for...of loop** - loops over anything that is iterable

​            for (const digit of digits) { //digit is literally an elem

​        

​        //continue goes to the next iteration of the loop immediately 



    ### spread & rest operator (…)



**Spread**

​        expands/spreads iterable objects into multiple elements

​        `console.log(...arr); `which prints all the elements in array arr, separated by spaces 

 **rest** parameter: represents indefinite number of elements as an array

​        ...items = arr //where you don't know how many elements arr is  (boxing the elements)



**variadic functions**: takes an indefinite number of arguments 

​            `function sum(...nums) {`



###this

In order of priority:       

1. new binding

​           ` var bar = new foo(2); //'this' within foo will refer to bar `

2. explicit binding (with call(obj))

   hardbinding can't change what var bar = foo.call(obj) binds to 

3. implicit binding

   `obj1.foo()`

   implicit lost: whenenver references link back to original function

4. default binding: points at global object, or undefined if in `"use strict";`

​            