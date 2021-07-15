export interface CreatePlanDto {
    name: string;
    type: string;
    user: string;
    region?: string
    status: string;
}