# WS-Handler

WS-Handler is a library based on WebSockets to handle cases where we need to attach multiple entities to a single connection.

## Install

`npm install ws-socket`

## Usage

### Import

Code for importing the methods in your page

`import {webSocketHandler,entryAdded,entryCancelled,entryDeleted,entryUpdated} from 'ws-handler';`

### Set App Name, ID Array and URL

The entity name is sent during the creation of the connection and the idArray is used to send the list of attached entities to the same connection.
The URL is the endpoint url of the server.

```
const entityName = "entityName"
const [idArray,setIdArry] = React.useState([])
const URL = url
```

### Declare a function

This function will be used to get the event *object* from the socket handler.

~~~
function socketHandler(event){
	if(event.type == "open"){
		setIsConnected(true);
	}
	else if(event.type == "close"){
		setIsConnected(false);
	}
	else if(event.type == "message"){
		console.log(event.data);
	}
	else if(event.type == "error"){
		console.log("Error Occured");
	}
}
~~~

Here the function **socketHandler** is accepting an event *object* and the type property of this object determines the connection state. The four different type values are
- ***open*** > suggests that connection was successful
- ***close*** > suggests that the connection was closed
- ***message*** > suggests that a message has been received from the server
- ***error*** > there was an error during the process

On successfully receiving a message, we can access the same from data property of the event.

## Calling the Methods

### Establishing a Connection

For sending a connection request, we need to use the webSocketHandler method of the library as follow
```
const connectionObject = {"URL" : URL, "entityName" : entityName, "idArray" : idArray}
webSocketHandler(connectionObject,{socketHandler})
```

Here we called the module and send two parameters 
- First parameter is an **object** containing the entityName and idArray
- Second parameter is the **function** which will be handling the events received from the library

Now it will be better to write this in useEffect hook as whenever the idArray will change the subscribed list of entities will be sent again to the backend.
So the complete code for establishing a connection will be 
```
useEffect(async () => {
	const connectionObject = {"URL" : URL, "entityName" : entityName, "idArray" : idArray}
	webSocketHandler(connectionObject,{socketHandler});
},[idArray])
```

###  Adding an Entity
When we add an entity and needs to notify the server for the same we use **entryAdded**  method

`entryAdded({"eventData" : data})`

###  Deleting an Entity
When we add an entity and needs to notify the server for the same we use **entryAdded**  method

`entryDeleted({"eventData" : data})`

###  Updating an Entity
When we add an entity and needs to notify the server for the same we use **entryAdded**  method

`entryUpdated({"eventData" : data})`

###  Cancelling an Entity
When we add an entity and needs to notify the server for the same we use **entryAdded**  method

`entryCancelled({"eventData" : data})`
<br/>

>NOTE : These methods expects an ***object*** as a parameter having property **eventData**. The *data* passed as a value of this property is an JSON object.
> **entryDeleted** and **entryUpdated** method expects an "ID" property inside the data object.
