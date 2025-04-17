<template>
  <div class="video-wrapper">
    <video ref="videoRef" muted autoplay></video>
    <div v-if="!hasVideoInput" class="tip">{{ tip }}</div>
    <div class="bottom-wrapper">
      <MicroButton
        :disabled="!hasAudioInput"
        :volume="volume"
        @open="openMicro"
        @close="closeMicro"
      />
      <VideoButton
        :disabled="!hasVideoInput"
        @open="openVideo"
        @close="closeVideo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MicroButton from "./MicroButton.vue";
import VideoButton from "./VideoButton.vue";

import { useDevice } from "../lib/useDevice.ts";

const {
  openMicro,
  closeMicro,
  openVideo,
  closeVideo,
  hasAudioInput,
  hasVideoInput,
  videoRef,
  tip,
  volume,
} = useDevice();
</script>

<style lang="scss" scoped>
.video-wrapper {
  width: 1000px;
  height: 500px;
  background-color: #000;
  position: relative;

  .bottom-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    border: 1px dashed #fff;
  }
}

video {
  width: 1000px;
  height: 500px;
  object-fit: cover;
}

.tip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 20px;
}
</style>
