import { useEffect, useState } from "react";
import { Quote, getQuote } from "../../services/quoteService";

function QuoteBox({ date }: { date: string | undefined }) {

  const [quote, setQuote] = useState<Quote | undefined>();

  //get the quote for the given date
  useEffect(() => {
    if (date) getQuote(date).then(quote => setQuote(quote))
  }, [date]);
  
  return (
    <div className="w-full h-32 flex flex-col space-y-2 justify-center sm:p-4 md:p-16 lg:p-24 align-middle bg-smoke">
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
