export type SilhouetteSceneType =
  | 'cooking'
  | 'dancing'
  | 'pacing'
  | 'homework'
  | 'plants'
  | 'couch'
  | 'party'
  | 'tv'
  | 'target'
  | 'dark'
  | 'blinds';

export interface WindowData {
  id: string;
  row: number;
  col: number;
  scene: SilhouetteSceneType;
  lightType: 'tungsten' | 'sodium' | 'tv' | 'dim' | 'off';
  intensity: number; // 0.1 to 1.0
  curtainStyle: 'open' | 'half' | 'sheer' | 'blinds';
  animDelay: number; // seconds
  animDuration: number; // seconds
  isTarget?: boolean;
}

export interface SoundState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
}
