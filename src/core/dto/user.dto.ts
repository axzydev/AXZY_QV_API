import { AccountCreateDto } from "./account.dto";

export interface UserDto {
    uuid: string;
    name: string;
    email: string;
}

export interface RegisterDto {
    user: UserCreateDto;
    account: AccountCreateDto;
}

export interface UserCreateDto {
    name: string;
    email: string;
    password: string;
}