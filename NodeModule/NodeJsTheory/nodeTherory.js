/*
Node.js is an open source server environment
Node.js uses asynchronous programming!

Here is how PHP or ASP handles a file request:

Sends the task to the computer's file system.
Waits while the file system opens and reads the file.
Returns the content to the client.
Ready to handle the next request.
Here is how Node.js handles a file request:

Sends the task to the computer's file system.
Ready to handle the next request.
When the file system has opened and read the file, the server returns the content to the client.
Node.js eliminates the waiting, and simply continues with the next request.

Node.js runs single-threaded, non-blocking, asynchronous programming, which is very memory efficient.

Common use for the File System module:

Read files
Create files
Update files
Delete files
Rename files

The fs.readFile() method is used to read files on your computer.

The File System module has methods for creating new files:
fs.writeFile()
fs.appendFile()
fs.open()

The File System module has methods for updating files:
fs.appendFile()

To delete a file with the File System module,  use the fs.unlink() method.
To rename a file with the File System module,  use the fs.rename() method.
*/
