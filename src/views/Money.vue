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

    type Record = {
        tags:string[]
        notes:string
        type:string
        amount:number
        createdAt?:Date
    }

    @Component({
        components: {Tags, Notes, Types, NumberPad}
    })
    export default class Money extends Vue {
        tags=['衣','食','住','行'];
        recordList : Record[]= JSON.parse(window.localStorage.getItem('recordList')||'[]');
        record: Record={
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
            const record2 = JSON.parse(JSON.stringify(this.record));
            record2.createdAt = new Date();
            this.recordList.push(record2);
        }

        @Watch('recordList')
        onRecordListChange(){
            window.localStorage.setItem('recordList',JSON.stringify(this.recordList))
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