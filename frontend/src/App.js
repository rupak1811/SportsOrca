import React from 'react';
import MatchList from './MatchList';
import './styles.css';

function App() {
  const title = "⚽ Upcoming Soccer Matches".split('');

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          {title.map((char, index) => (
            <span
              key={index}
              className="title-char"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {char === ' ' ? '\u00A0' : char} {/* Handle spaces */} 
            </span>
          ))}
        </h1>
      </header>
      <main>
        <MatchList />
      </main>
    </div>
  );
}

export default App; 