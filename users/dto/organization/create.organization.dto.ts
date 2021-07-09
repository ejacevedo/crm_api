export interface CreateOrganizationDto {
    name: string;
    password: string;
    firstName?: string;
    lastName?: string;
    permissionFlags: string;
}