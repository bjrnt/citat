import * as React from 'react';
import { Quote } from './Quote';

type IState = Partial<Quote>;

type IProps = {
  createQuote: (q: Pick<Quote, 'text' | 'author' | 'reference'>) => void,
  updateQuote: (q: Quote) => void,
  editingQuote?: Quote
};

const EMPTY_STATE: IState = {
  text: '',
  author: '',
  reference: '',
  id: null
};

export default
class QuoteForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    if (props.editingQuote) {
      this.state = { ...props.editingQuote };
    } else {
      this.state = EMPTY_STATE;
    }
  }

  componentWillReceiveProps({ editingQuote }: IProps) {
    if (editingQuote) {
      this.setState({ ...editingQuote });
    }
  }

  handleQuoteChange = (event: React.FormEvent) => {
    const target = event.target as HTMLTextAreaElement;
    this.setState({ ...this.state, text: target.value });
  }

  handleAuthorChange = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;
    this.setState({ ...this.state, author: target.value });
  }

  handleReferenceChange = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;
    this.setState({ ...this.state, reference: target.value });
  }

  reset = () => {
    this.setState(EMPTY_STATE);
  }

  onSaveQuote = () => {
    if (this.state.id) {
      const editedQuote = { ...this.props.editingQuote, ...this.state };
      this.props.updateQuote(editedQuote);
    } else {
      const newQuote = { ...this.state } as Pick<Quote, 'text' | 'author' | 'reference'>;
      this.props.createQuote(newQuote);
    }
    this.setState(EMPTY_STATE);
  }

  canSave() {
    return this.state.text.length > 0 && this.state.author.length > 0;
  }

  render() {
    return (
      <div>
        <label className="label">Quote</label>
        <p className="control">
          <textarea className="textarea" value={this.state.text} onChange={this.handleQuoteChange}>
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
          <button className="button is-primary" onClick={this.onSaveQuote} disabled={!this.canSave()}>Save Quote</button>
          <button className="button is-link" onClick={this.reset}>Reset</button>
        </p>
      </div>
    );
  }
}