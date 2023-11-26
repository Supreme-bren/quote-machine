import React, {useEffect, useState} from 'react';
import './App.css';
import COLORS from './colors.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons';
{/*Importing icons from font awesome for the twitter logo and the quotation mark*/}

function App() {

  {/*Assigning variable to database of quotes in object format*/ }
let quoteDatabase = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

{/*Using the useState function to define state and update state after re-render for the quotes, author and assinged colors*/}
  const [quote, setQuote] = useState("Work big and dare to fail.");
  const [author, setAuthor] = useState("Norman Vaughan");
  const [quotesArray, setQuotesArray] = useState(null);
  const [accColor, setaccColor] = useState('#56cf67');

  {/*Assigning a variable to the newly created array of quotes created by using the async function to parse the database*/}
  const fetchMyQuotes = async (url) => {
    const response = await fetch(url);
    const parseJSON = await response.json();
    setQuotesArray(parseJSON.quotes);
}

  useEffect(() =>{
    
    fetchMyQuotes(quoteDatabase)
  }, [quoteDatabase])

  {/*Created a function that creates a series of random numbers to select quote-authors and colors by random*/}
  const getRandom = () =>{
    let randomInt = Math.floor(Math.random() * quotesArray.length);
    setaccColor(COLORS[randomInt]);
    setQuote(quotesArray[randomInt].quote);
    setAuthor(quotesArray[randomInt].author)
  }

  {/*Output rendered to html webpage*/}
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accColor}}>
        <h1 id="welcome">Lets Create Some Positivity!</h1>
        <div id="quote-box" style={{color: accColor}}>
        <p id="text">
        <FontAwesomeIcon icon={faQuoteLeft} id="quotation" />{quote}"
        </p>
        <p id="author"  style={{color: accColor}}>-{author}</p>

        <div class="link">
        <button onClick = {() => getRandom()} style={{backgroundColor: accColor}} id="new-quote">New Quote</button>
        <a id="tweet-quote" style={{backgroundColor: accColor}} href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}
        ><FontAwesomeIcon icon = {faTwitter} /></a>
        </div>
        </div>
        <footer id="name">-Created by Brennan Osunkwo</footer>
      </header>
    </div>
  );
}

export default App;
