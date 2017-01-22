import * as React from 'react';
import { Quote } from './Quote';

type IState = {
  quote: string,
  author: string,
  reference: string
}

type IProps = {
  saveQuote: (Quote) => void,
  quote?: Quote
}

const EMPTY_STATE = {
  quote: '',
  author: '',
  reference: ''
}

export default
class QuoteForm extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)

    if (props.quote) {
      this.state = props.quote;
    } else {
      this.state = EMPTY_STATE;
    }
  }

  handleQuoteChange = (event: React.FormEvent) => {
    const target = event.target as HTMLTextAreaElement;
    this.setState({ ...this.state, quote: target.value.trim() });
  }

  handleAuthorChange = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;
    this.setState({ ...this.state, author: target.value.trim() });
  }

  handleReferenceChange = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;
    this.setState({ ...this.state, reference: target.value.trim() });
  }

  reset = () => {
    this.setState(EMPTY_STATE);
  }

  saveQuote = () => {
    this.props.saveQuote(this.state);
    this.setState(EMPTY_STATE);
  }

  canSave() {
    return this.state.quote.length > 0 && this.state.author.length > 0;
  }

  render() {
    return (
      <div>
        <label className="label">Quote</label>
        <p className="control">
          <textarea className="textarea" value={this.state.quote} onChange={this.handleQuoteChange}>
          </textarea>
        </p>
        <label className="label">Author</label>
        <p className="control">
          <input className="input" type="text" value={this.state.author} onChange={this.handleAuthorChange} />
        </p>
        <label className="label">Reference</label>
        <p className="control">
          <input className="input" type="text" value={this.state.reference} onChange={this.handleReferenceChange} />
        </p>
        <p className="control">
          <button className="button is-primary" onClick={this.saveQuote} disabled={!this.canSave()}>Save Quote</button>
          <button className="button is-link" onClick={this.reset}>Reset</button>
        </p>
      </div>
    );
  }
}