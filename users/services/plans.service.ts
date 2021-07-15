import PlansDao from "../daos/plans.dao";
import { CreatePlanDto } from "../dto/plan/create.plan.dto";
import { PutPlanDto } from "../dto/plan/put.plan.dto";
import { PatchPlanDto } from "../dto/plan/patch.plan.dto";
import { CRUD } from "../../common/crud.interface";

class PlansService implements CRUD {

  async create(resource: CreatePlanDto) {
    return PlansDao.addPlan(resource);
  }

  async list(limit: number, page: number){
    return PlansDao.getPlans(limit, page);
  }

  async readById(id: string) {
    return PlansDao.getPlanById(id);
  }

  async deleteById(id: string) {
    return PlansDao.removePlanById(id);
  }

  async putById(id: string, resource: PutPlanDto) {
    return PlansDao.updatePlanById(id, resource);
  }

  async patchById(id: string, resource: PatchPlanDto) {
    return PlansDao.updatePlanById(id, resource);
  }

}

export default new PlansService();
