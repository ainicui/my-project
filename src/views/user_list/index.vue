<template>
  <div class="home">
    <el-button type="primary" @click.native="showFrom" style="float: right; margin-bottom:10px;padding:10px 15px;">新增</el-button>
    <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ new Date(scope.row.date_time ).toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="user_name" label="手机号" width="150"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column label="图片" width="300">
        <template slot-scope="scope">
          <img v-if="scope.row.imgUrl.length>0" :src="scope.row.imgUrl[0].url" alt="" srcset="" width="150" height="100" style="margin:auto">
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表单部分 -->
    <el-dialog :title="title" :visible.sync="isVisible">
      <div class="from-data">
        <el-form label-width="80px">
          <el-form-item label="昵称">
            <el-input v-model="name" placeholder="请输入用户名" clearable class="_input"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="content" type="textarea" placeholder="请输入内容" clearable class="_input"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload class="upload-demo" action="http://localhost:3000/upload" style="text-align:left" :on-preview="handlePreview" :on-success="handleUploadImageSuccessed" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
              <el-button size="medium" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="">
            <el-button @click.native="submit" type="primary" class="_button" style="width:100%">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import $ajax from "axios";
export default {
  name: "home",
  components: {
  },
  data() {
    return {
      id: this.$route.query.id,
      tableData: [],
      multipleSelection: [],
      isVisible: false,
      name: "",
      content: "",
      fileList: [],
      title: "新增列表"
    };
  },
  watch: {
    isVisible(val) {
      console.log(val);
    }
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
    },
    showFrom() {
      this.title = "新增列表";
      this.id = "";
      this.name = "";
      this.content = "";
      this.fileList = [];
      this.isVisible = true;
    },
    handleEdit(index, val) {
      this.isVisible = true;
      this.title = "编辑列表";
      this.id = val._id;
      this.name = val.user_name;
      this.content = val.content;
      this.fileList = val.imgUrl;
      console.log(val);
    },
    submit() {
      let _this = this;
      $ajax
        .post("http://localhost:3000/users/from", {
          user_name: this.name,
          content: this.content,
          imgUrl: this.fileList,
          id: this.id
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              message: res.data.msg,
              onClose: function() {
                _this.dialogFormVisible = false;
                _this.$router.push({ path: "/" });
              }
            });
          } else {
            this.$message({
              type: "info",
              message: res.data.msg
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleUploadImageSuccessed: function(response, file, list) {
      if (file.response.code === 1) {
        this.fileList.push({
          type: file.response.data.type,
          url: file.response.data.url
        });
      } else {
        alert("上传失败");
      }
      console.log(this.fileList);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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
