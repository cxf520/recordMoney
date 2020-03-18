<template>
    <ul class="tabs">
        <li v-for="(item,index) in dataSource" :key="index"
            :class="{[classPrefix + '-tabs-item']:classPrefix ,selected:item.value === value }"
            @click="select(item)">{{item.text}}</li>
    </ul>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component,Prop} from 'vue-property-decorator'

    @Component
    export default class Tabs extends  Vue{
        @Prop({required:true,type:Array}) dataSource!:{text:string,value:string};
        @Prop(String) classPrefix?:string;
        @Prop(String) value!:string;

        select(item:{text:string,value:string}){
            this.$emit('update:value',item.value)
        }
    }
</script>

<style lang="scss" scoped>
    .tabs {
        background: #c4c4c4;
        display: flex;
        text-align: center;
        font-size: 24px;
        > li {
            width: 50%;
            height: 64px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            &.selected::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: #333;
            }
        }
    }
</style>