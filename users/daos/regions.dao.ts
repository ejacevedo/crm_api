import {  CreateRegionDto } from '../dto/region/create.region.dto';
import { PutRegionDto } from '../dto/region/put.region.dto';
import { PatchRegionDto } from '../dto/region/patch.region.dto';
import mongooseService from '../../common/services/mongoose.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:regions-dao');

class RegionsDao {
    Schema = mongooseService.getMongoose().Schema;

    regiosSchema = new this.Schema({
        name: String,
        code: String,
        level: Number,
        parent_id: String
    }, { timestamps: true });

    Regions = mongooseService.getMongoose().model('Regions', this.regiosSchema);

    constructor(){
        log('Created new instance of RegionsDao');
    }


    async addRegion(regioFields: CreateRegionDto) {
        const region = new this.Regions(regioFields);
        const newRegion = await region.save();
        return newRegion._id;
    }

    async getRegions(limit = 25, page = 0) {
        return this.Regions.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async getRegionById(regionId: string){
        return this.Regions.findOne({ _id: regionId }).exec();
    }

    async updateRegionById(
        regionId: string, 
        regionFields: PatchRegionDto | PutRegionDto
    ) {
        log('regionId:',regionId);
        log('updateRegionById:',regionFields);
        const existingRegion = await this.Regions.findOneAndUpdate(
            { _id : regionId },
            { $set: regionFields },
            { new: true }
        );
        return existingRegion;
    }

    async removeRegionById(regionId: string) {
        return this.Regions.deleteOne({ _id: regionId }).exec();
    }
}


export default new RegionsDao();