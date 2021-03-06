
import { CreateUserDto } from "../dto/user/create.user.dto";
import { PutUserDto } from "../dto/user/put.user.dto";
import { PatchUserDto } from "../dto/user/patch.user.dto";
import mongooseService from "../../common/services/mongoose.service";
import shortid from "shortid";
import debug from "debug";

const log: debug.IDebugger = debug('app:users-dao');

class UsersDao {
    Schema = mongooseService.getMongoose().Schema;

    userSchema = new this.Schema({
        _id: String,
        email: String,
        password: { type: String, select: false },
        firstName: String,
        lastName: String,
        permissionFlags: Number,
        organizations:[
            {
                organization: { type: this.Schema.Types.ObjectId,ref: "Organizations" },
                status: String
            }
        ],
        channels: [
            {
                channel: { type: this.Schema.Types.ObjectId, ref: 'Channels' },
                name: String
            }
        ],
        rules: [
            {
                channel: { type: this.Schema.Types.ObjectId,ref: "Channels" },
                maxQueues: Number,
                maxTickets: Number
            }
        ],
        region: { type: this.Schema.Types.ObjectId, ref: 'Regions' }
    }, { timestamps: true, id: false });
    
    User = mongooseService.getMongoose().model('Users', this.userSchema);

    constructor() {
        log('Created new instance of UsersDao');
    }

    async addUser(userFields: CreateUserDto) {
        const userId = shortid.generate();
        const user = new this.User({
            _id: userId,
            ...userFields,
            permissionFlags: 1,
        });
        await user.save();
        return userId;
    }

    async getUsers(limit = 25, page = 0){
        return this.User.find()
            .populate('organization', 'name -_id')
            .limit(limit)
            .skip(limit * page)
            .exec();
    }
    
    async getUserById(userId: string){
        log('userId:', userId);
        const user = await this.User.findOne({ _id: userId }).populate('organization').exec();
        console.log('user',user);
        return user;
    }

    async updateUserById(
        userId: string,
        userFields: PatchUserDto | PutUserDto
    ){
        const existingUser = await this.User.findOneAndUpdate(
            { _id: userId },
            { $set: userFields },
            { new: true }
        );

        return existingUser;
    }

    async removeUserById(userId: string) {
        return this.User.deleteOne({ _id: userId }).exec();
    }

    async getUserByEmail(email: string){
        return this.User.findOne({ email: email }).exec();
    }

    
}

export default new UsersDao();