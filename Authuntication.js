==========1st Step===========
//Packages to be installed
express-session
passport
passport-local
passport-local-mongoose


==========2nd Step===========
//importing packages
const passport = require('passport'),
      LocalStrategy = require('passport-local'),
      User = require('./models/user')
      //passport-local-mongoose will be required in User model
      
      
==========3rd Step===========
//creating User model
const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose')
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
})
UserSchema.plugin(passportLocalongoose)
module.exports = mongoose.model('User',UserSchema)


==========4th Step===========
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


==========5th Step===========
//Authentication routes
// show register form
app.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/index"); 
        });
    });
});

// show login form
app.get("/login", function(req, res){
   res.render("login"); 
});
// handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/index",
        failureRedirect: "/login"
    }), function(req, res){
});

// logic route
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/index");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


==========6th Step===========
//creating login forms (method="POST")
<form action="/register" method="post">
    <input type="text" name="username" placeholder="username">
    <input type="password" name="password" placeholder="password">
    <button>Sign Up</button>
</form>


==========7th Step===========
//Adding current user checkup to adjust our Navbar
This could happen by returning currentUser with all routes
res.render("",{currentUser:req.user})
or just adding the below code which will add currentUser:req.user to every Route
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


==========Last Step===========
//This will hide the logIn and signUp once the user is logged in
<% if(!currentUser){ %>
			 	 <li class="nav-item">
					<a class="nav-link" href="/login"> Login</a>
			 	 </li>
			 	 <li class="nav-item">
					<a class="nav-link" href="/register"> Sign Up</a>
			 	 </li>
            <% } else { %>
				  <li class="nav-item">
					<a class="nav-link" href="#">> Signed In As <%= currentUser.username %></a>
			 	 </li>
				 <li class="nav-item">
					<a class="nav-link" href="/logout">> Logout</a>
			 	 </li>
            <% } %>








