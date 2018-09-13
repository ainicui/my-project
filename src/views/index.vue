<template>
  <div class="home">
    <el-container>
      <el-aside width="auto" :isShow="isShow" style="height:100%;background:#fff">
        <long-aside></long-aside>
      </el-aside>
      <el-container>
        <el-header>
          <div class="my-header" @click="isShow = !isShow">
            <span v-if="isShow">展开</span>
            <span v-else>关闭</span>
            <span>我的</span>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import longAside from "@/components/aside.vue";
export default {
  name: "home",
  components: {
    longAside
  },
  data() {
    return {
      isShow: true
    };
  }
};
</script>
<style lang="scss">
.home {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-dialog__body {
    max-height: 550px;
    overflow-y: auto;
  }
  .el-header {
    background-color: #0d1a2c;
    color: #fff;
    line-height: 60px;
    .my-header {
      display: flex;
      justify-content: space-between;
    }
  }

  .el-aside {
    color: #333;
  }

  .el-main {
    color: #333;
    text-align: center;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-table th.is-leaf {
    text-align: center;
  }
}
</style>
