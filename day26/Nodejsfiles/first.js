const http=require('http');

const server=http.createServer((req,res)=>{
    const url=req.url;
    const method=req.method;
    console.log(url+" "+method);
    if(url==="/service" && method==="GET")
    {
        res.write("<h1>Service</h1>");
        res.write("<form method='POST'><input type='text' name='txtUserName'><input type='text' name='txtPassword'><button type='submit'>Send</button></form>")
        return res.end();
    }
    if(url==="/service" && method==="POST")
    {
        let userMessage=[];
        let message="Invalid Username or password";
        req.on('data',(myData)=>{
            userMessage.push(myData);
        })
        req.on('end',()=>{
            const parsedData=Buffer.concat(userMessage).toString();
            const user=parsedData.split('&')
            let username=user[0].split('=')[1]
            let password=user[1].split('=')[1]
            console.log(username,password)
            if(username=='Ramu'&& password=='1234')
              message="Welcome user";
            console.log(message);
        })
        //console.log("Service Post")
        res.write("<h1>Post Done</h1>");
        return res.end();
    }
    if(url==="/about")
    {
        res.write("<h1>About</h1>");
        res.end();
    }
    if(url==="/")
    {
        res.write("<h1>Home</h1>");
        res.end();
    }
     res.write("<h1>No such page...</h1>");
    res.end();
    
});
    server.listen(2000);
 console.log("Server Started");