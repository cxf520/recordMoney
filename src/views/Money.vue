<template>
    <Layout class-prefix="layout">
        <Tags :data-source.sync="tags" @update:value = 'onUpdateTags'/>
        <FormItem field-name="备注" placeholder="请输入备注" @update:value = 'onUpdateNotes'/>
        <Types :value.sync="record.type"/>
        <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue'
    import NumberPad from '@/components/Money/NumberPad.vue';
    import Types from '@/components/Money/Types.vue';
    import FormItem from '@/components/Money/FormItem.vue';
    import Tags from '@/components/Money/Tags.vue';
    import {Component,Watch} from 'vue-property-decorator'
    import {recordListModel} from '@/model/recordListModel';

    const recordList = recordListModel.fetch();

    @Component({
        components: {Tags, FormItem, Types, NumberPad}
    })
    export default class Money extends Vue {
        recordList : RecordItem[]= recordList;
        tags = window.tagList;
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
            recordListModel.create(this.record);
        }

        @Watch('recordList')
        onRecordListChange(){
            recordListModel.save();
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