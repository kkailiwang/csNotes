# Browser Engines

In order to truly understand the benefits of React, a javascript library for building user interfaces, one needs to understand the basics of how browsers work and how they render HTML, CSS, and JS. Particularly, one needs to investigate the inner workings of the *browser engine*, which is the part of the browser's codebase that's in charge of turning documents into an interactive visual representation for the end user to engage with.

## Three Important Trees

The browser engine works with 3 tree structures: the **DOM**, the **CSSOM**, and the **Render Tree**. DOM stands for "Document Object Model" and is a structure that specifies the elements of the document—paragraphs, headers, links, etc.—and their hierarchical relationships. CSSOM stands for "Cascading Style Sheets Object Model" and is a structure that captures the styling specifications for different kinds of document elements. Lastly, the Render Tree is a structure that captures a document in its entirety—all of its elements as well as the styling information for each one.

Now that we have a general idea for what the browser engine needs in order to paint a screen, the three trees, and what each of these trees are, we move on to the question of how these trees are constructed in the first place.

## Tree Construction

The Render Tree is created from the DOM and CSSOM. That is, it's an extension of the DOM where each node also has styling information queried from recursively traversing the CSSOM tree structure. This being said, it must be constructed after the DOM and CSSOM are constructed. The DOM and CSSOM, however, are more-or-less constructed in parallel (or concurrently if the browser is running on a uniprocessor machine). The reason why I hesitate to assert that DOM and CSSOM construction are independent is because they might not be if there is JS to be run.

In this case, DOM construction waits for JS and JS waits for CSSOM construction, which, by syllogism and transitivity, means that DOM construction waits for CSSOM construction. Why should this be true?

* Building the DOM should wait until JS is done executing because JS can alter the document elements (as well as insert and delete elements).
* Javascript execution should wait until the CSSOM is built because it could be querying the style for a certain element to change it, so the entire CSSOM must be built before this happens.
* The reason why CSSOM construction doesn't wait on Javascript is because screen *repaints* due to JS updating the CSSOM are trivial in comparison to *re-layouts* due to JS updating the DOM.
* By default, all Javascript is parser-blocking (hence render-blocking). This could introduce significant delays if the Javascript is not inline and needs to be separately requested from a remote server. However, Javascript can be marked with the `async` attribute to prevent the parser from blocking.

Note that the browser engine always *starts* with constructing the DOM and only begins constructing the CSSOM when it encounters a link to a CSS stylesheet, makes a request for it from a remote server in another thread, and receives the file.

### DOM Construction

Essentially, the browser engine will request an HTML document, receive the raw bytes that make up the document, convert those bytes into characters according to an encoding scheme (i.e. UTF8), convert those characters into tokens, aggregate the tokens into nodes, and then connect the nodes to form the DOM. To illustrate this point, let's start with some raw bytes.

```
3c 21 44 4f 43 54 59 50 45 20 68 74 6d 6c 3e 0a
3c 68 74 6d 6c 3e 0a 20 20 3c 68 65 61 64 3e 0a
20 20 20 20 3c 6d 65 74 61 20 6e 61 6d 65 3d 22
76 69 65 77 70 6f 72 74 22 20 63 6f 6e 74 65 6e
74 3d 22 77 69 64 74 68 3d 64 65 76 69 63 65 2d
77 69 64 74 68 2c 69 6e 69 74 69 61 6c 2d 73 63
61 6c 65 3d 31 22 3e 0a 20 20 20 20 3c 6c 69 6e
6b 20 68 72 65 66 3d 22 73 74 79 6c 65 2e 63 73
73 22 20 72 65 6c 3d 22 73 74 79 6c 65 73 68 65
65 74 22 3e 0a 20 20 20 20 3c 74 69 74 6c 65 3e
43 72 69 74 69 63 61 6c 20 50 61 74 68 3c 2f 74
69 74 6c 65 3e 0a 20 20 3c 2f 68 65 61 64 3e 0a
20 20 3c 62 6f 64 79 3e 0a 20 20 20 20 3c 70 3e
48 65 6c 6c 6f 20 3c 73 70 61 6e 3e 77 65 62 20
70 65 72 66 6f 72 6d 61 6e 63 65 3c 2f 73 70 61
6e 3e 20 73 74 75 64 65 6e 74 73 21 3c 2f 70 3e
0a 20 20 20 20 3c 64 69 76 3e 3c 69 6d 67 20 73
72 63 3d 22 61 77 65 73 6f 6d 65 2d 70 68 6f 74
6f 2e 6a 70 67 22 3e 3c 2f 64 69 76 3e 0a 20 20
3c 2f 62 6f 64 79 3e 0a 3c 2f 68 74 6d 6c 3e 0a
```

