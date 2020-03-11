import {recordListModel} from "@/model/recordListModel";
import {tagListModel} from "@/model/tagsModel";

const store = {
    //record store
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => recordListModel.create(record),
    //tag store
    tagList: tagListModel.fetch(),
    createTag: (name: string) => {
        const message = tagListModel.create(name);
        if (message === 'duplicated') {
            window.alert('标签名已存在');
        } else if (message === 'success') {
            window.alert('添加成功');
        }
    },
    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0];
    },
    removeTag: (id: string) => {
        return tagListModel.remove(id);
    },
    updateTag: (id: string, name: string) => {
        return tagListModel.update(id, name);
    }
};
export default store;