import axios from 'axios'
import React, { useState } from 'react'

function QuoteBox() {

    const [quote, setQuote] = useState([])

    axios
    .get('https://type.fit/api/quotes')
    .then(res => {
        const randomIndex = Math.floor(Math.random() * res.data.length)
        setQuote(res.data[randomIndex])
        console.log('sd')
    }).catch(err => {
        console.log(err)
    })

    
  return (

    <div className='w-full bg-red'>
        <h1>asd</h1>
        <span>This is a quote</span>
    </div>


  )
}

export default QuoteBox