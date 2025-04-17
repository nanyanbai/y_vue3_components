<template>
  <div class="main-container">
    <div class="content-wrapper">
      <div class="main-video">
        <video ref="videoRef" muted autoplay></video>
      </div>
      <div class="member-list"></div>
    </div>

    <div class="footer">
      <div class="btn-wrapper">
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

        <ScreenButton @open="openScreen" @close="closeScreen" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MicroButton from "./MicroButton.vue";
import VideoButton from "./VideoButton.vue";
import ScreenButton from "./ScreenButton.vue";

import { useDevice } from "../../lib/useDevice.ts";

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
  openScreen,
  closeScreen,
} = useDevice();
</script>

<style lang="scss" scoped>
.main-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;

  .content-wrapper {
    .main-video {
      padding: 20px;

      video {
        width: 100%;
        height: 800px;
        object-fit: cover;
      }
    }
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    .btn-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 70px;
      gap: 20px;
      background: #000;
    }
  }
}
</style>
