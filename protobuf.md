# Protocol buffers

Resources: Google's dev resources



### What it is

A Protocol buffer is essentially like a zipper: it encodes objects, primitives, anything into a nonsensical-looking string and passes that string along. It's a lot more efficient than a regular zipper, and it was created by Google.



### Writing the file

In order to encode the file, it will be stored as a .proto file. It will pass along one message, and that message can contain multiple objects-- and those objects could also be other types of messages. 

Each part has a unique numerical tag. These will be used when reading/decoding the message.

