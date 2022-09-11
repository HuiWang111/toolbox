<script setup lang="ts">
import { EventBar } from '@/components'
</script>

<template>
  <div class="todos">
    <event-bar />
    <!-- <t-modal :visible="true">
      <span>123</span>
    </t-modal> -->
  </div>
</template>

<style lang="less">
.todos {
  display: flex;
}
</style>
