export const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const OCTAVES = [
  { id: "middle", label: "Middle", value: 4 }
];

const FINGERINGS = {
  middle: {
    "C":  [0, 0, 0],
    "C#": [0, 1, 1],
    "D":  [1, 0, 1],
    "D#": [0, 1, 0],
    "E":  [1, 1, 0],
    "F":  [1, 0, 0],
    "F#": [1, 1, 1],
    "G":  [0, 0, 0],
    "G#": [0, 1, 1],
    "A":  [1, 0, 1],
    "A#": [0, 1, 0],
    "B":  [1, 1, 0]
  }
};

export const getFingering = (noteStr, octaveId) => {
  const baseNote = noteStr.replace(/[0-9]/g, '');
  const octaveData = FINGERINGS[octaveId] || FINGERINGS.middle;
  return octaveData[baseNote] || [0, 0, 0];
};
