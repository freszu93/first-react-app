import * as React from 'react';
import './AuthorQuiz.scss';
import { IAuthor, IBook, TurnData, onAnswerSelected } from '../index';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="row">
            <div className="jumbotron col-10 offset-1">
                <h1>Author Quiz</h1>
                <p>Select the book written by the author shown</p>
            </div>
        </div>
    );
}

interface BookProps {
    book: IBook;
    onClick(id: number): void;
}

const Book = (props: BookProps) => {
    return (
        <div className="answer" onClick={() => props.onClick(props.book.id)}>
            <h4>{props.book.title}</h4>
        </div>
    );
}

interface TurnProps {
    author: IAuthor;
    books: IBook[];
    highlight: string;
    onAnswerSelected(id: number): void;
}

const Turn: React.FunctionComponent<TurnProps> = (props: TurnProps) => {

    function highlightToBgColor(result: string): string {
        const colorByResult: Map<string, string> = new Map([
            ['none', ''],
            ['correct', 'green'],
            ['wrong', 'red'],
        ]);

        return colorByResult.get(result);
    }

    return (
        <div className="row turn" style={{ backgroundColor: highlightToBgColor(props.highlight) }}>
            <div className="col-4 offset-1">
                <img src={props.author.imageUrl} alt="Author" className="authorimage" />
            </div>
            <div className="col-6">
                {props.books.map(book => <Book book={book} key={book.id} onClick={onAnswerSelected}></Book>)}
            </div>
        </div>
    );
};

interface ContinueProps {
    visible: boolean;
    onContinue(): void;
}

const Continue: React.FunctionComponent<ContinueProps> = (props: ContinueProps) => {
    return (
        <div className="row">
            {props.visible ?
                <div className="col-11">
                    <button className="btn btn-primary float-right" onClick={props.onContinue}>Continue</button>
                </div>
                : null}
        </div>
    );
};

const Footer = () => {
    return (
        <div id="footer" className="row">
            <div className="col-12 offset-1">
                <p className="text-muted credit">All images used in quiz are from https://commons.wikimedia.org/wiki/Main_Page</p>
            </div>
        </div>
    );
}

interface AuthorQuizProps {
    turnData: TurnData;
    highlight: string;
    onAnswerSelected(id: number): void;
    onContinue(): void;
}

export const AuthorQuiz: React.FunctionComponent<AuthorQuizProps> = (props: AuthorQuizProps) => {
    return (
        <div className="container-fluid">
            <Hero />
            <Turn {...props.turnData} highlight={props.highlight} onAnswerSelected={onAnswerSelected} />
            <Continue visible={props.highlight === 'correct'} onContinue={props.onContinue} />
            <p>
                <Link to="/add">Add new author</Link>
            </p>
            <Footer />
        </div>
    );
}
