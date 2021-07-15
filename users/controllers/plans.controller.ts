import plansService from '../services/plans.service';
import express from 'express';
import debug from 'debug';

const log: debug.IDebugger = debug('app:plans-controller')

class PlansController { 

    async listPlans(req: express.Request, res: express.Response){
        const plans = await plansService.list(100, 0);
        res.status(200).send(plans);
    }

    async getPlanById(req: express.Request, res: express.Response) {
        const plan = await plansService.readById(req.params.id);
        res.status(200).send(plan);
    }

    async createPlan(req: express.Request, res: express.Response) {
        const regionId = await plansService.create(req.body);
        res.status(201).send({ id: regionId });
    }

    async patch(req: express.Request, res: express.Response){
        await plansService.patchById(req.params.id, req.body)
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        await plansService.putById(req.params.id, req.body)
        res.status(204).send();
    }

    async removePlan(req: express.Request, res: express.Response) {
        await plansService.deleteById(req.params.id);
        res.status(204).send();
    }
}

export default new PlansController();
