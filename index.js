const express = require("express");
const app     = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

// Setting the Routes
// '/' = Root route
app.get('/', (req, res) => {
    res.render("home");
});

// '/login' = login form
app.get('/login', (req, res) => {
    res.render("login");
});

// '/register' = register form
app.get('/register', (req, res) => {
    res.render("register");
});

//Event Registration form
app.get('/eventForm', (req, res) => {
    res.render("eventForm");
});

//Participant Registration form
app.get('/participantForm', (req, res) => {
    res.render("participantForm");
});

// Fallback Route
app.get('*', (req, res) => {
    res.send("OOPS WRONG PAGE!");
});


app.listen(3000, ()=> {
    console.log("Listening on port 3000");
})