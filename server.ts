import app from './app';
import connectDB from'./config/db';

async function start(): Promise<void> {
    await connectDB();
    app.listen(3000, ()=>{
        console.log("Hosted on http://localhost:3000");
    });
}

start();
