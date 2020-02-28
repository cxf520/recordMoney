const localStorageKeyName = 'tagsList';
type Tag = {
    id:string,
    name:string
}
type TagsListModel ={
    data:Tag[]
    fetch:() => Tag[]
    create:(name:string) => 'success' | 'duplicated' //联合类型 => 字符串子类型
    save:()=> void
}
const tagListModel:TagsListModel = {
    data:[],
    fetch(){
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName)||'[]');
        return this.data
    },
    create(name:string){
        //data [{id:'1',name:'1'};{id:'2',name:'2'}]
        const names = this.data.map(item => item.name);
        if(names.indexOf(name)>=0){return 'duplicated'}
        this.data.push({id:name,name:name});
        this.save();
        return 'success';
    },
    save(){
        window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.data))
    }
};
export {tagListModel}