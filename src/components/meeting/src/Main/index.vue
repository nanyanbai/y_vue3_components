<template>
  <div class="main-container">
    <div class="content-wrapper">
      <div class="main-video">
        <video ref="videoRef" muted autoplay></video>
      </div>
      <div class="member-list">
        <div class="member-item">
          <video ref="remoteRef" muted autoplay></video>
        </div>
      </div>
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
import { onMounted } from "vue";

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
  localStream,
  initDevice,
} = useDevice();

async function init() {
  await initDevice();
}

onMounted(init);
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
