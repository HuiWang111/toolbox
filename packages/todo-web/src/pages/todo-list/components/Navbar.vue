<template>
  <div class="navbar">
    <div class="navbar-left">
      <img
        :src="menuIcon"
        alt="menu-icon"
        class="click-effect"
        @click="handleClickMenu"
      />
    </div>
    <div class="navbar-center">
      <div class="">
        <img :src="todolistIcon" alt="todolist" />
        <span>YourTodo</span>
      </div>
    </div>
    <div class="nav-bar-right"></div>
  </div>
</template>

<script setup lang="ts">
import todolistIcon from '@/assets/images/todolist.svg'
import menuIcon from '@/assets/images/menu-btn.svg'

const emit = defineEmits(['click-menu'])

const handleClickMenu = () => {
  emit('click-menu')
}
</script>

<style lang="less" scoped>
.navbar {
  display: flex;
  align-items: center;
  height: 96px;
  background-color: #FFE794;

  &-left,
  &-right {
    flex: 0 0 110px;
    padding: 0 10px;

    img {
      cursor: pointer;
    }
  }

  &-center {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;

    img {
      cursor: pointer;
    }

    > div {
      display: flex;
      align-items: center;

      span {
        margin-left: 10px;
        font-size: 38px;
      }
    }
  }
}
</style>
