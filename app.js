
//require의 기능은 node_modules에서 매개변수로 받는 파일에서 함수를 불러옴
var express = require('express');
var app = express();

//bodyparser를 사용하기 위한 객체생성 및 require
var bodyParser = require('body-parser');

//listen은 3000포트 기반으로 다음의 함수를 실행시킴, listen의 특징은 응답을 받기 전까지 대기한다는 것
//listen은 비동기적으로 실행된다. 다시 말해, 아래 end of server code 부분이 동기적으로 스택에 쌓여 있다가 먼저 실행되고
//추후 비동기 콜백함수인 listen이 실행된다. 
app.listen(3000, function(){
	console.log("start!! express server on port 3000")
});
//listen의 대기상태에서 벗어나면 아래의 출력 확인
//console.log("end of server code")

//js, css, img 등과 같은 static 자료를 인식하기 위해 아래와 같이 해당 자료들이 들어갈 폴더명을 
//static의 인자로 전달한다. 
app.use(express.static('public'));

//bodyparser 사용 시 클라이언트에서 오는 응답이 json형태일 수도 있고 
//json이 아닌 encoding 형태로 올 수 있음. encoding의 예로 아스키 형태 외의 한글 들의 경우
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//view 엔진으로 ejs를 사용함, view 사용 시 지정된 dir를 사용(views)
//set 메소드는 use와 사용이 다름, 첫번째 인자가 두번째 인자를 대신 지칭함을 표현
app.set('view engine', 'ejs');


/*
url routing에 대하여
get 함수에 경로와 콜백함수를 전달한다. 이 함수도 비동기함수이다. 
html 태그를 함께 보내면 브라우저가 해석하여 반영한다. 
*/
app.get('/', function(req, res){
	//res.send("<h1>hello world</h1>");
	//sendFile의 경로는 절대경로를 사용해야하지만 ___dirname을 활용하여 단축할 수 있다
	res.sendFile(__dirname + "/public/main.html");
});

app.get('/main', function(req, res){
	//url(/main)로 사용자가 해당 주소로 request하면 서버는 아래의 sendfile로 response한다. 
	res.sendFile(__dirname + "/public/main.html");
});

app.post('/email_post', function(req, res){
	//get 방식과 달리 post 방식에서는 
	//url이 아니라 폼의 action 경로를 request 값으로 받는다. 이에 대해 아래와 같이 response한다.
	//form.html의 input으로 받은 email 정보를 response하는데 이때 input태그의 name을 활용하여 서버에서 받는 것을 확인
	console.log(req.body.email);
	//res.send("<h1>welcom " + req.body.email + "</h1>");

	//email.ejs 파일에 두번째 인자를 전달함
	// 두번째 인자의 의미는 req.body.email로 받은 값을 email.ejs 내 email이란 변수를 찾아서 치환
	res.render('email.ejs', {'email' : req.body.email});

});

//json 형식으로 response 값을 처리함
app.post('/ajax_send_email', function(req, res){
	console.log(req.body.email);
	var responseData = {'result' : 'ok', 'email' : req.body.email};
	res.json(responseData);
});
