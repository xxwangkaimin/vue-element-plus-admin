<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      class="hamburger-container"
      :is-active="sidebar.opened"
      @toggleClick="toggleSidebar"
    />
    <breadcrumb v-if="!isTopNav" id="breadcrumb-container" class="breadcrumb-container" />
    <top-nav v-if="isTopNav" id="topmenu-container" class="topmenu-container" />
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <header-search id="header-search" class="right-menu-item" />
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
      </template>
      <div class="avatar-container">
        <el-dropdown class="right-menu-item hover-effect" trigger="click" @command="handleCommand">
          <div class="avatar-wrapper">
            <img :src="avatar" alt="" class="user-avatar">
            <el-icon style="width: 0.6em;height: 0.6em;margin-left: 5px">
              <IEpCaretBottom />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item command="setLayout">布局设置</el-dropdown-item>
              <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Hamburger from "@/components/Hamburger/index.vue"
import Breadcrumb from "@/components/Breadcrumb/index.vue"
import HeaderSearch from "@/components/HeaderSearch/index.vue"
import Screenfull from "@/components/Screenfull/index.vue"
import useStore from "@/store"
import { computed } from "vue"
import { ElMessageBox } from "element-plus"
import { useRouter } from "vue-router"

const { app, settings, user } = useStore()
const sidebar = computed(() => app.sidebar)
const isTopNav = computed(() => settings.topNav)
const device = computed(() => app.device)
const avatar = computed(() => user.avatar)

function toggleSidebar() {
  app.toggleSidebar(false)
}

const emits = defineEmits(["setLayout"])

function setLayout() {
  emits("setLayout")
}

const router = useRouter()

function logout() {
  ElMessageBox.confirm("确定退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    user.logout().then(() => {
      router.push({ path: "/login" })
    })
  }).catch(() => {
  })
}

function handleCommand(command: string) {
  if (command === "setLayout") {
    setLayout()
  } else if (command === "logout") {
    logout()
  }
}
</script>

<style lang='scss' scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
        }
      }
    }
  }
}
</style>
