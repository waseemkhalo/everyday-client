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
    <div>
      <div className="quote-box">
        <div className="quote-box-quote">
          {quote && //conditional in case quote fails to retrieve
            <>
              <span>"{quote.text}"</span>
              {/* for null author, display 'unknown' */}
              <span> - {quote.author ? quote.author : 'unknown'}</span>
            </>
          }
        </div>
        <a href="https://www.producthunt.com/posts/everyday-94b25aa3-e1da-4538-b9d4-1f864650ef90?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-everyday&#0045;94b25aa3&#0045;e1da&#0045;4538&#0045;b9d4&#0045;1f864650ef90" target="_blank" rel="noreferrer">
          <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=409456&theme=light" alt="Everyday - Get&#0032;sh&#0042;&#0037;&#0032;done&#0032;everyday | Product Hunt" style={{ width: '250px', height: '54px' }} width="250" height="54" />
        </a>
      </div>

    </div>
  );
}

export default QuoteBox;
