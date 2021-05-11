const express      = require("express");
const app          = express();
const {v4: uuidv4} = require("uuid");
const db           = require('../Event_Management/databse');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded());

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

app.post('/eventForm/add', (req, res) => {
    const eventDetails = req.body;
    var sql = `INSERT INTO etable (ename , edate, etime, price, uuid) VALUES ("${eventDetails.ename}", "${eventDetails.date}", "${eventDetails.time}", ${eventDetails.price}, "${uuidv4()}")`;
    db.query(sql, (err, data) => {
        if(err){
            throw err;
        }
        console.log("Data successfully inserted");
    });
    res.redirect("/");
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