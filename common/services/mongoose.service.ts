import mongoose from 'mongoose';
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose:services');

class MongooseService {
    private count = 0;
    private mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        useFindAndModify: false,
        retryWrites: true,
        w: "majority",
    }
    
    private DB_HOST = process.env.DB_HOST;
    private DB_NAME = process.env.DB_NAME;
    private DB_USER = process.env.DB_USER;
    private DB_PASSWORD = process.env.DB_PASSWORD;

    constructor(){
        this.connectWithRetry();
    }

    getMongoose(){
        return mongoose;
    }

    connectWithRetry(){
        log('Attempting MongoDB connection (will retry if needed)');
        const MONGO_URI = `mongodb+srv://${this.DB_USER}:${this.DB_PASSWORD}@${this.DB_HOST}/${this.DB_NAME}`;
        mongoose.connect(MONGO_URI, this.mongooseOptions)
        .then(() => {
           log('MongoDB is conected');
        })
        .catch((err) => {
            const retrySeconds = 5;
            log(`MongoDB connection unsuccessfull (will retry #${++this.count} after ${retrySeconds} seconds):`);
            setTimeout(this.connectWithRetry,retrySeconds * 1000);
        })
    }
}

export default new MongooseService();