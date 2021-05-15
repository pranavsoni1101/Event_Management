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

// To store data into the db
app.post('/eventForm/add', (req, res) => {
    const eventDetails = req.body;
    let sql = `INSERT INTO etable (ename , edate, etime, price, location, uuid) VALUES ("${eventDetails.ename}", "${eventDetails.date}", "${eventDetails.time}", ${eventDetails.price}, "${eventDetails.location}", "${uuidv4()}")`;
    db.query(sql, (err, data) => {
        if(err){
            throw err;
        }
        console.log("Data successfully inserted");
    });
    res.redirect("/event-details");
});

// To edit event form
app.get('/eventForm/edit/:id', (req, res) => {
    const {id} = req.params;
    let sql = `SELECT * FROM etable WHERE uuid = "${id}"`;
    db.query(sql, (err, data) =>{
        if(err){
            throw err;
        }
        res.render("editEventForm", { title: "Update event form", eventData: data[0]});
    });
});

// Updating edited form
app.post('/eventForm/edit/:id', (req, res) =>{
    const {id} = req.params;
    const eventDetails = req.body;
    let sql = `UPDATE etable SET ename="${eventDetails.ename}", edate="${eventDetails.date}", etime="${eventDetails.time}", price=${eventDetails.price}, location="${eventDetails.location}" WHERE uuid = "${id}"`;
    console.log(sql);
    db.query(sql, (err, data) => {
        if(err){
            throw err;
        }
        console.log("Data successfully updated");
    });
    res.redirect("/event-details");
})

// To fetch data from the database
app.get('/event-details', (req, res) =>{
    let sql = "SELECT * FROM etable";
    db.query(sql, (err, data) =>{
        if(err){
            throw err;
        }
        res.render("eventList", {title: "Event List", eventData: data});
    });
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