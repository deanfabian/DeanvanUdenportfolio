/**
 * Web Audio API procedural soundscape:
 * Generates continuous soothing rain + distant city low hum.
 * Fully synthetic: zero external network audio files required, zero latency, no broken links.
 * 
 * Features dynamic acoustic propagation:
 * - Outside (0% - 45% scroll): Full ambient rain and open city acoustics.
 * - Through the window glass (45% - 72% scroll): Frequencies muffle and roll off as camera nears glass.
 * - Inside the room & below (72%+ scroll): Outside sound smoothly attenuates to absolute zero sound.
 */

type AudioStateListener = (state: { isPlaying: boolean; isInside: boolean }) => void;

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private userMasterGain: GainNode | null = null;
  private outsideGain: GainNode | null = null;
  private rainFilter: BiquadFilterNode | null = null;
  private isInitialized = false;
  private isPlaying = false;
  private isInside = false;
  private currentProgress = 0;
  private listeners: Set<AudioStateListener> = new Set();

  private init() {
    if (this.isInitialized && this.ctx) return;

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();

    // 1. User Master Gain (Handles Mute / Unmute toggle)
    this.userMasterGain = this.ctx.createGain();
    this.userMasterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.userMasterGain.connect(this.ctx.destination);

    // 2. Outside Environment Gain (Drives indoor/outdoor acoustic fade based on scroll)
    this.outsideGain = this.ctx.createGain();
    const initialOutsideGain = this.currentProgress >= 0.72 ? 0 : 1;
    this.outsideGain.gain.setValueAtTime(initialOutsideGain, this.ctx.currentTime);
    this.outsideGain.connect(this.userMasterGain);

    // 3. Rain Layer: White noise filtered into rain on glass/asphalt
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.25;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Rain filter: Lowpass around 950Hz (open air) -> sweeps down to 180Hz as we near window
    this.rainFilter = this.ctx.createBiquadFilter();
    this.rainFilter.type = 'lowpass';
    const initialFreq = this.currentProgress >= 0.72 ? 180 : 950;
    this.rainFilter.frequency.setValueAtTime(initialFreq, this.ctx.currentTime);
    this.rainFilter.Q.setValueAtTime(0.7, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    whiteNoise.connect(this.rainFilter);
    this.rainFilter.connect(rainGain);
    rainGain.connect(this.outsideGain);
    whiteNoise.start(0);

    // 4. Distant City Hum: Sub-bass resonance around 74Hz
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
    cityGain.connect(this.outsideGain);
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

      if (this.userMasterGain && this.ctx) {
        this.userMasterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.userMasterGain.gain.setValueAtTime(this.userMasterGain.gain.value, this.ctx.currentTime);
        this.userMasterGain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 1.0);
      }
      this.isPlaying = true;
      this.notifyListeners();
    } catch {
      // Audio playback allowed upon gesture
    }
  }

  public pause(): void {
    if (this.userMasterGain && this.ctx) {
      this.userMasterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.userMasterGain.gain.setValueAtTime(this.userMasterGain.gain.value, this.ctx.currentTime);
      this.userMasterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);
    }
    this.isPlaying = false;
    this.notifyListeners();
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

  /**
   * Smoothly drives the outdoor-to-indoor acoustic transition based on scroll progress:
   * - progress <= 0.45: Fully outside (100% volume, open frequency response)
   * - 0.45 < progress < 0.72: Approaching glass window; frequencies muffle and volume rolls off
   * - progress >= 0.72: Inside the flat; outside sound attenuates to absolute zero sound.
   */
  public setScrollProgress(progress: number): void {
    this.currentProgress = progress;

    const newIsInside = progress >= 0.72;
    if (newIsInside !== this.isInside) {
      this.isInside = newIsInside;
      this.notifyListeners();
    }

    if (!this.isInitialized || !this.ctx || !this.outsideGain || !this.rainFilter) {
      return;
    }

    const currentTime = this.ctx.currentTime;

    if (progress <= 0.45) {
      // Fully Outside
      this.outsideGain.gain.setTargetAtTime(1.0, currentTime, 0.05);
      this.rainFilter.frequency.setTargetAtTime(950, currentTime, 0.05);
    } else if (progress < 0.72) {
      // Transitioning through the window glass
      const t = (progress - 0.45) / (0.72 - 0.45); // 0 to 1
      const factor = Math.max(0, Math.min(1, 1 - t));
      // Quadratic/cubic acoustic attenuation curve
      const volumeFactor = Math.pow(factor, 2.4);
      const filterFreq = 950 - t * 760; // 950Hz -> 190Hz muffled

      this.outsideGain.gain.setTargetAtTime(volumeFactor, currentTime, 0.04);
      this.rainFilter.frequency.setTargetAtTime(filterFreq, currentTime, 0.04);
    } else {
      // Inside the room / Chapter 1: Absolute zero sound from outside
      this.outsideGain.gain.setTargetAtTime(0.0, currentTime, 0.03);
      this.rainFilter.frequency.setTargetAtTime(160, currentTime, 0.03);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsInside(): boolean {
    return this.isInside;
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    // Initial call
    listener({ isPlaying: this.isPlaying, isInside: this.isInside });
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    const state = { isPlaying: this.isPlaying, isInside: this.isInside };
    this.listeners.forEach((listener) => listener(state));
  }
}

export const audioEngine = new SoundscapeEngine();
