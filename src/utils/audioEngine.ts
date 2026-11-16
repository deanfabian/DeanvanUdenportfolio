/**
 * Web Audio API procedural soundscape:
 * Generates continuous soothing rain + distant city low hum.
 * Fully synthetic: zero external network audio files required, zero latency, no broken links.
 */

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isInitialized = false;
  private isPlaying = false;

  private init() {
    if (this.isInitialized && this.ctx) return;

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // 1. Rain Layer: White noise filtered into rain on glass/asphalt
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Pink-ish noise approximation
      output[i] = (Math.random() * 2 - 1) * 0.25;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Rain filter: Lowpass around 1000Hz + mild high-shelf
    const rainFilter = this.ctx.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.setValueAtTime(950, this.ctx.currentTime);
    rainFilter.Q.setValueAtTime(0.7, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    whiteNoise.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(this.masterGain);
    whiteNoise.start(0);

    // 2. Distant City Hum: Sub-bass resonance around 75Hz
    const cityOsc = this.ctx.createOscillator();
    cityOsc.type = 'sine';
    cityOsc.frequency.setValueAtTime(74, this.ctx.currentTime);

    const humFilter = this.ctx.createBiquadFilter();
    humFilter.type = 'lowpass';
    humFilter.frequency.setValueAtTime(120, this.ctx.currentTime);

    const cityGain = this.ctx.createGain();
    cityGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    cityOsc.connect(humFilter);
    humFilter.connect(cityGain);
    cityGain.connect(this.masterGain);
    cityOsc.start(0);

    this.isInitialized = true;
  }

  public play(): void {
    try {
      if (!this.isInitialized) {
        this.init();
      }

      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      if (this.masterGain && this.ctx) {
        this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
        this.masterGain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 1.2);
      }
      this.isPlaying = true;
    } catch {
      // Audio playback allowed upon gesture
    }
  }

  public pause(): void {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
    }
    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioEngine = new SoundscapeEngine();
