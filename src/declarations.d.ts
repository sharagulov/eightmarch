declare module 'vanta/dist/vanta.fog.min' {
  import * as THREE from 'three';
  interface VantaFogOptions {
    THREE: typeof THREE;
    el: HTMLElement;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    highlightColor?: number;
    midtoneColor?: number;
    lowlightColor?: number;
    baseColor?: number;
    blurFactor?: number;
    zoom?: number;
    speed?: number;
  }
  function FOG(options: VantaFogOptions): { destroy: () => void };
  export default FOG;
}
