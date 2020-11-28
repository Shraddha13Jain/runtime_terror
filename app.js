var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");


app.use( express.static( "views" ) );
//Connect
mongoose.connect("mongodb://localhost/ayudar",{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");

var contactusSchema= new mongoose.Schema({
  name:String,
  phone:String,
  email:String,
  website:String,
  subject:String,
  message:String
});
// add model
var contactus=mongoose.model("contactus",contactusSchema);

var plasmadonorsSchema= new mongoose.Schema({
  name:String,
  phone:String,
  email:String,
  address:String,
  city:String,
  state:String,
  bloodGroup:String

});
// add model
var plasmadonor=mongoose.model("plasmadonor",plasmadonorsSchema);


var blooddonorsSchema= new mongoose.Schema({
  name:String,
  phone:String,
  email:String,
  bloodGroup:String

});
// add model
var blooddonor=mongoose.model("blooddonor",blooddonorsSchema);
var userSchema= new mongoose.Schema({
  password:String,
  email:String,
  name:String,
  bloodGroup:String
  ,adress:String,
  imageurl:String
});
var user=mongoose.model("user",userSchema);



app.get("/shraadha.html",function(req,res){
res.render("landing");
});

app.get("/",function(req,res){
  res.render("landing");
});


app.get("/ngos.html",function(req,res){
  res.render("ngosname");
});

app.get("/contactus.html",function(req,res){
  res.render("contact");
});
app.post("/contactusSubmit",function(req,res){
  var f_name=req.body.name;
  var f_phn=req.body.phone;
  var f_email=req.body.email;
  var f_website=req.body.website;
  var f_subject=req.body.subject;
  var f_message=req.body.message;
  var newcontact={name:f_name, phone: f_phn,email:f_email,website:f_website,subject:f_subject,message:f_message};
  contactus.create(newcontact,function(err,newcontact){
    if(err){
      console.log(err);
    }else{
      res.render("landing");
    }
})
});


app.get("/donate.html",function(req,res){
  res.render("donate");
});

app.get("/reviewmy.html",function(req,res){
  res.render("review");
});

app.get("/plasmadonors.html",function(req,res){
  res.render("plasmalist");
});

app.post("/plasmaDonor",function(req,res){
  var f_name=req.body.name;
  var f_phn=req.body.phone;
  var f_email=req.body.email;
  var f_city=req.body.city;
  var f_state=req.body.state;
  var f_address=req.body.address;
    var f_bloodGroup=req.body.bloodGroup;
  var newdonor={name:f_name, phone: f_phn,email:f_email,address:f_address,city:f_city,state:f_state,bloodGroup:f_bloodGroup};
  plasmadonor.create(newdonor,function(err,newdonor){
    if(err){
      console.log(err);
    }else{
      console.log(newdonor);
      res.render("plasmalist");
    }
})
});

app.get("/donateb.html",function(req,res){
  res.render("donateb");
});

app.post("/bloodDonor",function(req,res){
  var f_name=req.body.name;
  var f_phn=req.body.phone;
  var f_email=req.body.email;
  var f_bloodGroup=req.body.bloodGroup;
  var newdonor={name:f_name, phone: f_phn,email:f_email,bloodGroup:f_bloodGroup};
  blooddonor.create(newdonor,function(err,newdonor){
    if(err){
      console.log(err);
    }else{
      res.render("landing");
    }
})
});


app.get("/login.html",function(req,res){
  res.render("login");
});

app.get("/signup.html",function(req,res){
  res.render("signup");
});


app.get("/profile.html",function(req,res){
  res.render("profile");
});

app.post("/profile",function(req,res){
  var f_password=req.body.password;
  var f_email=req.body.email;
  var f_name=req.body.name;
  var f_bloodGroup=req.body.bloodGroup;
  var f_address=req.body.address;
  var f_image=req.body.imageurl;

  var userlog={password:f_password,email:f_email,name:f_name,bloodGroup:f_bloodGroup,adress:f_address,imageurl:f_image};
  user.create(userlog,function(err,userlog){
    if(err){
      console.log(err);
    }else{
         console.log(userlog);
    }
})
 res.render("profile",{foundUser:userlog});
});

app.post("/profilel.html",function(req,res){
  var f_password=req.body.password;
  var f_email=req.body.email;
  user.findOne({email:f_email},function(err,user){
    if(err)
      console.log(err);
      else res.render("profile",{foundUser:user});
  })
});


app.listen(3000,function(){
  console.log("Yelpcamp Server Has Started!!!");
});
