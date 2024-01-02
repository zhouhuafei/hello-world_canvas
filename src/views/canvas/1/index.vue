<template>
  <div class="canvas-wrap"></div>
</template>

<script setup lang="ts">
import { CanvasDraw } from './index.ts'
import { onMounted } from 'vue'

onMounted(() => new CanvasDraw())
</script>

<style scoped lang="scss"></style>
