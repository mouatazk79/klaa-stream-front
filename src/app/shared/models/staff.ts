export interface Staff{
    firstName:string,
    lastName:string,
    phoneNumber?:string
    gender:'MALE'|'FEMALE',
    dateOfBirth:Date,
    age:number,
    fullName:string
}