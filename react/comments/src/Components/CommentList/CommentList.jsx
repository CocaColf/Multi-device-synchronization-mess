import React, {Component} from 'react';
import Comment from './Comment';

class CommentApp extends Component {
    // 处理删除
    handleDelete(index) {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index);
        }
    }

    render() {
        return (
           <div>
               {this.props.comments.map((comment, i) => 
                    <Comment 
                        comment={comment} 
                        key={i} 
                        index={i}
                        onDelete={this.handleDelete.bind(this)}/>
                )}
           </div>
        );
    }
}

export default CommentApp;