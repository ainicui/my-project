<template>
  <div class="aside">
    <div class="logo">
    <p>{{ tab }}</p>
    </div>
    <div class="aside-info">
      <div class="info">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>


<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
</style>

<script>
export default {
  props: {
    isShow: Boolean
  },
  data() {
    return {
      isCollapse: true
    };
  },
  computed: {
    tab() {
      return 'long'
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss">
.aside-active{
    width: 241px;
  }
.aside {
  min-width: 65px;
  height: 100%;
  position: relative;
  .aside-info{
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    padding-top: 60px;
    box-sizing: border-box;
    .info{
      height: 100%;
      border-right: solid 1px #e6e6e6;
    }
  }
  .el-menu{
    border: none;
  }
}
.logo{
  width: 100%;
  height: 60px;
  line-height: 60px;
  color: #ffffff;
  background: #508fe7
}
</style>
