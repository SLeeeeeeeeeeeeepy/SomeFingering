import { useRef, useEffect, useCallback } from 'react';
import * as Tone from 'tone';

export const useAudio = (transposeSemitones = 0) => {
  const synthRef = useRef(null);

  useEffect(() => {
    // Настраиваем синтезатор для звука похожего на флейту
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: {
        attack: 0.05,
        decay: 0.1,
        sustain: 0.5,
        release: 1.5
      }
    }).toDestination();
    
    synthRef.current = synth;

    return () => {
      synth.dispose();
    };
  }, []);

  const playNote = useCallback(async (note) => {
    if (Tone.context.state !== 'running') {
      await Tone.start();
    }
    if (synthRef.current) {
      let frequencyToPlay = note;
      if (transposeSemitones !== 0) {
        frequencyToPlay = Tone.Frequency(note).transpose(transposeSemitones).toNote();
      }
      synthRef.current.triggerAttackRelease(frequencyToPlay, "8n");
    }
  }, [transposeSemitones]);

  const changeVolume = useCallback((val) => {
    if (val === 0) {
      Tone.Destination.mute = true;
    } else {
      Tone.Destination.mute = false;
      // Convert linear 0-100 to decibels
      Tone.Destination.volume.value = Tone.gainToDb(val / 100);
    }
  }, []);

  return { playNote, changeVolume };
};
