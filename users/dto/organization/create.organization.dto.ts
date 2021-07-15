import { EnumPlansItems } from "./common.organization.dto";

export interface CreateOrganizationDto {
    parent?: string;
    name: string;
    plans?: EnumPlansItems;
    user?: string;
    region?: string;
    status: string;
}
