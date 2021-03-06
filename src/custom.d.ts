type RecordItem = {
    tags:string[]
    notes:string
    type:string
    amount:number
    createdAt?:Date
}
type Tag = {
    id:string,
    name:string
}
type TagsListModel ={
    data:Tag[]
    fetch:() => Tag[]
    create:(name:string) => 'success' | 'duplicated' //联合类型 => 字符串子类型
    update:(id:string,name:string) => 'success' | 'duplicated' | 'not found'
    remove:(id:string) => boolean
    save:()=> void
}
//window添加属性
interface Window{}