//const http=require('http');
//const httpserver=http.createServer();
const {Server} =require("socket.io")

const io = new Server();

//console.log("socketio runing");

var lat_s=31.09908;
var lon_s=121.850717;
var lat_e=31.087875;
var lon_e=121.85475;

var lat=31;
var lon=121;

function LerpNum(a,b,c){
    c = c < 0 ? 0 : c;
    c = c > 1 ? 1 : c;
    return a + (b - a) * c;
}
var total=100;
var _inc=0;

io.on('connection', socket => {
    console.log("a user connected:"+socket);
    socket.on('bustate',()=>{
        data="{\"state\":\"good\",\"busnumber\":\"1\"}",
        console.log(data);
        socket.emit('bustate',data);

    });

    socket.on('busdata',()=>{
        lat=LerpNum(lat_s,lat_e,_inc/total);
        lon=LerpNum(lon_s,lon_e,_inc/total);
        _inc++;
        if(_inc>total)
        {
            _inc=0;
        }    
        
        console.log("lat:"+lat+" lon:"+lon+" index: "+_inc);

        var busgps=`{\"busid\":\"通勤15线\",\"lat\":\"`+(lat)+`\",\"lon\":\"`+(lon)+`\",\"height\":\"16\",\"bearing\":\"343\",\"speed\":\"30km/h\",\"time\":\"20220807 12:00:00\"}`;

        console.log("server data: "+busgps);
        socket.emit('busdata',busgps);
    });
    socket.on('disconnect',()=>{console.log('a user quit')});
 });


io.listen(3000);
//httpserver.listen(3000,()=>{
//    console.log('listening on *:3000');
//})