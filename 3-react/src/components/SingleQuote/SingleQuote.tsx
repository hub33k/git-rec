import { FC } from 'react';
import Quote from '../../types/Quote';
import './SingleQuote.css';

interface SingleQuoteProps {
  quote: Quote;
}

const SingleQuote: FC<SingleQuoteProps> = ({ quote }) => {
  return (
    <>
      <figure>
        <blockquote>
          <p>{quote.quote}</p>
        </blockquote>
        <figcaption>—{quote.author}</figcaption>
      </figure>
    </>
  );
};

export default SingleQuote;
