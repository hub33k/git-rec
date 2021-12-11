import { FC, useEffect, useState } from 'react';
import './App.css';
import SingleQuote from '../SingleQuote';
import Quote from '../../types/Quote';

interface RandomQuotes {
  currentQuoteIndex: number;
  previousQuoteIndex: number;
}

const API_URL =
  'https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json';

const App: FC = () => {
  const [quotes, setQuotes] = useState<Array<Quote>>([]);
  const [loaded, setLoaded] = useState(false);

  const [randomQuotes, setRandomQuotes] = useState<RandomQuotes>({
    currentQuoteIndex: NaN,
    previousQuoteIndex: NaN,
  });

  useEffect(() => {
    async function fetchQuotes(): Promise<void> {
      return await fetch(API_URL)
        .then((response) => response.json())
        .then((data: Array<Quote>) => {
          setQuotes(data);
          setLoaded(true);
        });
    }

    fetchQuotes();
  }, []);

  const handleRandomQuote = () => {
    const randomQuoteIndex = Math.floor(Math.random() * quotes.length);

    // TODO (hub33k): better handle previous quote
    setRandomQuotes({
      currentQuoteIndex: randomQuoteIndex,
      previousQuoteIndex: randomQuotes.currentQuoteIndex ?? NaN,
    });
  };

  const handlePreviousQuote = () => {
    if (!isNaN(randomQuotes.previousQuoteIndex)) {
      setRandomQuotes({
        currentQuoteIndex: randomQuotes.previousQuoteIndex,
        previousQuoteIndex: NaN,
      });
    }
  };

  return (
    <div className="app">
      <h1 className="app__title">Quotes</h1>

      <button type="button" className="button" onClick={handleRandomQuote}>
        Get a random quote
      </button>

      <button
        type="button"
        className="button"
        disabled={isNaN(randomQuotes.previousQuoteIndex)}
        onClick={handlePreviousQuote}
      >
        Get previous quote
      </button>

      {loaded && (
        <div className="quotes">
          {!isNaN(randomQuotes.currentQuoteIndex) && (
            <>
              <hr />
              <SingleQuote quote={quotes[randomQuotes.currentQuoteIndex]} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
