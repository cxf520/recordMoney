<template>
    <Layout class-prefix="layout">
        <Tags/>
        <FormItem field-name="备注" placeholder="请输入备注" @update:value = 'onUpdateNotes'/>
        <Tabs :data-source="typeList" :value.sync="record.type"/>
        <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue'
    import NumberPad from '@/components/Money/NumberPad.vue';
    import FormItem from '@/components/Money/FormItem.vue';
    import Tags from '@/components/Money/Tags.vue';
    import {Component} from 'vue-property-decorator'
    import Tabs from "@/components/Tabs.vue";
    @Component({
        components: {Tabs, Tags, FormItem, NumberPad},
        computed:{
            recordList(){
                return this.$store.commit('recordList')
            }
        }
    })
    export default class Money extends Vue {
        record: RecordItem={
            tags:[],notes:'',type:'-',amount:0
        };
        typeList=[
            {text:'支出',value:'-'},
            {text:'收入',value:'+'},
        ];
        created(){
            this.$store.commit('fetchRecord')
        }
        onUpdateNotes(value:string){
            this.record.notes = value;
        }
        onUpdateAmount(value:string){
            this.record.amount = parseFloat(value);
        }
        saveRecord(){
            this.$store.commit('createRecord',this.record);
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