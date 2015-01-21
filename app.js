//requirements
var express = require('express');
var app = express();
var ejs = require('ejs');
var request = require('request');
var passport = require('passport');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passportLocal = require('passport-local');
var connect = mongoose.connect('mongodb://localhost/userinfo',function(err){  
})
var db = mongoose.connection;
//App uses
AA
db.once('open', function(){console.log('db is open')});
app.use(bodyParser.urlencoded({extended: false }));
app.use(cookieParser());
app.use(expressSession({secret:process.env.SESSION_SCRET || 'secret',
  resave:false,
  saveUninitialized:false
}));

app.use(express.static(__dirname + '/vendor'));
app.use(passport.initialize());
app.use(passport.session());
  var userSchema = mongoose.Schema({
    username: String,
    password: String,
    summonername: String,
  });  

var newuserinfo = mongoose.model('userinformation', userSchema);
passport.use( 'user', new  passportLocal.Strategy(function(username, password,done){
console.log(username)
	newuserinfo.findOne({"username": username}, function (err, newuserinfo){
console.log(newuserinfo);
if ( password == newuserinfo.password){
done(null,{id:username});
}else{


console.log(newuserinfo.password + password);
done(null,null);
}
})
}))
passport.serializeUser(function(user, done){
done(null,user.id);
});
passport.deserializeUser(function(id, done){
done(null,{id:id});
});
app.get('/', function(req,res){
  res.render('index.ejs',{
 isAuthenticated: req.isAuthenticated(),
 user: req.user
  });
});

app.post('/', passport.authenticate('user'), function(req,res){
console.log('redirect')
res.redirect('/items');
  var checkusername = req.body.username;
  var checkpassword = req.body.password;

});
app.post('/register', function(req,res){
console.log(req.body.regname);
console.log('ethan');
  var newusername = req.body.regname;
  var newuserpass = req.body.regpass;
  var newsummoner = req.body.summonername;
 if(newusername == undefined){
	
	newuserinfo.findOne({username: req.body.checkname}, function (err, newinformation){
console.log(newinformation.password);
});
}else{
  var newaccountinfo = new newuserinfo({username: newusername, password:newuserpass, summonername:newsummoner});
  var resultcount = newuserinfo.findOne({"username": newusername}, function(err,newuserinfo){
 if(newuserinfo == null){
	
  newaccountinfo.save(function (err){console.log(err);}) 
console.log('you registered');
}else{
	console.log(' this name exists');
}
});
  console.log('complete'); 
}
});
//register and login
app.get('/register', function(req, res){
  res.render('register.ejs');
})
app.get('/login', function(req, res){
  res.render('login.ejs');
});
app.post('/login', passport.authenticate('local'), function(req, res){});

//riot api userinfos
app.get('/user/:name', function(req, res){
  var username = req.params.name 
     var options ={
    method:"GET",
    url:"https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + req.params.name,
    qs:{
      api_key:"2ee8e653-62c7-403a-baf1-8e7bc56d0848"
    },
    headers:{
      "User-Agent": "usernames"
    }
  }

request(options, function(error,response,body){
  var usernameget = JSON.parse(body); //use this as the value of local
  //res.locals = {resuserinfokey: usernameget}; //key goes in template
//console.log(usernameget);
var userapi = usernameget[username].id;

var  option ={
    method:"GET",
    url:"https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/" + userapi + "?rankedQueues=RANKED_SOLO_5x5&beginIndex=0&endIndex=15&" ,
    qs:{
      api_key:"2ee8e653-62c7-403a-baf1-8e7bc56d0848"
    },
    headers:{  
      "User-Agent": "userid"
    }
  }
  request(option,function(error,response,body){
   var userstatsget = JSON.parse(body);// use this as the value of local
res.locals = {
      resuserstatsget:userstatsget,
      resusernameget:usernameget
    }; 
res.render('users.ejs');

});
});

});
//riot api items
app.get('/items', function(req, res){
  var options ={
    method:"GET",
    url:"https://na.api.pvp.net/api/lol/static-data/na/v1.2/item?itemListData=all&",
    qs:{
    api_key:"2ee8e653-62c7-403a-baf1-8e7bc56d0848"
    },
    headers:{
      "User-Agent":"usernames"
    }
  }
  request(options, function(error,response,body){
    var itemget = JSON.parse(body); //use this as the value of local
    res.locals = {resitemget:itemget};//key goes in template
    res.render('items.ejs');
  });
});

app.get('/items/:id', function(req, res){
  var options ={
    method:"GET",
    url:"https://na.api.pvp.net/api/lol/static-data/na/v1.2/item/" + req.params.id + "?itemData=all&",
    qs:{
    api_key:"2ee8e653-62c7-403a-baf1-8e7bc56d0848"
    },
    headers:{
      "User-Agent":"usernames"
    }
  }
  request(options, function(error,response,body){
    var specitemget = JSON.parse(body); //use this as the value of local
    res.locals = {resspecitemget:specitemget};//key goes in template
    res.render('specitems.ejs');
  });
});

app.get('/champions', function(req, res){
        var options ={
                method:"GET",
                url:"https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=all&",
                qs:{
                api_key:"2ee8e653-62c7-403a-baf1-8e7bc56d0848"
                },
                headers:{
                        "User-Agent":"usernames"
                }
        }
        request(options, function(error,response,body){
                var championsget = JSON.parse(body); //use this as the value of local
                res.locals = {reschampionsget:championsget};//key goes in template
                res.render('champions.ejs');
        });
});
app.get('/champions/:id', function(req, res){
  var options ={
    method:"GET",
    url:"https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + req.params.id +  "?champData=all&",
    qs:{
    api_key:"2ee8e653-62c7-403a-baf1-8e7bc56d0848"
    },
    headers:{
      "User-Agent":"usernames"
    }
  }
  request(options, function(error,response,body){
    var specchampionget = JSON.parse(body); //use this as the value of local
    res.locals = {resspecchampionget:specchampionget};//key goes in template
    res.render('specchampion.ejs');
  });
});


app.listen(8080, function(){
  console.log("listening on 8080!");
});

