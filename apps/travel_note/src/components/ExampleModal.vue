<script setup lang="ts">
import { ref } from "vue"
import ModalConfirm from "./ModalConfirm.vue";

const show = ref(false)

const handleClick = () => {
  console.log('handleClick');
  show.value = true
}

function confirm() {
  show.value = false
}
</script>

<template>
  <div>
    <button @click="handleClick">
      Open Modal
    </button>
  
    <ModalConfirm
      v-model="show"
      title="Hello World!"
      @confirm="() => confirm()"
    >
      <p>VModel: The content of the modal</p>
    </ModalConfirm>
  </div>
</template>
