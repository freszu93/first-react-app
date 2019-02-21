import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, withRouter, Redirect, RouteComponentProps } from 'react-router-dom';
import './index.css';
import 'bootstrap/scss/bootstrap.scss'
import { AuthorQuiz } from './author-quiz/AuthorQuiz'
import { shuffle, sample } from 'underscore';
import { AuthorDetail } from './author-quiz/author-detail/AuthotDetail';

export interface IBook {
    id: number,
    title: string
}

export interface IAuthor {
    name: string;
    imageUrl: string;
    imageSource: string;
    imageAttribution?: string;
    books: IBook[];
}

const authors: IAuthor[] = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            { id: 1, title: 'The Adventures of Huckleberry Finn' }
        ]
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.png',
        imageSource: 'Wikimedia Commons',
        books: [
            { id: 3, title: 'Heart of Darkness' }
        ]
    },
    {
        name: 'J.K. Rowling',
        imageUrl: 'images/authors/jkrowling.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Daniel Ogren',
        books: [
            { id: 3, title: 'Harry Potter and the Sorcerers Stone' }
        ]
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/authors/stephenking.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Pinguino',
        books: [
            { id: 4, title: 'The Shining' },
            { id: 5, title: 'IT' }
        ]
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            { id: 6, title: 'David Copperfield' },
            { id: 7, title: 'A Tale of Two Cities' }
        ]
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/williamshakespeare.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            { id: 8, title: 'Hamlet' },
            { id: 9, title: 'Macbeth' },
            { id: 10, title: 'Romeo and Juliet' }
        ]
    }
];

const getTurnData = (authors: IAuthor[]): TurnData => {
    const allBooks: IBook[] = authors.reduce<IBook[]>((previous, current) => {
        return previous.concat(current.books);
    }, []);

    const fourRandomBooks: IBook[] = shuffle<IBook>(allBooks).slice(0, 4);
    const answer: IBook = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find(author => author.books.some(book => book.id === answer.id))
    }
};

export interface TurnData {
    books: IBook[],
    author: IAuthor
}

interface State {
    turnData: TurnData,
    highlight: string;
}

const resetState = (): State => {
    return {
        turnData: getTurnData(authors),
        highlight: ''
    }
}

let state: State = resetState();

export const onAnswerSelected = (answerId: number): void => {
    const isCorrect: boolean = state.turnData.author.books.some(book => book.id === answerId);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}

const App: React.FunctionComponent = () => {
    return (<AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} onContinue={() => { state = resetState(); render(); }} />);
}


interface AddAuthorProps extends RouteComponentProps<{}> {
}

const AddAuthor: React.FunctionComponent<AddAuthorProps> = (props: AddAuthorProps) => {

    const onAdd = (author: IAuthor) => {
        authors.push(author);
        console.log(history.length)
        props.history.push('/');
    }

    return (<AuthorDetail onAdd={author => {
        onAdd(author);
    }}></AuthorDetail>)
}

const render = () => {
    ReactDOM.render(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/add" component={AddAuthor} />
            </Switch>
        </BrowserRouter>
        , document.getElementById('root'));
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
