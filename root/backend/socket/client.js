var net = require('net');
const readline = require('readline');
const fs = require('fs');

const filepath = "./csv/hair.csv"


// creating a custom socket client and connecting it....
var client  = new net.Socket();
client.connect({
  port:2222
});

client.on('connect',function(){
  console.log('Client: connection established with server');

  console.log('---------client details -----------------');
  var address = client.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Client is listening at port ' + port);
  console.log('Client ip : ' + ipaddr);
  console.log('Client is IP4/IP6: ' + family);


  // writing data to server
  client.write('hello from client');

});

client.setEncoding('utf8');

async function processLineByLine() {
  const fileStream = fs.createReadStream(filepath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    //console.log(`Line from file: ${line}`);
    client.write(line);
    await sleep(1000);
  }
}

function sleep(ms) {
  return new Promise(resolve=>{
    setTimeout(resolve,ms)
  })

}
processLineByLine();

client.on('data',function(data){
  console.log('Data from server:' + data);
});