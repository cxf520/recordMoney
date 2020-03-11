import {recordListModel} from "@/model/recordListModel";

export default {
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => recordListModel.create(record),
}