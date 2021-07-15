
import { EnumPlansItems } from "./common.organization.dto";

export interface PutOrganizationDto {
    parent?: string;
    name: string;
    plans: EnumPlansItems;
    user: string;
    region: string;
    status: string;
}