These raw bytes, shown in hexadecimal, will be converted into characters according to the UTF8 character encoding scheme. Note that in the following output, the periods `.` after HTML tags represent newline characters encoded as `0a`, which are invisible. Each line has $16$ characters, which exactly matches up with the raw hexadecimal input which has $16$ numbers per line.

```
<!DOCTYPE html>.
<html>.  <head>.
    <meta name="
viewport" conten
t="width=device-
width,initial-sc
ale=1">.    <lin
k href="style.cs
s" rel="styleshe
et">.    <title>
Critical Path</t
itle>.  </head>.
  <body>.    <p>
Hello <span>web 
performance</spa
n> students!</p>
.    <div><img s
rc="awesome-phot
o.jpg"></div>.  
</body>.</html>.
```

Really, though, the $16$ character per line convention is totally arbitrary and has more to do with the `hexdump` command line tool than anything else. What the browser engine would actually see is something more like the following.

```
<!DOCTYPE html>.<html>.  <head>.    <meta name="viewport" content="width=device-width,initial-scale=1">.    <link href="style.css" rel="stylesheet">.    <title>Critical Path</title>.  </head>.  <body>.    <p>Hello <span>web performance</span> students!</p>.    <div><img src="awesome-photo.jpg"></div>.  </body>.</html>.
```

The browser engine then tokenize these characters into start tags, end tags, and text elements before aggregating them together into node-like structures and linking the nodes into a tree-like structure. This process is best illustrated with a visual.

![](/Users/tankevin/Desktop/reference/browsers/images/dom-construction.png)

### CSSOM Construction

The construction of the CSSOM is very similar to the construction of the DOM. Raw bytes are converted into characters, the characters are turned into tokens, the tokens into nodes, and the nodes aggregated into a tree. The structure and necessarily of the tree structure, however, is less obvious for the CSSOM. Why exactly does it need to be organized into a tree structure? Unlike the HTML document, which already has inherent nesting, the CSS file is written like separate entries in a list. Why conglomerate everything into a tree?

The reason is to allow for **style inheritance**. In the running example, the `font-size: 16px` property will be inherited by all children nodes. This allows for far richer styling capabilities while at the same time preventing unnecessary redundancy. Styles for elements are determined by starting from the most general rule applicable and are continually refined by going further and further down in the tree until a particular node is reached.

![](/Users/tankevin/Desktop/reference/browsers/images/cssom-tree.png)

An important nuance to note is that the above is only a partial CSSOM. Each browser ships with a set of default styling rules for elements known as "user agent styles" that are part of the CSSOM that have been omitted for the above graphic.

### Render Tree Construction

At this point, we have constructed both the DOM and the CSSOM and are ready to combine them together to form the Render Tree. As mentioned above, the combination process is relatively straightforward. It's simply an extension of the DOM with styling elements queried from the CSSOM structure.

![](/Users/tankevin/Desktop/reference/browsers/images/render-tree-construction.png)

## Layout and Paint (Reflow and Rasterize)

With the Render Tree in hand, the browser engine is ready to begin planning where things go on the screen (known as the **layout/reflow** step). At this phase, the engine computes absolute pixel positions of different document elements based on their content size and styling specifications. The result from this step is a "box model" of where all of the elements of a document go on the screen based on the current screen size.

![](/Users/tankevin/Desktop/reference/browsers/images/layout-viewport.png)

Finally, the browser engine can traverse the nodes of the Render Tree and paint each individual pixel on the screen to be the right color; this step can take a bit of time because there is a lot of work to do, and is the final result of the rendering pipeline.

## User Interaction

What happens when you click on something on the webpage that causes the DOM and CSSOM to change? Does the Render Tree need to be recreated from scratch and the layout and paint process executed again?

## React

