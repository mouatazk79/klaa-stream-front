export interface Document{
    name:string,
    description?:string,
    documentType:'BOOK'|'ARTICLE'|undefined,
    documentURL:string   
    visible:true
}