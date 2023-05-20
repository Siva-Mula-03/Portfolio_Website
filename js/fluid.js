const isTouch = 'ontouchstart' in document.documentElement;

if (!isTouch) {
  WebGLFluid(document.querySelector('canvas'), {
    IMMEDIATE: false, // Whether to trigger multiple random splats when initialized
    TRIGGER: 'hover', // Can be change to 'click'
    SIM_RESOLUTION: 256,
    DYE_RESOLUTION: 1440,
    CAPTURE_RESOLUTION: 512,
    DENSITY_DISSIPATION: 1,
    VELOCITY_DISSIPATION: 0.2,
    PRESSURE: 0.1,
    PRESSURE_ITERATIONS: 20,
    CURL: 2,
    SPLAT_RADIUS: 0.1,
    SPLAT_FORCE: 2000,
    SHADING: true,
    COLORFUL: true,
    COLOR_UPDATE_SPEED: 30,
    PAUSED: false,
    BACK_COLOR: { r: 0, g: 0, b: 0 },
    TRANSPARENT: true,
    BLOOM: false,
    BLOOM_ITERATIONS: 8,
    BLOOM_RESOLUTION: 128,
    BLOOM_INTENSITY: 0.01,
    BLOOM_THRESHOLD: 0.2,
    BLOOM_SOFT_KNEE: 0.4,
    SUNRAYS: true,
    SUNRAYS_RESOLUTION: 196,
    SUNRAYS_WEIGHT: 0.3,
  })
} else {
  const parent = document.querySelector('#bg');
  parent.removeChild(parent.querySelector('canvas'));
}