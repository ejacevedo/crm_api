import mongoose from 'mongoose';
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose:services');

class MongooseService {
    private count = 0;
    private mongooseOptions = {
        useNewUrlParse: true,
        useUnifiedTopoly: true,
        serverSelectionTimeoutMS: 5000,
        userFindAnyModify: false
    }

    constructor(){
        this.connectWithRetry();
    }

    getMongoose(){
        return mongoose;
    }

    connectWithRetry(){
        log('Attempting MongoDB connection (will retry if needed)');
        mongoose.connect('mongodb+srv://root:yc2seYhU8T4gfgS@cluster0.npbmr.mongodb.net/test?authSource=admin&replicaSet=atlas-wjf8a9-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true')
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