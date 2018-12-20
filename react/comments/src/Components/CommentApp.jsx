import React, {Component} from 'react';
import CommentList from './CommentList/CommentList';
import CommentInput from './CommentInput/CommentInput';

class CommentApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }

    _loadComments() {
        let comments = localStorage.getItem('comments');

        if (comments) {
            comments = JSON.parse(localStorage.getItem('comments'));

            this.setState({
                comments: comments
            });
        }
    }

    componentWillMount() {
        this._loadComments();
    }

    getData(data) {
        this.state.comments.push(data);
        this.setState({
            comments: this.state.comments
        });

        localStorage.setItem('comments', JSON.stringify(this.state.comments));
    }

    render() {
        return (
           <div className="container">
                <CommentInput onSubmit={this.getData.bind(this)}/>           
                <CommentList comments={this.state.comments}/>
           </div>
        );
    }
}

export default CommentApp;