import RegionsDao from '../daos/regions.dao';
import { CreateRegionDto } from '../dto/region/create.region.dto';
import { PutRegionDto } from '../dto/region/put.region.dto';
import { PatchRegionDto } from '../dto/region/patch.region.dto';
import { CRUD } from '../../common/crud.interface';

class RegionsService implements CRUD {

    async create(resource: CreateRegionDto){
        return RegionsDao.addRegion(resource);
    }

    async list(limit: number, page: number){
        return RegionsDao.getRegions(limit, page); 
    }

    async readById(id: string){
        return RegionsDao.getRegionById(id);
    }

    async putById(id: string, resource: PutRegionDto) {
        return RegionsDao.updateRegionById(id, resource);
    }

    async patchById(id:string, resource: PutRegionDto){
        return RegionsDao.updateRegionById(id, resource);
    }

    async deleteById(id: string){
        return RegionsDao.removeRegionById(id);
    }
}

export default new RegionsService();