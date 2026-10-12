import app from './app';
import connectDB from'./config/db';

connectDB();

app.listen(3000, ()=>{
    console.log("Hosted on http://localhost:3000");
})
