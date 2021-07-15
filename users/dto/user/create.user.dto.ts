import { OrganizationsItem, ChannelsItem, RulesItem} from "./common.user.dto"

export interface CreateUserDto {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    organizations?: OrganizationsItem;
    channels?: ChannelsItem;
    rules: RulesItem;
    region?: string;
    permissionFlags: string;
}