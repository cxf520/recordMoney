<template>
    <nav>
        <router-link class="item" to="/money" active-class="selected">
            <Icon name="money" />
            记账
        </router-link>
        <router-link class="item" to="/labels" active-class="selected">
            <Icon name="label" />
            标签
        </router-link>
        <router-link class="item" to="/statistics" active-class="selected">
            <Icon name="statistic" />
            统计
        </router-link>
    </nav>
</template>

<script lang="ts">
    export default {
        name: "Nav"
    }
</script>


<style lang="scss" scoped>
nav{
    display: flex;
    flex-direction: row;
    font-size: 14px;
    box-shadow: 0 0 3px rgba(0,0,0,0.3);
    >.item{
        padding: 4px 0;
        width: 33.3333%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .icon{
            width: 26px;
            height: 26px;
        }
    }
    .selected{
        color: red;
    }
}
</style>