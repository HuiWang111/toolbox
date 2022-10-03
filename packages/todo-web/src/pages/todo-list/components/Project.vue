<template>
  <div
    class="project-item click-effect"
    :style="`--project-item-background-color: ${bgcolor}; --project-item-text-color: ${color};`"
  >
    <span>{{ text }}</span>
    <img
      :src="editProjectIcon"
      alt="edit project icon"
      v-if="showEditIcon"
    >
  </div>
</template>

<script setup lang="ts">
import editProjectIcon from '@/assets/images/edit-project.svg'

interface ProjectProps {
  bgcolor?: string;
  color?: string;
  text: string;
  editing?: boolean;
  showEditIcon?: boolean;
}

withDefaults(defineProps<ProjectProps>(), {
  bgcolor: 'rgba(244, 208, 137, 0.4)',
  color: '#535151',
  editing: false,
  showEditIcon: true
})
</script>

<style lang="less" scoped>
.project-item {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: var(--project-item-background-color);
  color: var(--project-item-text-color);
  box-shadow: 0px 2px 8px rgba(205, 205, 205, 0.25);
  border-radius: 8px;
  font-weight: 400;
  font-size: 22px;
  cursor: pointer;

  > img {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
}
</style>
