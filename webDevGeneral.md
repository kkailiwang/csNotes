# General Web Development

---

Resources: 

- Youtube: Web Demystified (by Mozilla Hacks)
- Mozilla Developer Network



Client sends requests to retrieve all the necessary remote documents (html, css, javascript) to load a page.

![](./Client-server.jpg)





### Other parts

- Transmission Control Protocol, Internet Protocol
  - communication protocols that define how data travels the web
  - how data gets around
- Domain Name Servers
  - like address book for websites. 
  - IP address: represents unique location on web. is the real address
- Hypertext Transfer Protocol
  - defines language for clients and servers to speak to each other



### Html, css, and javascript



#### Integrating css and html

In index.html \<head\>, use:

```html
<link href="styles/style.css" rel="stylesheet"> 
```

(assuming in styles folder)

Box model: 

![](./box-model.png)





#### Javascript and html

```html
<script src="scripts/main.js"></script>
```



### DOM (Document Object Model)

The programming interface for HTML and XML documents, represents doc as nodes and objects. 

Javascript uses the DOM to access documents and its elements. 

| Data type in the API | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| Document             | root document object                                         |
| Node                 | aka element in the document                                  |
| Element              | type is based on the node.                                   |
| NodeList             | array of elements (eg. document.getElementsByTagName()) <br>access: list.item(1) or list[1] |
| Attribute            | object reference that exposes interface for attributes.      |
| NamedNodeMap         | array                                                        |



Will mostly use objects `Document` and `window`. 

**Common APIs:**

document.getElementById(id)
document.getElementsByTagName(name)
document.createElement(name)
parentNode.appendChild(node)
element.innerHTML
element.style.left
element.setAttribute()
element.getAttribute()
element.addEventListener()
window.content
window.onload
console.log()
window.scrollTo()



