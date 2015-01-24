
var express = require('express');
var expressSession = require('express-session');
var app = express();
var ejs = require('ejs');
var request = require('request');
var passport = require('passport');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passportLocal = require('passport-local');
var bcrypt = require('bcrypt');
var connect = mongoose.connect('mongodb://localhost/userinfo', function(err) {})
var db = mongoose.connection;
//App uses
db.once('open', function() {
    console.log('db is open')
});
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SCRET || 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(__dirname + '/vendor'));
app.use(passport.initialize());
app.use(passport.session());
var urluser;
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    summonername: String,
    salt: String
});
var newuserinfo = mongoose.model('userinformation', userSchema);
passport.use('user', new passportLocal.Strategy(function(username, password, done) {
    console.log(username)
    newuserinfo.findOne({
        "username": username
    }, function(err, newuserinfo) {
        if (bcrypt.compareSync(password, newuserinfo.password)) {
	 done(null, {
        username: username,
	summonername:newuserinfo.summonername
	// above line is USER OBJECT!
		
            });
        } else {
            done(null, null);
        }
    })
}))
passport.serializeUser(function(user, done) {
    done(null, {summoner:user.summonername,user:user.username});
});
passport.deserializeUser(function(username, done) {
    done(null, {
        username:username
    });
});
app.get('/', function(req, res) {
console.log(req.session.passport);
    res.render('index.ejs', {
        isAuthenticated: req.isAuthenticated(),
        user: req.session.passport
    });
});
app.post('/', passport.authenticate('user'), function(req,res){
	console.log(req.user.summonername);
	res.redirect('user/'+ req.user.summonername)
});
app.post('/register', function(req, res) {
    console.log(req.body.regname);
    var newusername = req.body.username;
    var newuserpass = req.body.password;
    var newsummoner = req.body.summonername;
    if (newusername == undefined) {
        newuserinfo.findOne({
            username: req.body.checkname
        }, function(err, newinformation) {
        });
    } else {
	var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(newuserpass, salt);
	 var newaccountinfo = new newuserinfo({
            username: newusername,
            password: hash,
            summonername: newsummoner,
	    salt: salt
        });
        var resultcount = newuserinfo.findOne({
            "username": newusername
        }, function(err, newuserinfo) {
            if (newuserinfo == null) {

                newaccountinfo.save(function(err) {
                    res.redirect('/#loginsuccess');
                })
                console.log('you registered');
            } else {
                console.log(' this name exists');
		
                    res.redirect('/#logfail');
            }
        });
        console.log('complete');
    }
});
//register and login
app.get('/register', function(req, res) {
    res.render('register.ejs');
})
app.get('/login', function(req, res) {
    res.render('login.ejs');
});
app.post('/login', passport.authenticate('local'), function(req, res) {});
//riot api userinfos
app.get('/user/:name', function(req, res) {
 var username = req.params.name;
var useresc  = username.replace(/\s+/g, '');
    var options = {
        method: "GET",
        url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + username,
        qs: {
            api_key: "2ee8e653-62c7-403a-baf1-8e7bc56d0848"
        },
        headers: {
            "User-Agent": "usernames"
        }
    }
    request(options, function(error, response, body) {
 var usernameget = JSON.parse(body); //use this as the value of local
 var useridurl = usernameget[useresc].id     
 //res.locals = {resuserinfokey: usernameget}; //key goes in template
        //console.log(usernameget);
        var option = {
            method: "GET",
            url: "https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/" + useridurl  + "?rankedQueues=RANKED_SOLO_5x5&beginIndex=0&endIndex=5&",
            qs: {
                api_key: "2ee8e653-62c7-403a-baf1-8e7bc56d0848"
            },
            headers: {
                "User-Agent": "userid"
            }
        }
        request(option, function(error, response, body) {
            var userstatsget = JSON.parse(body); // use this as the value of local
            res.locals = {
                resuserstatsget: userstatsget,
                resusernameget: usernameget
            };
           
    res.render('users.ejs', {
        isAuthenticated: req.isAuthenticated(),
        user: req.session.passport
    });
        });
    });
});
//riot api items
app.get('/items', function(req, res) {
    var options = {
        method: "GET",
        url: "https://na.api.pvp.net/api/lol/static-data/na/v1.2/item?itemListData=all&",
        qs: {
            api_key: "2ee8e653-62c7-403a-baf1-8e7bc56d0848"
        },
        headers: {
            "User-Agent": "usernames"
        }
    }
    request(options, function(error, response, body) {
        var itemget = JSON.parse(body); //use this as the value of local
        res.locals = {
            resitemget: itemget
        }; //key goes in template
    res.render('items.ejs', {
        isAuthenticated: req.isAuthenticated(),
        user: req.session.passport
    });
    });
});
app.get('/items/:id', function(req, res) {
    var options = {
        method: "GET",
        url: "https://na.api.pvp.net/api/lol/static-data/na/v1.2/item/" + req.params.id + "?itemData=all&",
        qs: {
            api_key: "2ee8e653-62c7-403a-baf1-8e7bc56d0848"
        },
        headers: {
            "User-Agent": "usernames"
        }
    }
    request(options, function(error, response, body) {
        var specitemget = JSON.parse(body); //use this as the value of local
        res.locals = {
            resspecitemget: specitemget
        }; //key goes in template
        res.render('specitems.ejs');
    });
});
app.get('/champions', function(req, res) {
    var options = {
        method: "GET",
        url: "https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=all&",
        qs: {
            api_key: "2ee8e653-62c7-403a-baf1-8e7bc56d0848"
        },
        headers: {
            "User-Agent": "usernames"
        }
    }
    request(options, function(error, response, body) {
        var championsget = JSON.parse(body); //use this as the value of local
        res.locals = {
            reschampionsget: championsget
        }; //key goes in template
        
    res.render('champions.ejs', {
        isAuthenticated: req.isAuthenticated(),
        user: req.session.passport
    });
    });
});
app.get('/champions/:id', function(req, res) {
    var options = {
        method: "GET",
        url: "https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + req.params.id + "?champData=all&",
        qs: {
            api_key: "2ee8e653-62c7-403a-baf1-8e7bc56d0848"
        },
        headers: {
            "User-Agent": "usernames"
        }
    }
    request(options, function(error, response, body) {
        var specchampionget = JSON.parse(body); //use this as the value of local
        res.locals = {
            resspecchampionget: specchampionget
        }; //key goes in template
        res.render('specchampion.ejs', {
	isAuthenticated: req.isAuthenticated(),
	user: req.session.passport
	});
    });
});
app.listen(8080, function() {
    console.log("listening on 8080!");
});
