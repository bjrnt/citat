import * as React from 'react';
import { Quote } from './Quote';

type Props = {
  quotes: Quote[],
  removeQuote: (q: Quote) => void,
  onEditQuote: (q: Quote) => void
};

export default ({ quotes, removeQuote, onEditQuote }: Props) => {
  if (quotes.length === 0) {
    return null;
  }

  return (
    <table className="table is-bordered">
      <thead>
        <tr>
          <th>
            Content
          </th>
          <th>
            Author
          </th>
          <th>
            Reference
          </th>
          <th>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {quotes.map(quote => (
          <tr key={quote.id}>
            <td>{quote.text}</td>
            <td>{quote.author}</td>
            <td>{quote.reference || "None"}</td>
            <td>
              <a
                className="button is-outlined is-small"
                onClick={() => { onEditQuote(quote); }}
              >
                Edit
                </a>
              <a
                className="button is-outlined is-danger is-small"
                onClick={() => { removeQuote(quote); }}
              >
                Delete
                </a>
            </td>
          </tr>
        )
        )}
      </tbody>
    </table>
  );
}
