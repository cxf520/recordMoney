<template>
    <Layout class-prefix="layout">
        <Tags :data-source.sync="tags" @update:value = 'onUpdateTags'/>
        <Notes @update:value = 'onUpdateNotes'/>
        <Types :value.sync="record.type"/>
        <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue'
    import NumberPad from '@/components/Money/NumberPad.vue';
    import Types from '@/components/Money/Types.vue';
    import Notes from '@/components/Money/Notes.vue';
    import Tags from '@/components/Money/Tags.vue';
    import {Component,Watch} from 'vue-property-decorator'
    import {recordListModel} from '@/model/recordListModel';
    import {tagListModel} from "@/model/tagsModel";

    const recordList = recordListModel.fetch();
    const tagList = tagListModel.fetch();

    @Component({
        components: {Tags, Notes, Types, NumberPad}
    })
    export default class Money extends Vue {
        recordList : RecordItem[]= recordList;
        tags = tagList;
        record: RecordItem={
            tags:[],notes:'',type:'-',amount:0
        };
        onUpdateTags(value:string[]){
            this.record.tags = value;
        }
        onUpdateNotes(value:string){
            this.record.notes = value;
        }
        onUpdateAmount(value:string){
            this.record.amount = parseFloat(value);
        }
        saveRecord(){
            // 深拷贝
            const record2 = recordListModel.clone(this.record);
            record2.createdAt = new Date();
            this.recordList.push(record2);
        }

        @Watch('recordList')
        onRecordListChange(){
            recordListModel.save(this.recordList);
        }

    }
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column;
    }
</style>
<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";
</style>