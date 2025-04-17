import { onUnmounted, ref } from "vue";

export const useDevice = () => {
  const videoRef = ref();
  const tip = ref("");
  const volume = ref(0);
  let animationId = 0;
  const hasAudioInput = ref(false);
  const hasVideoInput = ref(false);
  const hasScreenInput = ref(false);
  // const hasAudioOutput = ref(false);

  const localStream = {
    audioStream: null as MediaStream | null,
    videoStream: null as MediaStream | null,
    screenStream: null as MediaStream | null,
  };

  async function init() {
    const devices = await navigator.mediaDevices.enumerateDevices();

    const audioinput = devices.find((item) => item.kind === "audioinput");
    const videoinput = devices.find((item) => item.kind === "videoinput");
    // const audiooutput = devices.find((item) => item.kind === "audiooutput");

    hasAudioInput.value = !!audioinput?.deviceId;
    hasVideoInput.value = !!videoinput?.deviceId;

    if (hasVideoInput.value) {
      openVideo();
    } else {
      tip.value = "摄像头处于关闭状态";
    }

    if (hasAudioInput.value) {
      openMicro();
    }
  }

  init();

  /**
   * 监听麦克风
   * @param stream - The media stream from the microphone
   */
  function watchMicro(stream: MediaStream) {
    const audioContext = new window.AudioContext();
    // 将麦克风的声音输入到这个AudioContext中
    const mediaStreamSource = audioContext.createMediaStreamSource(stream);
    // 创建一个AnalyserNode，用于获取音频时间和频率数据
    const analyser = audioContext.createAnalyser();
    // 连接节点
    mediaStreamSource.connect(analyser);
    analyser.fftSize = 1024;
    const bufferLength = analyser.frequencyBinCount;
    // 获取音量数据
    const dataArray = new Uint8Array(bufferLength);

    function set() {
      analyser.getByteTimeDomainData(dataArray);
      let value: number = 0;
      for (let i = 0; i < bufferLength; i++) {
        value += dataArray[i];
      }
      // 计算平均音量， 并放大两倍
      value = (value / bufferLength) * 2;
      // console.log(value);
      volume.value = value > 100 ? 100 : value;
      animationId = requestAnimationFrame(set);
    }
    set();
  }

  async function openMicro() {
    try {
      localStream.audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      hasAudioInput.value = true;
      watchMicro(localStream.audioStream);
    } catch (error) {
      console.log(error);
    }
  }

  function closeMicro() {
    hasAudioInput.value = false;
    const audioTracks = localStream.audioStream?.getTracks();
    audioTracks?.forEach((track) => track.stop());
    cancelAnimationFrame(animationId);
  }

  async function openVideo() {
    try {
      tip.value = "正在打开摄像头...";
      localStream.videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.value.srcObject = localStream.videoStream;
      hasVideoInput.value = true;
    } catch (e) {
      console.log(e);
      if (e instanceof Error) {
        let message = "";
        if (["NotAllowedError", "PermissionDeniedError"].includes(e.name)) {
          message = "用户拒绝授权摄像头权限";
          tip.value = "用户拒绝授权摄像头权限";
        } else if (["NotFoundError", "DevicesNotFoundError"].includes(e.name)) {
          message = "没有找到摄像头设备 ";
          tip.value = "没有找到摄像头设备";
        } else if (["NotReadableError", "TrackStartError"].includes(e.name)) {
          message = "摄像头或麦克风被其他程序占用";
          tip.value = "摄像头或麦克风被其他程序占用";
        }

        alert(message);
      }
    }
  }

  function closeVideo() {
    hasVideoInput.value = false;
    videoRef.value!.srcObject = null;
    const videoTracks = localStream.videoStream?.getTracks();
    videoTracks?.forEach((track) => track.stop());
    tip.value = "摄像头处于关闭状态";
  }

  /**
   * 打开屏幕共享
   */
  async function openScreen() {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });
    // 第二次打开屏幕共享时，关闭之前的屏幕共享
    const oldScreenTracks = localStream.screenStream?.getTracks();
    oldScreenTracks?.forEach((track) => track.stop());

    videoRef.value.srcObject = screenStream;
    localStream.screenStream = screenStream;
    hasScreenInput.value = true;

    // 屏幕共享时，关闭摄像头
    hasVideoInput.value = false;
    const videoTracks = localStream.videoStream?.getTracks();
    videoTracks?.forEach((track) => track.stop());
  }

  function closeScreen() {}

  onUnmounted(() => {
    cancelAnimationFrame(animationId);
  });

  return {
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
    hasScreenInput,
  };
};
