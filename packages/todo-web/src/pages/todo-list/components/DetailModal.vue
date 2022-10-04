<template>
  <t-modal
    :closable="false"
    :title="null"
    :footer="null"
    class="detail-modal"
    :visible="true"
  >
    <div class="detail-modal-title">Details</div>
    <div class="detail-modal-body">
      <t-input placeholder="input todo title" />
      <t-date-picker />
    </div>
    <div class="detail-modal-footer">
      <t-button
        success
        blocked
        :icon="saveIcon"
        @click="handleSave"
      >
        Save
      </t-button>
      <t-button
        info
        blocked
        :icon="markIcon"
        @click="handleMark"
      >
        Mark Done/Not Done
      </t-button>
      <t-button
        danger
        blocked
        :icon="deleteIcon"
        @click="handleDelete"
      >
        Delete
      </t-button>
    </div>
  </t-modal>
</template>

<script setup lang="ts">
import saveIcon from '@/assets/images/save.svg'
import markIcon from '@/assets/images/mark.svg'
import deleteIcon from '@/assets/images/delete.svg'

const emit = defineEmits(['save', 'mark', 'delete'])

const handleSave = () => {
  emit('save')
}
const handleMark = () => {
  emit('mark')
}
const handleDelete = () => {
  emit('delete')
}
</script>

<style lang="less">
.t-modal-wrap .detail-modal .t-modal-body {
  padding: 16px;
}
.detail-modal-body {
  .t-input-wrap + .t-input-wrap {
    margin-top: 10px;
  }
}
</style>
<style scoped lang="less">
.detail-modal {
  &-title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 24px;
    color: #000;
  }

  &-body {
    margin-top: 20px;
  }

  &-footer {
    margin-top: 20px;

    .t-button + .t-button {
      margin-top: 10px;
    }
  }
}
</style>
