export interface UserDto {
    uuid: string;
    name: string;
    email: string;
}

export interface UserCreateDto {
    name: string;
    email: string;
    password: string;
}