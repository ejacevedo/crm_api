export interface CreateRegionDto {
    name: string;
    code: string;
    level?: number;
    parent_id?: string;
}