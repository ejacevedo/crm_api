import { CreatePlanDto } from "../dto/plan/create.plan.dto";
import { PutPlanDto } from "../dto/plan/put.plan.dto";
import { PatchPlanDto } from "../dto/plan/patch.plan.dto";
import mongooseService from "../../common/services/mongoose.service";
import debug from 'debug';

const log: debug.IDebugger = debug('app:plans-dao');

class PlansDao {

    Schema = mongooseService.getMongoose().Schema;

    planSchema = new this.Schema({
        name: String,
        type: String,
        user: { type:  this.Schema.Types.ObjectId, ref: 'Users' },
        region: { type: this.Schema.Types.ObjectId, ref: 'Regions'},
        status: { type: String,  default: 'active'  },
    },  { timestamps: true });

    Plan = mongooseService.getMongoose().model('Plans', this.planSchema);

    constructor(){
        log('Created new instance of PlansDao');
    }

    async addPlan(planFields: CreatePlanDto){
        const plan = new this.Plan(planFields);
        const newPlan = await plan.save();
        return newPlan._id;
    }

    async getPlans(limit = 25, page = 0) {
        return this.Plan.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async getPlanById(planId: string) {
        return this.Plan.findOne({ id: planId });
    }

    async updatePlanById(
        planId: string,
        planFields: PatchPlanDto | PutPlanDto
    ) {
        const existingPlan = await this.Plan.findOneAndUpdate(
            { _id: planId },
            { $set: planFields },
            { new: true }
        );
        return existingPlan;
    }

    async removePlanById(planId: string) {
        return this.Plan.deleteOne({ _id: planId });
    }

}

export default new PlansDao();


