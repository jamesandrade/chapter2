export interface ICreateUserDTO {
    name: string;
    username: string;
    email: string;
    driver_license: string;
    password: string;
    avatar?: string;
    id?: string;
}
