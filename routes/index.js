var express = require('express');
var router = express.Router();

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/booklist1', function(req, res, next) {
    console.log(req.query.pageNo);
    console.log(req.query.pageSize);
    res.json(require("../data/booklist1.json"));
});

//post请求
router.post('/booklist', function(req, res, next) {
    console.log(req.body.bookType,req.body.pageNo);
    var data= require("../data/booklist"+req.body.bookType+".json");
    var pageTotal =Math.ceil(data.length/req.body.pageSize);
    var pageSize =req.body.pageSize;
    var dataResult=[];
    dataResult=data.slice((req.body.pageNo-1)*req.body.pageSize,req.body.pageSize*req.body.pageNo)


    console.log(dataResult);
    var response ={
      "pageTotal":pageTotal,
        "pageNo":req.body.pageNo,
        "result":dataResult,
        "pageSize":pageSize
    }
    console.log(response);
    res.end(JSON.stringify(response));
});

//根据路径直接传值
/*router.get('/hello/:name/:tel',function (req,res) {
    console.log(req.params.name);
    console.log(req.params.tel);

})*/

module.exports = router;
