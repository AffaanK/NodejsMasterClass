/**
 * 
 * Primary file of RESTFUL JSON API
 * 
 * it listens to port  and returns a welcome message on route /home
 * 
 */

 //Dependencies
 var http = require('http');
 var url = require('url');


 //Configuring http server
 var server = http.createServer(function(req,res){
  
  var parsedUrl = url.parse(req.url,true);
  //Get the path 
  var path = parsedUrl.pathname;

  //Trim the path ends
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');

  //Get Query string as an Object
  var queryStringObject=parsedUrl.query;  

  //Check the handler for the matching handler if not found use the 'not found' handler
  var selectedHandler = typeof(router[trimmedPath]) !=='undefined' ? router[trimmedPath] : handler.notFound;
    

  //Construct a data object to sent to handler
  var data = {
    'queryString':queryStringObject
  };
  

  //Route the request to the handler specified in the router
  selectedHandler(data,function(statusCode,payload){

    //Use the Default statuscode as 200 if no status code provided
    statusCode = typeof(statusCode) =='number' ? statusCode : 200;

    //Use tha default payload as empty object if no payload provided
    payload = typeof(payload) =='object' ? payload : {};

    //converting to payload to strinf
    let payloadString = JSON.stringify(payload);

    res.setHeader('content-Type','application/json');
    res.writeHead(statusCode);
    res.end(payloadString);
    console.log('responce returned as :',statusCode,payloadString);
  
  });

 });

 server.listen(4000,function(){
  console.log('the server is listening on port 4000');
 });

 //Define the Handler
 var handler={};

 //Home Handler
 handler.home=function(data,callback){
  
  //send the welcome message as responce
  callback(200,{'response': (typeof(data.queryString.name) =='string' ? 'Hi, ' + data.queryString.name : '') +' welcome to Node.js'});  
 };

 //Not Found Handler
 handler.notFound=function(data,callback){
  
  //send the welcome message as responce
  callback(404);
 };


 //Define a router
 var router = {
   'home':handler.home
 };