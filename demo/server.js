/**
 * Created by chaijiang on 2017/11/6.
 */
var PORT = 3000;

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var querystring = require('querystring');
var bodyParser = require('body-parser');
var express = require('express');
var app = express()
app.use(bodyParser.json());

var cors = require('cors')
app.use(cors())
var showdata = {yk:[],iqiyi:[],tencent:[]}
var ykData = require('./resultsJson/youku.json')
var iqiyiData = require('./resultsJson/iqiyi.json')
var result = require('./resultsJson/result.json')
var keyTime = require('./resultsJson/keyTime.json')
app.listen(PORT);

//逐行读取
function readLines(input, func,response) {
  console.log('....')
  var remaining = '';
  var res=[];

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      res.push(func(line));
      index = remaining.indexOf('\n');
    }
 
  });
  response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
  input.on('end', function() {
    if (remaining.length > 0) {
      res.push(func(remaining));
      response.end(JSON.stringify(res),'utf-8');
    }else{
      response.end(JSON.stringify(res),'utf-8');
    }
  });
}
 
function func(data) {
  if(data.indexOf('（')){
  	var name = data.slice(0,data.indexOf('（'))
  	var description = data.slice(data.indexOf('（')+1,data.indexOf('）'))
  	var searchkey = data.slice(data.indexOf('：')+1,-1)
  	var res={'name':name,'description':description,'searchkey':searchkey}
  	return res
  }
}
 

var urlencodedParser = bodyParser.urlencoded({ extended: false })  

app.get('/getDocumentaryDetail',urlencodedParser,function(req,response){
  console.log(req.query.item)
  var querystring = req.query.item
  var resJson;
  for(var key in result){
    if(querystring==key){
      resJson = result[key]
      break;
    }else{
      outer1:
      for(var everyrelation in result[key]){  //每种关系
        var alltypedata=result[key][everyrelation]
        for(var everytype in alltypedata["data"]){   //关系下的所有类型
          var everytypedata = alltypedata["data"][everytype]
          if(querystring.toString()==everytypedata["value"]){
            resJson=everytypedata["data"]
            break outer1;
          }else{
            outer2:
            for(everyralation1 in everytypedata["data"]){   //每种关系
              var alldocumentarydata= everytypedata["data"][everyralation1]
              for(everydocumentary in alldocumentarydata["data"]){  //类型关系下的所有纪录片
                  var everydocumentarydata=alldocumentarydata["data"][everydocumentary]
                  if(querystring.toString()==everydocumentarydata["value"]){
                    resJson=everydocumentarydata["data"];
                    break outer1;
                  }else{
                    resJson="fail";
                  }
              }
              
            }
          }
        }
        
      }
    }
  }
  response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
  response.end(JSON.stringify(resJson),'utf-8');
  //var input = fs.createReadStream('./text/text1.parse.txt');
  //readLines(input, func, response);
})

app.get('/getKeyDetail',urlencodedParser,function(req,response){
  console.log(req.query.item)
  var searchkey=req.query.item
  console.log(keyTime)
  console.log(keyTime[searchkey])
  response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
  response.end(JSON.stringify(keyTime[searchkey]),'utf-8');
  // var input = fs.createReadStream('./text/text1.parse.txt');
  // readLines(input, func, response);
})

//可视化部分
app.get('/getTop10',urlencodedParser,function(req,res){
  var result={'iqiyi':{'xaxis':[],'yaxis':[]},'yk':{'xaxis':[],'yaxis':[]},'tecent':{'xaxis':[],'yaxis':[]}}
  for(var i =0;i<iqiyiData.length;i++){
    result.iqiyi.xaxis.push(iqiyiData[i].name),
    result.iqiyi.yaxis.push(iqiyiData[i].vv)
  }
  for(var i =0;i<ykData.length;i++){
    result.yk.xaxis.push(ykData[i].name),
    result.yk.yaxis.push(ykData[i].vv)
  }

  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
  res.end(JSON.stringify(result),'utf-8');
})

app.get('/getTypeCount',urlencodedParser,function(req,res){
  var sumcount=0;   //记录总数量
  var types={};
  for(var i =0;i<iqiyiData.length;i++){
    if(iqiyiData[i].tag in types){
      types[iqiyiData[i].tag]++;
    }else{
      types[iqiyiData[i].tag]=1;
    }
    sumcount++;
  }
  for(var i =0;i<ykData.length;i++){
    for(var item in ykData[i].tag){
      if(ykData[i].tag[item] in types){
        types[ykData[i].tag[item]]++;
      }else{
        types[ykData[i].tag[item]]=1;
      }
    }
    sumcount++;
  }
  var result = {'types':[],'data':[]};
  for( var key in types){
    result.types.push(key)
    result.data.push({'value':types[key],'name':key})
  }
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
  res.end(JSON.stringify(result),'utf-8');
})

app.get('/getScore',urlencodedParser,function(req,res){
  var result={'iqiyi':{'xaxis':[],'yaxis':[]},'yk':{'xaxis':[],'yaxis':[]},'tecent':{'xaxis':[],'yaxis':[]}}
  for(var i =0;i<iqiyiData.length;i++){
    result.iqiyi.xaxis.push(iqiyiData[i].name),
    result.iqiyi.yaxis.push(iqiyiData[i].score)
  }
  for(var i =0;i<ykData.length;i++){
    result.yk.xaxis.push(ykData[i].name),
    result.yk.yaxis.push(ykData[i].score)
  }

  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
  res.end(JSON.stringify(result),'utf-8');
})


