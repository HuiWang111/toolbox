<script setup lang="ts">
import { EventBar } from '@/components'
import { Modal } from '@/ui'
</script>

<template>
  <div class="todos">
    <event-bar />
    <modal :visible="true">
    </modal>
  </div>
</template>

<style lang="less">
.todos {
  display: flex;
}
</style>
