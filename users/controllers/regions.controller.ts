import regionsService from '../services/regions.service';
import express from 'express';
import debug from 'debug';

const log: debug.IDebugger = debug('app:regions-controller');


class RegionsController {

    async listRegions(req: express.Request, res: express.Response) {
        const regions = await regionsService.list(100, 0);
        res.status(200).send(regions);
    }

    async getRegionById(req: express.Request, res: express.Response) {
        const region = await regionsService.readById(req.params.id);
        res.status(200).send(region);
    }

    async createRegion(req: express.Request, res: express.Response) {
        const region = await regionsService.create(req.body);
        res.status(201).send({ _id: region._id });
    }

    async removeRegion(req: express.Request, res: express.Response) {
        const region = await regionsService.deleteById(req.params.id);
        res.status(204).send();
    }

    async patch(req: express.Request, res: express.Response) {
        log('params Id:',req.params.id);
        log('body',req.body);
        const region = await regionsService.patchById(req.params.id, req.body);
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        const region = await regionsService.patchById(req.params.id, req.body);
        res.status(204).send();
    }
}



export default new RegionsController();