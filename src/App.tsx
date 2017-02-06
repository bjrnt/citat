import * as React from 'react';
import QuoteForm from './QuoteForm';
import { loadQuotes, saveQuotes } from './storage';
import { Quote } from './Quote';
import QuoteList from './QuoteList';
import { uuid } from './Utils';

interface IState {
  quotes: Quote[],
  editingQuote?: Quote
};

export default 
class App extends React.Component<{}, IState> {
  constructor() {
    super();

    this.state = {
      quotes: [],
      editingQuote: null
    };

    this.loadQuotesFromStorage();
  }

  loadQuotesFromStorage() {
    loadQuotes()
    .then(quotes => {
      this.setState({ ...this.state, quotes });
    });
  }

  saveQuotesToStorage() {
    saveQuotes(this.state.quotes)
    .catch(e => {
      console.error(e);
    });
  }

  createQuote = (q: Pick<Quote, 'text' | 'author' | 'reference'>) => {
    const newQuote = { ...q } as Quote;
    newQuote.id = uuid();

    const quotes = this.state.quotes;
    quotes.push(newQuote);

    this.setState({ ...this.state, quotes, editingQuote: null });
    this.saveQuotesToStorage();
  }

  updateQuote = (q: Quote) => {
    const quotes = this.state.quotes;
    const index = quotes.findIndex(quote => quote.id === q.id);
    quotes[index] = { ...quotes[index], ...q };
    this.setState({ ...this.state, quotes, editingQuote: null });
  }

  removeQuote = ({ id }: Quote) => {
    const quotes = this.state.quotes.filter(quote => quote.id !== id);
    this.setState({ ...this.state, ...quotes });
  }

  onEditQuote = (q: Quote) => {
    this.setState({ ...this.state, editingQuote: q });
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="heading">
            <h1 className="title">Citat</h1>
          </div>
          <br />
          <QuoteForm 
            createQuote={this.createQuote} 
            editingQuote={this.state.editingQuote || undefined}
            updateQuote={this.updateQuote}
          />
          <br />
          <QuoteList 
            quotes={this.state.quotes} 
            onEditQuote={this.onEditQuote}
            removeQuote={this.removeQuote}
          />
        </div>
      </section>
    );
  }
}