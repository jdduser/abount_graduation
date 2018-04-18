var fs = require('fs');
//该方法是通过回调返回data
fs.readFile('content.txt','UTF-8',function(err,data){
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
})
