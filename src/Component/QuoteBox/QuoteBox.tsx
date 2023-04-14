import { useEffect, useState } from "react";
import { Day } from "../../services/dayService";
import { Quote, getQuote } from "../../services/quoteService";

function QuoteBox({ oldQuote }: { oldQuote: Day['quote'] | undefined }) {

  const [quote, setQuote] = useState<Quote | undefined>();

  useEffect(() => {
    if (oldQuote) setQuote(oldQuote);
    else
      getQuote(new Date().toDateString()).then(quote => setQuote(quote))
  }, [oldQuote]);

  return (
    <div className="w-full h-32 flex flex-col space-y-2 justify-center sm:p-4 md:p-8 lg:p-10 align-middle bg-smoke">
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
