<template>
  <div class="sidebar">
    <div class="sidebar-title">Projects</div>
    <project-item
      text="New Project"
      color="#fff"
      bgcolor="rgba(209, 198, 158)"
      class="create-project-item"
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
}

withDefaults(defineProps<SidebarProps>(), {
  projects: () => []
})

const emit = defineEmits(['create'])

const handleCreateProject = () => {
  emit('create')
}
</script>

<style lang="less" scoped>
.sidebar {
  flex: 0 0 300px;
  background-color: #FFFBEF;
  // padding: 20px;
  padding-bottom: 0;
  font-size: 32px;
  font-weight: 600;
  overflow: hidden;

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
