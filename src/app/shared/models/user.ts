import { Role } from "./role";

export interface User{
    email:string,
    username:string,
    roles:Array<Role>
}