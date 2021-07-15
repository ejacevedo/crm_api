import OrganizationsDao from "../daos/organizations.dao";
import { CRUD } from "../../common/crud.interface";
import { CreateOrganizationDto } from "../dto/organization/create.organization.dto";
import { PutOrganizationDto } from "../dto/organization/put.organization.dto";
import { PatchOrganizationDto } from "../dto/organization/patch.organization.dto";
import organizationsDao from "../daos/organizations.dao";

class OrganizationsService implements CRUD {
    async create(resource: CreateOrganizationDto) {
        return OrganizationsDao.addOrganization(resource);
    }

    async list(limit: number, page: number) {
        return OrganizationsDao.getOrganizations(limit, page);
    }

    async readById(id: string) {
        return OrganizationsDao.getOrganizationById(id);
    }

    async patchById(id: string, resource: PatchOrganizationDto) {
        return OrganizationsDao.updateOrganizationById(id, resource);
    }

    async putById(id: string, resource: PatchOrganizationDto) {
        return OrganizationsDao.updateOrganizationById(id, resource);
    }

    async deleteById(id: string) {
        return OrganizationsDao.removeOrganizationById(id);
    }
}

export default new OrganizationsService;