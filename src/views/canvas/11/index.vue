<template>
  <div class="ui-canvas-wrap"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as THREE from 'three'

const width = window.innerWidth
const height = window.innerHeight

// 摄像机
const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10)
camera.position.z = 1
// 几何体
const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4)
// 材质
const material = new THREE.MeshNormalMaterial()
// 物体
const mesh = new THREE.Mesh(geometry, material)
// 场景
const scene = new THREE.Scene()
scene.add(mesh)
// 渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true })
// 渲染器 - 大小
renderer.setSize(width, height)
// 渲染器 - 动画
const animation = (time) => {
  mesh.rotation.x = time / 2000
  mesh.rotation.y = time / 1000

  renderer.render(scene, camera)
}
renderer.setAnimationLoop(animation)

// 渲染
onMounted(() => document.querySelector('.ui-canvas-wrap').appendChild(renderer.domElement))
</script>

<style scoped lang="scss"></style>
