import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { useLanguage } from '../context/LanguageContext';

export const SoundToggle: React.FC = () => {
  const { t } = useLanguage();
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
            ? t.sound.quietInside
            : 'Mute ambient soundscape'
          : 'Play ambient rain and city soundscape'
      }
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 border border-white/15 bg-[#070b14]/90 backdrop-blur-sm text-slate-400 hover:text-slate-100 hover:border-amber-400/50 transition-colors group focus:outline-none focus:border-amber-400 select-text"
    >
      {isPlaying ? (
        <>
          <Volume2
            className={`w-3.5 h-3.5 transition-colors duration-300 ${
              isInside ? 'text-amber-400/40' : 'text-amber-400'
            }`}
          />
          <span
            className={`text-[10px] tracking-widest uppercase font-mono pr-1 transition-colors duration-300 ${
              isInside ? 'text-slate-400' : 'text-slate-200'
            }`}
          >
            {isInside ? t.sound.quietInside : t.sound.rainCity}
          </span>
          <span
            className={`w-1.5 h-1.5 transition-colors duration-300 ${
              isInside ? 'bg-amber-400/30' : 'bg-amber-400'
            }`}
          />
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-[10px] tracking-widest uppercase font-mono pr-1 text-slate-500 group-hover:text-slate-300">
            {t.sound.soundOff}
          </span>
        </>
      )}
    </button>
  );
};
