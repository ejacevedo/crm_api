import { CommonRoutesConfig } from '../../common/common.routes.config';
import UsersController from '../controllers/users.controller';
import UsersMiddleware from '../middleware/users.middleware';
import BodyValidationMiddleware from '../../common/middleware/body.validation.middleware';
import { body, check } from 'express-validator';
import express from 'express';

const signUpValidators = [
    check("email").isEmail(),
    check("password").isLength({ min: 5 }).withMessage('Must include password (5+ characters)')
];

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/users`)
            .get(UsersController.listUsers)
            .post(
                UsersMiddleware.validateRequiredUserBodyFields(),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                UsersMiddleware.validateSameEmailDoesntExist,
                UsersController.createUser
            );

        this.app.param(`userId`, UsersMiddleware.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(UsersMiddleware.validateUserExists)
            .get(UsersController.getUserById)
            .delete(UsersController.removeUser);

        this.app.put(`/users/:userId`, 
            UsersMiddleware.validateRequiredUserBodyFields(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
        [
            UsersMiddleware.validateSameEmailBelongToSameUser,
            UsersController.put,
        ]);

        this.app.patch(`/users/:userId`, [
            UsersMiddleware.validatePatchEmail,
            UsersController.patch,
        ]);

        return this.app;
    }
}