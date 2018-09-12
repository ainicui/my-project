<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <div class="from-data">
      <el-form label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="name" placeholder="请输入用户名" clearable class="_input"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="content" placeholder="请输入内容" clearable class="_input"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="address" placeholder="请输入地址" clearable class="_input"></el-input>
        </el-form-item>
        <el-upload class="upload-demo" action="http://localhost:3000/upload" :on-preview="handlePreview" :on-success="handleUploadImageSuccessed" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-form-item label="">
          <el-button @click.native="submit" type="primary" class="_button">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import $ajax from "axios";
export default {
  props: [
    'dialogFormVisible'
  ],
  data() {
    return {
      name: "",
      content: "",
      address: "",
      id: this.$route.query.id,
      fileList: []
    };
  },
  methods: {
    submit() {
      let _this = this;
      let imgArr = [];
      for (let i = 0; i < this.fileList.length; i++) {
        imgArr.push({
          url:
            this.fileList[i].response === undefined
              ? this.fileList[i].url
              : this.fileList[i].response.data,
          sorting: i
        });
      }
      $ajax
        .post("http://localhost:3000/users/from", {
          user_name: this.name,
          content: this.content,
          address: this.address,
          imgUrl: imgArr,
          id: this.id
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              message: res.data.msg,
              onClose: function() {
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
      this.fileList = list;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
  mounted() {
    console.log(this.id);
    $ajax
      .post("http://localhost:3000/all", {
        id: this.id
      })
      .then(res => {
        let data = res.data.data;
        (this.name = data.user_name),
          (this.phone = data.phone),
          (this.address = data.address),
          (this.code = data.zip_code);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="scss" scoped>
.from-data {
  width: 50%;
  margin: auto;
  margin-top: 80px;
  ._input {
    margin-bottom: 10px;
  }
  ._button {
    width: 100%;
  }
}
</style>
