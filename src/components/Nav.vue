<template>
    <div class="nav">
        <router-link class="item" to="/money">记账</router-link>
        |
        <router-link class="item" to="/labels">标签</router-link>
        |
        <router-link class="item" to="/statistics">统计</router-link>
    </div>
</template>

<script>
    export default {
        name: "Nav"
    }
</script>

<style lang="scss" scoped>
.nav{
    display: flex;
    flex-direction: row;
    .item{
        width: 50%;
        text-align: center;
    }
}
</style>