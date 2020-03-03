<template>
    <Layout>
        <div>
            <Icon name="left"/>
            <span>编辑标签</span>
        </div>
        <FormItem field-name="标签名" placeholder="请输入标签名"/>
        <div class="button-wrapper">
            <Button>删除标签</Button>
        </div>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator'
    import {tagListModel} from "@/model/tagsModel";
    import FormItem from "@/components/Money/FormItem.vue";
    import Button from "@/components/Button.vue";
    @Component({
        components: {Button, FormItem}
    })
    export default class EditLabel extends Vue{
        created(){
            const id = this.$route.params.id;
            tagListModel.fetch();
            const tags = tagListModel.data;
            const tag = tags.filter(t => t.id === id)[0];
            if(tag){
                console.log(tag);
            }else{
                this.$router.replace('/404')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .button-wrapper {
        text-align: center;
        padding: 16px;
        margin-top: 44-16px;
    }
</style>