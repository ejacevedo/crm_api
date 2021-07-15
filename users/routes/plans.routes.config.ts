
import { CommonRoutesConfig } from '../../common/common.routes.config';
import PlansController from '../controllers/plans.controller'
import BodyValidationMiddleware from '../../common/middleware/body.validation.middleware';
import { body, check } from 'express-validator';
import express from 'express';

export class PlansRoutes extends CommonRoutesConfig {
        constructor(app: express.Application) {
            super(app, 'PlansRoutes');
        }
    
        configureRoutes(): express.Application {
        this.app
            .route('/plans')
            .get(PlansController.listPlans)
            .post(PlansController.createPlan);

        this.app
            .route('/plans/:planId')
            .get(PlansController.getPlanById)
            .put(PlansController.put)
            .patch(PlansController.patch)
            .delete(PlansController.removePlan);

        return this.app;
    }
}