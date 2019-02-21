import * as React from 'react';
import { IAuthor, IBook } from '../..';

interface State {
    name: string;
    imageUrl: string;
    books: IBook[];
}

interface AuthorDetailProps {
    onAdd(author: IAuthor): void;
}

export class AuthorDetail extends React.Component<AuthorDetailProps, State> {

    state: State = {
        name: '',
        imageUrl: '',
        books: []
    } as State;

    bookTemp: React.RefObject<HTMLInputElement> = React.createRef();

    constructor(props: AuthorDetailProps) {
        super(props);
        // this.onFieldChange = this.onFieldChange.bind(this); HAVE TO BE BINDED IF WANT TO USE THIS.setState INSIDE METHOD!!!
    }

    // // HAS TO BE BINDED IF YU WANT TO USE setState METHOD!!!
    // onFieldChange = (name: React.ChangeEvent<HTMLInputElement>): void => {
    //     this.setState({
    //         ...this.state,
    //         [name.target.name]: name.target.value
    //     });
    // }

    // TO NOT BIND method to this => arrow function isn't create another context!!!!
    onFieldChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    onAddBook = (): void => {
        this.setState({
            ...this.state,
            books: [
                ...this.state.books,
                { id: this.state.books.length, title: this.bookTemp.current.value }
            ]
        });
        this.bookTemp.current.value = '';
    }

    onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        this.props.onAdd({ ...this.state } as IAuthor);
    }

    render() {
        return (
            <form onSubmit={event => this.onSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" type="text" name="name" value={this.state.name} onChange={this.onFieldChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input className="form-control" type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="bookTemp">Books</label>
                    {this.state.books.map(book => <p key={book.title}>{book.title}</p>)}
                    <div className="input-group">
                        <input className="form-control" type="text" name="bookTemp" ref={this.bookTemp} />
                        <div className="input-group-append">
                            <button type="button" className="btn btn-primary" onClick={() => this.onAddBook()}>+</button>
                        </div>
                    </div>
                </div>
                <input type="submit" value="Add" />
            </form>
        )
    }
}
