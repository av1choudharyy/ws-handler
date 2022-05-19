let socket = {
    readyState:null
}
let array =[];
let entityName;
export const webSocketHandler = async (props,handler) =>{
    function sendData (data) {
        handler.socketHandler(data)
    }
    entityName = props.entityName
    if(socket.readyState === null || socket.readyState === 3){
        socket = new WebSocket(props.URL);
        socket.addEventListener('open',(event) => {onSocketOpen(event,{sendData})});
        socket.addEventListener('message', (event) => {onSocketMessage(event,{sendData})});
        socket.addEventListener('close', (event) => {onSocketClose(event,{sendData})});
        socket.addEventListener('error', (event) => {onSocketError(event,{sendData})});
    }  
    if(array.length>0){
        console.log(`Total ${array.length} Ids detached from connection : ` + array)
    }
    array = [];
    let count = 0;
    props.idArray.forEach(element => {
        array.push(element)
        count++;
    })
    if(props.idArray.length > 0){
        console.log(`Total ${props.idArray.length} Ids attached to connection : ` + props.idArray);
        let connectionDetails = {"action":"saveConnectionDetails","entityName":entityName,"idArray":array}
        saveConnectionDetails(connectionDetails)
    }
}

const onSocketOpen = (event,props) => {
    props.sendData({"type":event.type});
    let connectionDetails = {"action":"saveConnectionDetails","entityName":entityName,"idArray":array}
    saveConnectionDetails(connectionDetails)
    console.log("Connection details saved")
}

const onSocketMessage = (event,props) => {
    props.sendData({"type":event.type,"data":JSON.parse(event.data)});
}

const onSocketClose = (event,props) => {
    props.sendData({"type":event.type});
}

const onSocketError = (event,props) => {
    props.sendData({"type":event.type});
}

const saveConnectionDetails = (props) =>{
    if(socket.readyState===WebSocket.OPEN)
        socket.send(JSON.stringify(props))
}

export const entryAdded = (props) =>{
    props.action = "sendEvents"
    props.eventType = "entryAdded";
    props.entityName = entityName;
    if(socket.readyState===WebSocket.OPEN)
        socket.send(JSON.stringify(props))
}

export const entryUpdated = (props) =>{
    props.action = "sendEvents"
    props.eventType = "entryUpdated";
    props.entityName = entityName;
    if(socket.readyState===WebSocket.OPEN)
        socket.send(JSON.stringify(props))
}

export const entryDeleted = (props) =>{
    props.action = "sendEvents"
    props.eventType = "entryDeleted";
    props.entityName = entityName;
    if(socket.readyState===WebSocket.OPEN)
        socket.send(JSON.stringify(props))
}

export const entryCancelled = (props) =>{
    props.action = "sendEvents"
    props.eventType = "entryCancelled";
    props.entityName = entityName;
    if(socket.readyState===WebSocket.OPEN)
        socket.send(JSON.stringify(props))
}

export const disconnect = () =>{
    if(socket.readyState===WebSocket.OPEN)
        socket.close()
}