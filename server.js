const WebSocket = require("ws")

const wss = new WebSocket.Server({ port: 10000 })

let rooms = {}

wss.on("connection", ws => {

let room

ws.on("message", msg => {

const data = JSON.parse(msg)

if(data.type === "join"){

room = data.room

if(!rooms[room]) rooms[room] = []

rooms[room].push(ws)

if(rooms[room].length === 2){
rooms[room][0].send(JSON.stringify({type:"createOffer"}))
}

return
}

rooms[room].forEach(client=>{
if(client !== ws){
client.send(msg.toString())
}
})

})

ws.on("close", ()=>{
if(room && rooms[room]){
rooms[room] = rooms[room].filter(c=>c!==ws)
}
})

})
