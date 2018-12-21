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

    _saveComments() {
        localStorage.setItem('comments', JSON.stringify(this.state.comments));
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

    // 收到表单提交的数据并保存
    getData(data) {
        this.state.comments.push(data);
        this.setState({
            comments: this.state.comments
        });

        this._saveComments();
    }

    // 删除评论
    handleDelete(index) {
        let comments = this.state.comments;
        comments.splice(index, 1);
        this.setState({comments});

        this._saveComments();
    }

    render() {
        return (
           <div className="container">
                <CommentInput onSubmit={this.getData.bind(this)}/>           
                <CommentList 
                    comments={this.state.comments}
                    onDeleteComment={this.handleDelete.bind(this)}/>
           </div>
        );
    }
}

export default CommentApp;