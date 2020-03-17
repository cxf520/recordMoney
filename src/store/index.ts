import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone.";
import createId from "@/lib/createId";
import router from "@/router";

Vue.use(Vuex);
type RootState = {
  recordList:RecordItem[],
  tagList:Tag[],
  currentTag?:Tag
}
const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag:undefined
  }as RootState,
  mutations: {
    fetchRecord(state){
      state.recordList= JSON.parse(window.localStorage.getItem('recordList')||'[]') as RecordItem[] ;
    },
    createRecord(state,record){
      const record2:RecordItem = clone(record);
      record2.createdAt = new Date();
      state.recordList.push(record2);
      store.commit('saveRecord')
    },
    saveRecord(state){
      window.localStorage.setItem('recordList',JSON.stringify(state.recordList))
    },
    fetchTabs(state){
      state.tagList = JSON.parse(window.localStorage.getItem('tagsList')||'[]');
    },
    createTag(state,name: string) {
      const names = state.tagList.map(item => item.name);
      if(names.indexOf(name)>=0){
        window.alert('标签名已存在');
        return 'duplicated'
      }
      const id = createId().toString();
      state.tagList.push({id,name:name});
      store.commit('saveTabs');
      window.alert('添加成功');
      return 'success';
    },
    saveTabs(state){
      window.localStorage.setItem('tagsList',JSON.stringify(state.tagList))
    },
    setCurrentTag(state,id:string){
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    updateTag(state, payload:{id: string, name: string}){
      const {id,name} = payload;
      const tag = state.tagList.filter(item => item.id === id )[0];
        if(tag){
          const names = state.tagList.map(item => item.name);
          if(names.indexOf(name)>=0){
              return 'duplicated';
          }else{
              tag.id = tag.name = name;
              store.commit('saveTabs');
              return 'success'
          }
        }else{
            return 'not found'
        }
    },
    removeTag(state,id: string){
      let index = -1;
      for(let i=0; i<state.tagList.length; i++){
        if(state.tagList[i].id === id){
          index=i;
          break;
        }
      }
      if(index>=0){
        state.tagList.splice(index,1);
        store.commit('saveTabs');
        router.back()
      }else{
        window.alert('删除失败')
      }
    }
  }
});
export default store;
