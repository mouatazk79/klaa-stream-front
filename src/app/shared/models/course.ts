export interface Course{
    id?:string
    teacherId?:number,
    name:string,
    field:string,
    description:string,
    visible?:boolean,
    imageURL?:string,
}