import { CommonRoutesConfig } from '../../common/common.routes.config';
import OrganizationsController from '../controllers/organizations.controller';
import BodyValidationMiddleware from '../../common/middleware/body.validation.middleware';
import { body, check } from 'express-validator';
import express from 'express';

export class OrganizationsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'OrganizationsRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/organizations`)
            .get(OrganizationsController.listOrganizations)
            .post(OrganizationsController.createOrganization);

        this.app
            .route('/organizations/:planId')
            .get(OrganizationsController.getOrganizationById)
            .put(OrganizationsController.put)
            .patch(OrganizationsController.patch)
            .delete(OrganizationsController.removeOrganization);
            
        return this.app;
    } 
}