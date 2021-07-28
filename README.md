# pdf-util-node

Simple Util to get JSON data from a pdf provided through a pdf url 

STEPS TO GET THIS WORKING (After navigating to the root directory):

1. Install pm2 globally on system (in this case your droplet server) from npm 
    
    $ npm i pm2 -g
    
2. Run command to install all node modules used in this project

    $ npm i 
    
3. Start pm2 with server.js

    $ pm2 start server.js
   
4. When to stop the server, simply

    $ pm2 stop server.js
  
5. To check status of running application

    $ pm2 monit
  
6. Request format 

    POST  -  http://{serveraddress}:3000/pdf2json/
  
    request body : { "url" :"http://www.pdf.com/sample.pdf"}
  
    OR
  
    POST  -  multipart-formdata with file key as "pdfFile"
    
    
    
  
   
    
