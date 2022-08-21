<template>
  <portal
    :get-container="getContainer"
  >
    <input
      type="checkbox"
      class="modal-toggle"
      :checked="visible"
      @change="noop"
    />
    <div class="modal">
      <div class="modal-box">
        <div
          class="flex justify-center"
          :style="{ fontSize: '24px' }"
        >
          {{ title }}
        </div>
        <slot></slot>
        <div class="modal-action flex justify-center">
          <label
            class="btn"
            @click="handleCancel"
          >
            取消
          </label>
          <label
            class="btn btn-primary"
            @click="handleConfirm"
          >
            确定
          </label>
        </div>
      </div>
    </div>
  </portal>
</template>

<script setup lang="ts">
import { Portal } from '@/utils'

interface ModalProps {
  closable?: boolean;
  visible?: boolean;
  title?: string;
  getContainer?: () => HTMLElement;
}

withDefaults(defineProps<ModalProps>(), {
  closable: false,
  visible: false,
  getContainer: () => document.body
})
const emit = defineEmits(['cancel', 'ok'])

const noop = () => {}
const handleCancel = () => {
  emit('cancel')
}
const handleConfirm = () => {
  emit('ok')
}

</script>

<style lang="less">

</style>
