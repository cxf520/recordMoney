import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone.";
import createId from "@/lib/createId";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: []as Tag[]
  },
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
    findTag(state,id: string) {
      return state.tagList.filter(t => t.id === id)[0];
    },
    removeTag(state,id: string){
      let index = -1;
      for(let i=0; i<state.tagList.length; i++){
        if(state.tagList[i].id === id){
          index=i;
          break;
        }
      }
      state.tagList.splice(index,1);
      store.commit('saveTabs');
      return true
    }
  }
});
export default store;
