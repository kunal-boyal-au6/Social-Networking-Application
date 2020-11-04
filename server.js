//Importing the modules
let dotenv = require("dotenv");
dotenv.config()
let connection = require("./db")
connection()
let express = require("express");
let passport = require('passport')
let cookieParser = require('cookie-parser');
let userRoutes = require("./routes/userRoutes");
let postRoutes = require("./routes/postRoutes");
let commentRoutes = require("./routes/commentRoutes");
let inboxRoutes = require("./routes/inboxRoutes");
let paymentRoutes = require('./routes/paymentRoutes');
let oauthRoutes = require('./routes/oauthRoutes')
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let PORT = process.env.PORT || 8089

//To remove CORS 
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    next();
});



//Body Parser
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(passport.initialize())


//Routes
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(inboxRoutes);
app.use(paymentRoutes);
app.use(oauthRoutes)

io.on('connection', (socket) => {
    // socket.on("userJoin", (data) => {
    // })
    socket.on("message", (data) => {
        socket.broadcast.emit("sendMessage" ,data)
    })
})




//Listing to the server
http.listen(PORT, () => console.log("Server connected"));
