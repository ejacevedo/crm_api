import { CreateOrganizationDto } from "../dto/organization/create.organization.dto";
import { PutOrganizationDto } from "../dto/organization/put.organization.dto";
import { PatchOrganizationDto } from "../dto/organization/patch.organization.dto";
import mongooseService from "../../common/services/mongoose.service";
import shortid from "shortid";
import debug from "debug"

const log: debug.IDebugger = debug('app:in-memory-dao');

class OrganizationsDao {

    Schema = mongooseService.getMongoose().Schema;

    organizationSchema = new this.Schema({
        parent: String,
        name: String,
        region:{
            type: this.Schema.Types.ObjectId,
            ref: "Regions"
        },
        plans: [
            {
                plan: { type: this.Schema.Types.ObjectId, ref: "Plans" },
                current: Boolean,
                name: String
            }
        ],
        rules: [
            {
                channel: { type: this.Schema.Types.ObjectId, ref: "Channels" },
                maxQueues: Number,
                maxTickets: Number
            }
        ],
        status: { type: String,  default: 'active'  },
    },  { timestamps: true });

    Organization = mongooseService.getMongoose().model('Organizations', this.organizationSchema);

    constructor(){
        log('Created new instance of OrganizationsDao');
    }

    async addOrganization(organizationFields: CreateOrganizationDto) {
        const organization = new this.Organization(organizationFields);
        const newOrganization = await organization.save();
        return newOrganization._id;
    }

    async getOrganizations(limit = 25, page = 0) {
        return this.Organization.find()
        .limit(limit)
        .skip(limit * page)
        .exec();
    }

    async getOrganizationById(organizationId: string){
        return this.Organization.findOne({ _id: organizationId}).populate('Organization').exec();
    }

    async updateOrganizationById(
        organizationId: string, 
        organizationFields: PatchOrganizationDto | PutOrganizationDto 
    ) { 
        const existingOrganization = await this.Organization.findOneAndUpdate(
            { _id: organizationId },
            { $set: organizationFields },
            { new: true }
        );
        return existingOrganization;
    }

    async removeOrganizationById(organizationId: string){
        return this.Organization.deleteOne({ _id: organizationId}).exec();
    }

}

export default new OrganizationsDao();