<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></van-nav-bar>
    <div class="register-panel">
      <van-field
        v-model="userName"
        label="用户名"
        placeholder="请输入用户名"
        required
        :error-message="usernameErrorMsg"
        @click-icon="userame = ''"
      ></van-field>
      <van-field
        v-model="password"
        label="密码"
        type="password"
        placeholder="请输入密码"
        :error-message="passwordErrorMsg"
        required
      >
      </van-field>
      <div class="register-button">
        <van-button
          type="primary"
          size="large"
          :loading="openLoading"
          @click="registerAction"
          >登录</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      userName: "",
      password: "",
      openLoading: false,
      usernameErrorMsg: "",
      passwordErrorMsg: "",
    };
  },
  created() {
    if (localStorage.userInfo) {
      Toast.success("您已经登录");
      this.$router.push("/");
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    registerAction() {
      if (this.checkForm()) {
        this.axiosLoginUser();
      }
    },
    axiosLoginUser() {
      this.openLoading = true;
      axios({
        url: url.loginUser,
        method: "post",
        data: {
          userName: this.userName,
          password: this.password,
        },
      })
        .then((response) => {
          console.log("--login--" + response);

          if (response.data.code == 200 && response.data.message) {
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.userName };
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                Toast.success("登录成功");
                this.$router.push("/");
              })
              .catch((err) => {
                Toast.fail("登录状态保存失败");
                console.log(err);
              });
          } else {
            Toast.fail("登录失败");
            this.openLoading = false;
          }
        })
        .catch((error) => {
          console.log("--login error:----" + error);
          Toast.fail("登录失败");
          this.openLoading = false;
        });
    },
    checkForm() {
      let flag = true;
      this.usernameErrorMsg = "";
      this.passwordErrorMsg = "";
      if (this.userName.length < 5) {
        this.usernameErrorMsg = "用户名不能小于5位";
        flag = false;
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能少于6位";
        flag = false;
      }
      return flag;
    },
  },
};
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>
