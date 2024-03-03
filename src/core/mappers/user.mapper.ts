import { User } from "@prisma/client";
import { UserDto } from "../dto/user.dto";

export const UserEntityToDto = (user: User): UserDto => {
    return {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
    };
}  

export const UsersEntityToDto = (users: User[]): UserDto[] => {
    return users.map(user => UserEntityToDto(user));
}  