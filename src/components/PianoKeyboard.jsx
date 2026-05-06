const PianoKeyboard = ({ notes, activeNote, onNotePlay, keyBindings }) => {
  const isBlackKey = (note) => note.includes('#');

  // Инвертируем маппинг для отображения клавиш
  const noteToKey = Object.entries(keyBindings).reduce((acc, [key, note]) => {
    acc[note] = key;
    return acc;
  }, {});

  return (
    <div className="piano-container">
      <div className="piano-keyboard">
        {notes.map((note) => {
          const black = isBlackKey(note);
          const active = activeNote === note;
          const keyLabel = noteToKey[note] || '';
          
          return (
            <button
              key={note}
              className={`piano-key ${black ? 'black-key' : 'white-key'} ${active ? 'active' : ''}`}
              onMouseDown={() => onNotePlay(note)}
              data-note={note}
            >
              <div className="key-content">
                <span className="key-hint">{keyLabel}</span>
                <span className="note-label">{note}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PianoKeyboard;
