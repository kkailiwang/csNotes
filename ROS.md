# ROS

---



rospack find [package name] -> returns the path

roscd [locationname[/subdir]] : allows you to cd directly to a package

​    only finds packages within ROS_PACKAGE_PATH

rosls [locationname[/subdir]]



package.xml includes all teh info. description, maintainers, dependencies, etc. 



catkin_make - builds projects '



folders:

​    build - build space, where cmake adn make are called to build packages 

​    devel - devel space, where executables and libraries go



roscore - run when you're using ROS

​    needs wifi 



to play a rosbag: rosbag play ____ -l (looping)



rosnode list 

​    lists nodes

​    always lists rosout (logs nodes' debugging output)

​    

rosnode info [node]

​    lists info



rosrun [package name] [node name]



rqt_graph creates dynamic graph of what's going on in system 



rostopic -h (evokes avialalbe sub commands) 

​    rostopic echo [topic] - shows data published 

​    rostopic pub - pubishes messages to a given topic 

​        rostopic pub -[number of messages before exiting] [name of topic to publish to] [message type] [arguments]

​        pub [name of topic] [message type] -r 1 (sends 1 Hz)\

​    rostopic hz [topic] - rate at which data is published



rosservice - send request, receive response 

​    list (lists all the services) 

​    rosservice type /spawn | rossrv show -> shows info for the service 



rosparam 







## Concepts:

​    package: smallest unit to produce. includes a full project 



​    nodes - there's a lot. usually one for each sensor 

​    master - ROS master provides name registration, lookup to rest of computation graph . 

​        parameter server

​    messages

​        passed by nodes

​        data structure (primitive types, arrays, etc.)

​        routed via transport system with publish and subscribe semantics 

​        published to a topic 

​        publisher and subscriber must send and receive the same type of message 

​    topics - name that is used to identify content of message =

​        node will subscribe to a topics

​    services: defined by a pair of message structures. one for request and one for reply. 

​    bags - format for saving and playign back ro smessage data



​    client libraries: python and c++





# rosnodejs

Resources: www.wiki.ros.org/rosnodejs/



rosnodejs is a javascript client library for ROS, built on node.js runtime. It allows javascript projects to communicate with ROS.



## initialization



to start node:

```javascript
//used by plusAI
rosnodejs.initNode('my_node').then((nodeHandle) => { 
  //do stuff
});
```

or 

```javascript
rosnodejs.initNode('my_node').then(() => {
  let nh = rosnodejs.nh;
  //do stuff
});
```

initNode accepts a second object for other options, such as

- rosMasterUri
- onTheFly
- logging
- node



## messages



###message generation

#### using Catkin (kinetic version and later)

built when running catkin_make

package_name/msg/Foo.msg -> `package_name.msg.Foo`

package_name/srv/bar.srv -> `package_name.srv.bar`

files required through `rosnodejs`

```javascript
const std_msgs = rosnodejs.require('std_msgs');
const StringMsg = std_msgs.msg.String;

const SetBool = rosnodejs.require('std_srvs').srv.SetBool;

```



#### on the fly

`rosnodejs.initNode('my_node', {onTheFly: true});`



### message initializaton

directly assign values to embedded messages: 

```javascript
const msg = new geometry_msgs.msg.PoseStamped();
msg.header.frame_id = 'base';
const msg = new std_msgs.msg.String({data: 'Hello'}); //accepts arguments for fields
```





## publishers



Using a NodeHandle from rosnodejs:

```javascript
const nh = rosnodejs.nh;
const pub = nh.advertise('/topic', 'std_msgs/String', {options}); //publishes message with type string


```



#### initialization

Options:

- latching (default = false). if true, last message published is saved and sent to future subscribers that connect 
- tcpNoDelay (no delay on publisher's socket)
- queueSize (default = 1). consecutive calls will add new messages up to queueSize, then older messages are dropped off
- throttleMs (default = 0). minimum interval at which publisher's outgoing message queue is handled. if negative, any call to publish will be handled immediately. 

#### publishing

if type string, then:

```javascript
const msg = new std_msgs.msg.String();
msg.data = 'Hello!';
pub.publish(msg);

//OR

pub.publish({ data: 'Hello!' }); //generic object 
```

publishers are also event emitters. (part of Node.js)

can add handlers for the following events:

- registered (when publisher has successfully been registered with master)
- connection (when a new subscriber connects to publisher)
- disconnect (when subscriber disconnects from publisher)
- error (on the publisher)



## subscribers

```javascript
const std_msgs = rosnodejs.require('std_msgs');

const nh = rosnodejs.nh;
const sub = nh.subscribe('/topic', std_msgs.msg.String, () => {});
```

Options:

- queueSize (default = 1)
- throttleMs (default = 0)

subscribers are also event emitters. 

can add handlers for events:

- registered (subscriber with master)
- message (when new message is ready to be handled)
- connection (new publisher with subscriber)
- disconnect
- Error (with subscriber)

## shutdown

`process.exit()`, `SIGINT`, `rosnodejs.shutdown()`

shutdown hooks:

​		`rosnodejs.on('shutdown', function() {});`

​		`rosnodejs.once('shutdown', function() { });`

​		`rosnodejs.removeListener('shutdown', function(){});`

