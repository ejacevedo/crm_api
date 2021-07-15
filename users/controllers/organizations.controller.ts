import express from 'express';
import organizationsService from '../services/organizations.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:organizations-controller');

class OrganizationsController {
    async listOrganizations(req: express.Request, res: express.Response){
        const organizations = await organizationsService.list(100, 0);
        res.status(200).send(organizations);
    }

    async createOrganization(req: express.Request, res: express.Response){
        const organizationId = await organizationsService.create(req.body);
        res.status(201).send({ id: organizationId });
    }

    async getOrganizationById(req: express.Request, res: express.Response){
        const plan = await organizationsService.readById(req.params.id);
        res.status(200).send(plan);
    }

    async patch(req: express.Request, res: express.Response) {
        await organizationsService.patchById(req.params.id, req.body);
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        await organizationsService.putById(req.params.id, req.body);
        res.status(204).send();
    }

    async removeOrganization(req: express.Request, res: express.Response) {
        await organizationsService.deleteById(req.params.id);
        res.status(204).send();
    }
}

export default new OrganizationsController;