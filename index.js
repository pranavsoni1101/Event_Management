const express = require("express");
const app     = express();

// Setting the Routes
// '/' = Root route
app.get('/', (req, res) => {
    res.send("Home page");
});

// '/login' = login form
app.get('/login', (req, res) => {
    res.send("Login page");
});

// '/register' = register form
app.get('/register', (req, res) => {
    res.send("Register page");
});

// Fallback Route
app.get('*', (req, res) => {
    res.send("OOPS WRONG PAGE!");
});

// app.use(()=> {
//     console.log("We got a request!!");
// });

app.listen(3000, ()=> {
    console.log("Listening on port 3000");
})