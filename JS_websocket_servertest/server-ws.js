import {WebSocketServer} from 'ws';

const wss =new WebSocketServer({port:8080})


var lat_s=31.09908;
var lon_s=121.850717;
var lat_e=31.087875;
var lon_e=121.85485;

var lat=31;
var lon=121;

function LerpNum(a,b,c){
    c = c < 0 ? 0 : c;
    c = c > 1 ? 1 : c;
    return a + (b - a) * c;
}
var total=100;
var _inc=0;

wss.on('connection',function connection(ws) {
    console.log("a user connected:"+ws);
    
    ws.on('message',function message(data){
        console.log(data);
        if(data=='bustate'){
            data="{\"state\":\"good\",\"busnumber\":\"1\"}",
            console.log(data);
            ws.send(data);
        }else if(data=='busdata'){
            lat=LerpNum(lat_s,lat_e,_inc/total);
            lon=LerpNum(lon_s,lon_e,_inc/total);
            _inc++;
            if(_inc>total)
            {
                _inc=0;
            }    
            
            console.log("lat:"+lat+" lon:"+lon+" index: "+_inc);
    
            var busgps=`{\"busid\":\"通勤15线\",\"lat\":\"`+(lat)+`\",\"lon\":\"`+(lon)+`\",\"height\":\"16\",\"bearing\":\"163\",\"speed\":\"46.8km/h\",\"time\":\"20220807 12:00:00\"}`;
    
            console.log("server data: "+busgps);
            ws.send(busgps);
        }
    });

//   ws.on('bustate',()=>{
//       data="{\"state\":\"good\",\"busnumber\":\"1\"}",
//       console.log(data);
//       ws.emit('bustate',data);
//
//   });
//
//   ws.on('busdata',()=>{
//       lat=LerpNum(lat_s,lat_e,_inc/total);
//       lon=LerpNum(lon_s,lon_e,_inc/total);
//       _inc++;
//       if(_inc>total)
//       {
//           _inc=0;
//       }    
//       
//       console.log("lat:"+lat+" lon:"+lon+" index: "+_inc);
//
//       var busgps=`{\"busid\":\"通勤15线\",\"lat\":\"`+(lat)+`\",\"lon\":\"`+(lon)+`\",\"height\":\"16\",\"bearing\":\"343\",\"speed\":\"30km/h\",\"time\":\"20220807 12:00:00\"}`;
//
//       console.log("server data: "+busgps);
//       ws.emit('busdata',busgps);
//   });

    ws.on('disconnect',()=>{console.log('a user quit')});
 });

