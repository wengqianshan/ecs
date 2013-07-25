
/*
 * GET home page.
 */
 var config = require('../config');
var ECS = require('aliyun-ecs');
var AccessKeyID = config.AccessKeyID;
var AccessKeySecret = config.AccessKeySecret;

var ecs = new ECS(AccessKeyID, AccessKeySecret);
exports.index = function(req, res){
  res.render('index', { title: 'ECS接口测试' });
};
exports.api = function(req, res){
  var method = req.params.method;
  var query = req.query;
  console.log(method, query);
  if(method){
    var param = {};
    param.Action = method;
    for(var i in query){
      param[i] = query[i];
    }
    console.log(param)
    ecs.doRequest(param, function(err, response, body){
      res.json({
        status: true,
        data: JSON.parse(body)
      })
    })
  }else{
    res.json({
      status: false,
      data: {} 
    })
  }

}