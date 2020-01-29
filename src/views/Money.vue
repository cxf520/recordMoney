<template>
  <div class="nav-wrap">
    <div class="content">
      <p>money</p>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  name: "Money",
};
</script>

<style lang="scss" scoped>
  .nav-wrap{
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .content{
    overflow: auto;
    flex-grow: 1;
  }
</style>