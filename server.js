const app = require('./app');
const connectDB = require('./config/db')

connectDB();

app.listen(3000, ()=>{
    console.log("Hosted on http://localhost:3000");
})
