import axios from "axios";
import React, { useState, useEffect } from "react";

function QuoteBox() {
  const [quote, setQuote] = useState({ text: "", author: "" });

  useEffect(() => {
    axios
      .get("https://type.fit/api/quotes")
      .then((res) => {
        const randomIndex = Math.floor(Math.random() * res.data.length);
        setQuote(res.data[randomIndex]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full h-32 flex flex-col space-y-2 justify-center sm:p-4 md:p-8 lg:p-10 align-middle bg-smoke">
      <span>"{quote.text}"</span>
      <span> {quote.author}</span>
    </div>
  );
}

export default QuoteBox;
