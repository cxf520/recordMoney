import createId from "@/lib/createId";

const localStorageKeyName = 'tagsList';
const tabStore ={
    tagList: []as Tag[],
    fetchTabs(){
        this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName)||'[]');
        return this.tagList
    },
    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0];
    },
    saveTabs(){
        window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.tagList))
    },
    createTag(name: string) {
        const names = this.tagList.map(item => item.name);
        if(names.indexOf(name)>=0){
            window.alert('标签名已存在');
            return 'duplicated'
        }
        const id = createId().toString();
        this.tagList&&this.tagList.push({id,name:name});
        this.saveTabs();
        window.alert('添加成功');
        return 'success';
    },
    removeTag(id: string){
        let index = -1;
        for(let i=0; i<this.tagList.length; i++){
            if(this.tagList[i].id === id){
                index=i;
                break;
            }
        }
        this.tagList.splice(index,1);
        this.saveTabs();
        return true
    },
    updateTag(id: string, name: string){
        const tag = this.tagList.filter(item => item.id === id )[0];
        if(tag){
            const names = this.tagList.map(item => item.name);
            if(names.indexOf(name)>=0){
                return 'duplicated';
            }else{
                tag.id = tag.name = name;
                this.saveTabs();
                return 'success'
            }
        }else{
            return 'not found'
        }
    }
};
tabStore.fetchTabs();
export default tabStore;