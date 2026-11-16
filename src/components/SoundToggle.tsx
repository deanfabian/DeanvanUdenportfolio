import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const SoundToggle: React.FC = () => {
  const [audioState, setAudioState] = useState(() => ({
    isPlaying: audioEngine.getIsPlaying(),
    isInside: audioEngine.getIsInside(),
  }));

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    audioEngine.toggle();
  };

  const { isPlaying, isInside } = audioState;

  return (
    <button
      onClick={handleToggle}
      type="button"
      aria-label={
        isPlaying
          ? isInside
            ? 'Outside sound faded inside'
            : 'Mute ambient soundscape'
          : 'Play ambient rain and city soundscape'
      }
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 px-3 py-2 rounded-full border border-slate-800/80 bg-slate-950/70 backdrop-blur-md text-slate-400 hover:text-slate-100 hover:border-slate-700/80 transition-all duration-300 shadow-xl group focus:outline-none focus:ring-1 focus:ring-amber-500/50"
    >
      {isPlaying ? (
        <>
          <Volume2
            className={`w-4 h-4 transition-all duration-500 ${
              isInside ? 'text-amber-400/50' : 'text-amber-400 group-hover:scale-110'
            }`}
          />
          <span
            className={`text-[11px] tracking-widest uppercase font-mono pr-1 transition-colors duration-500 ${
              isInside ? 'text-slate-400' : 'text-slate-200'
            }`}
          >
            {isInside ? 'Quiet Inside' : 'Rain · City'}
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              isInside ? 'bg-amber-400/30' : 'bg-amber-400 animate-pulse'
            }`}
          />
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-slate-500 transition-transform group-hover:scale-110" />
          <span className="text-[11px] tracking-widest uppercase font-mono pr-1 text-slate-500 group-hover:text-slate-400">
            Sound Off
          </span>
        </>
      )}
    </button>
  );
};
