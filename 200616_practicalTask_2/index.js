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


//localhost:3000 접속하면 바로 static 주소인 '/public/searchFormByPost.html'로 이동
app.get('/', function(req, res){
	//sendFile의 경로는 절대경로를 사용해야하지만 ___dirname을 활용하여 단축할 수 있다
	res.sendFile(__dirname + "/public/searchFormByPost.html");
});


app.get('/searchGet', function(req, res){
	res.sendFile(__dirname + "/public/searchFormByGet.html");
});

/*
POST 작동 방식
1. HTML / button(name="searchButton") 클릭 시 action에 따라 '/searchPost' 경로로 searchContent 입력값 전달(->서버)
2. JS / '/searchPost'로 요청이 온 입력값(searchContent)을 처리(welcome 붙이는 등)하여 '/searchPost'에 출력값을 send함

app.post('/searchPost', function(req, res){
	//console.log(req.body.searchContent);
	res.send("<h1>welcom " + req.body.searchContent + "</h1>");

	// index.ejs 파일에 두번째 인자를 전달함
	// 두번째 인자의 의미는 req.body.searchContent로 받은 값을 index.ejs 내 search란 변수를 찾아서 치환
	res.render('index.ejs', {'search' : req.body.searchContent});

});
*/
app.post('/searchPost', function(req, res){
});



//json 형식으로 response 값을 처리함
app.post('/ajax_search', function(req, res){
	console.log(req.body.searchContent);
	var responseData = {'result' : 'ok', 'searchContent' : req.body.searchContent};
	res.json(responseData);
});