
import { CommonRoutesConfig } from '../../common/common.routes.config';
import RegionsController from '../controllers/regions.controller';
import BodyValidationMiddleware from '../../common/middleware/body.validation.middleware';
import { body, check } from 'express-validator';
import express from 'express';

export class RegionsRoutes extends CommonRoutesConfig {
        constructor(app: express.Application) {
            super(app, 'UsersRoutes');
        }
    
        configureRoutes(): express.Application {
        this.app
            .route('/regions')
            .get(RegionsController.listRegions)
            .post(RegionsController.createRegion);

        this.app
            .route('/regions/:regionId')
            .get(RegionsController.getRegionById)
            .put(RegionsController.put)
            .patch(RegionsController.patch)
            .delete(RegionsController.removeRegion);

        return this.app;
    }
}