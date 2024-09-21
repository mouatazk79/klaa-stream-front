export interface Document{
    id?:string
    name:string,
    description?:string,
    documentType:'BOOK'|'ARTICLE'|undefined,
    documentURL:string   
    visible?:true
}