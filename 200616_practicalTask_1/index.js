var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.listen(3000, function(){
	console.log("start!! express server on port 3000")
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	//sendFile의 경로는 절대경로를 사용해야하지만 ___dirname을 활용하여 단축할 수 있다
	res.sendFile(__dirname + "/public/searchFormByPost.html");
});


app.post('/searchPost', function(req, res){
	//console.log(req.body.searchContent);
	res.send("<h1>welcom " + req.body.searchContent + "</h1>");

	//email.ejs 파일에 두번째 인자를 전달함
	// 두번째 인자의 의미는 req.body.email로 받은 값을 email.ejs 내 email이란 변수를 찾아서 치환
	res.render('index.ejs', {'search' : req.body.searchContent});

});