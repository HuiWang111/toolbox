<template>
  <div :class="['sidebar', { 'sidebar-visible': visible }]">
    <div class="sidebar-title">Projects</div>
    <project-item
      text="New Project"
      color="#fff"
      bgcolor="rgba(209, 198, 158)"
      class="create-project-item"
      :show-edit-icon="false"
      @click="handleCreateProject"
    />
    <div class="project-list">
      <project-item
        v-for="project in projects"
        :key="project.id"
        :text="project.name"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProjectItem from './Project.vue'

interface Project {
  name: string;
  id: number;
}

interface SidebarProps {
  projects?: Project[];
  visible?: boolean;
}

withDefaults(defineProps<SidebarProps>(), {
  projects: () => [],
  visible: true
})

const emit = defineEmits(['create'])

const handleCreateProject = () => {
  emit('create')
}
</script>

<style lang="less" scoped>
.sidebar {
  position: absolute;
  left: -300px;
  top: 0;
  width: 300px;
  height: 100%;
  background-color: #FFFBEF;
  padding-bottom: 0;
  font-size: 32px;
  font-weight: 600;
  overflow: hidden;
  transition: left .3s;

  &.sidebar-visible {
    left: 0;
  }

  &-title {
    margin-top: 20px;
  }

  .create-project-item {
    margin: 0 20px;
    margin-top: 20px;
  }

  .project-list {
    padding: 20px;
    height: calc(100% - 154px); // 40px padding + 44px title + 70px create-item
    overflow-x: hidden;
    overflow-y: auto;

    .project-item + .project-item {
      margin-top: 20px;
    }
  }
}
</style>
