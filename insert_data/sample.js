var MongoClient =require('mongodb').MongoClient,format=require('util').format;
var http =require('http')
var fs =require('fs')
var q=querystring=require('querystring')
// var popupS = require('popups');
var url ="mongodb://localhost:27017/register"

MongoClient.connect('mongodb://127.0.0.1:27017',function(err ,db){
    if(err){
        throw err;
    }

    else{
        console.log('connected');
    }

    db.close();
});



http.createServer(function(req ,res){

    if(req.url ==='/form'){
            res.writeHead(200,{"Content-Type":"text/html"});
            fs.createReadStream("form.html","UTF-8").pipe(res);
     
    }
     if(req.method=="POST")  {

            var data="";

         req.on("data",function(chunk){
                data+=chunk
         });

         req.on("end",function(chunk){
            
            MongoClient.connect(url,function(err ,db){
                if(err) throw err;
                var q=querystring.parse(data);
                db.collection('products').insertOne(q,function(err ,res){

                    if(err) throw err;
               
 
                    // popupS.alert({
                    //     content: 'Congratulations you are registered'
                    //     });
                    console.log("Successful")
                   
                    db.close();

                });
            })
            
     });   

     }     

}).listen(3000);



//yeah connected