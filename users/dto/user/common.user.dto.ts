interface OrganizationItem {
    organization: string; status?: string; 
}

interface ChannelItem {
    channel: string; name?: string;
}


interface RuleItem {
    channel: string; maxQueues: number; maxTickets: number;
}

export interface OrganizationsItem extends Array<OrganizationItem>{}
export interface ChannelsItem extends Array<ChannelItem>{}
export interface RulesItem extends Array<RuleItem>{}
