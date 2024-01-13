<template>
  <div class="ui-canvas-wrap"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { CanvasDrawPage } from './index.ts'

let canvasDrawPage
onMounted(() => (canvasDrawPage = new CanvasDrawPage()))
onUnmounted(() => canvasDrawPage.clearTimersAndEvents && canvasDrawPage.clearTimersAndEvents())
</script>

<style scoped lang="scss"></style>
