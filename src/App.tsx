import * as React from 'react';
import QuoteForm from './QuoteForm';
import { loadQuotes, saveQuotes } from './storage';
import { Quote } from './Quote';
// import QuoteList from './QuoteList';

export default 
class App extends React.Component<{}, { quotes: Quote[] }> {
  constructor() {
    super();

    this.state = {
      quotes: []
    };

    this.loadQuotes();
  }

  loadQuotes() {
    loadQuotes()
    .then(quotes => {
      this.setState({ quotes });
    });
  }

  saveQuotes() {
    saveQuotes(this.state.quotes)
    .catch(e => {
      console.error(e);
    });
  }

  saveQuote = (q: Quote) => {
    const quotes = this.state.quotes;
    quotes.push(q);
    this.setState({ quotes });
    this.saveQuotes();
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="heading">
            <h1 className="title">Citat</h1>
          </div>
          <br />
          <div>
            <QuoteForm saveQuote={this.saveQuote} />
          </div>
        </div>
      </section>
    );
  }
}