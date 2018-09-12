<template>
  <div class="home">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <el-button type="primary" @click.native="isVisible=true" style="float: right; margin-bottom:10px;padding:10px 15px;">新增</el-button>
          <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="日期" width="200">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date_time }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="user_name" label="昵称" width="150"></el-table-column>
            <el-table-column prop="content" label="内容"></el-table-column>
            <el-table-column label="图片" width="300">
              <template slot-scope="scope">
                <img :src="scope.row.imgUrl[0].url.url" alt="" srcset="" width="150" height="100" style="margin:auto">
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <form-data :dialogFormVisible="isVisible"></form-data>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import formData from "./form_data.vue";
import $ajax from "axios";
export default {
  name: "home",
  components: {
    HelloWorld,
    formData
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      isVisible: false
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDelete(index, item) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          $ajax
            .post("http://localhost:3000/del", {
              id: item._id
            })
            .then(res => {
              console.log(res);
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.tableData.splice(index, 1);
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    $ajax
      .post("http://localhost:3000/all", {})
      .then(res => {
        console.log(res);
        this.tableData = res.data.data;
      })
      .catch(err => {});
  }
};
</script>
<style lang="scss">
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  // text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
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
</style>
