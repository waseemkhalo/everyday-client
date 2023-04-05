import { useEffect, useState } from "react";
import { Quote, getQuote } from "../../services/quoteService";

function QuoteBox() {

  const [quote, setQuote] = useState<Quote | undefined>();

  useEffect(() => {
    getQuote(new Date().toDateString()).then(quote => setQuote(quote))
  }, []);

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
