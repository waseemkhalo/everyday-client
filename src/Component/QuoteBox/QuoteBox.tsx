import { useEffect, useState } from "react";
import { Quote, getQuote } from "../../services/quoteService";
import "./QuoteBox.scss";

function QuoteBox({ date }: { date: string | undefined }) {

  const [quote, setQuote] = useState<Quote | undefined>();

  //get the quote for the given date
  useEffect(() => {
    if (date) getQuote(date).then(quote => setQuote(quote))
  }, [date]);

  return (
    <div className="quote-box bg-smoke">
      {quote && //conditional in case quote fails to retrieve
        <>
          <span>"{quote.text}"</span>
          {/* for null author, display 'unknown' */}
          <span> - {quote.author ? quote.author : 'unknown'}</span>
        </>
      }
    </div>
  );
}

export default QuoteBox;
