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
    <div class="modal d-modal">
      <div class="modal-box relative">
        <label
          class="btn btn-sm btn-circle absolute right-2 top-2"
          v-if="closable"
          @click="handleClose"
        >
          ✕
        </label>
        <div
          class="flex justify-center d-modal-title"
          v-if="Boolean(title)"
        >
          {{ title }}
        </div>
        <slot></slot>
        <div class="modal-action flex justify-center">
          <slot name="footer" v-if="Boolean($slots.footer)"></slot>
          <template v-else-if="footer !== null">
            <label
              class="btn btn-outline btn-primary btn-sm"
              @click="handleCancel"
            >
              取消
            </label>
            <label
              class="btn btn-primary btn-sm"
              @click="handleConfirm"
            >
              确定
            </label>
          </template>
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
  footer?: null;
  getContainer?: () => HTMLElement;
}

withDefaults(defineProps<ModalProps>(), {
  closable: true,
  visible: false,
  getContainer: () => document.body
})
const emit = defineEmits(['cancel', 'ok', 'close'])

const noop = () => {}
const handleCancel = () => {
  emit('cancel')
}
const handleConfirm = () => {
  emit('ok')
}
const handleClose = () => {
  emit('close')
}
</script>

<style lang="less">
.d-modal {
  .d-modal-title {
    font-size: 24px;
  }
}
</style>
