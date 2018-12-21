import React, {Component} from 'react';

class Comment extends Component{

    constructor(props) {
        super(props);
        this.state = {
            timeString: ''
        }
    }

    // 更新评论时间
    _updateTimeString() {
        const timeStamp = this.props.comment.createTime;
        let diffTime = (+Date.now() - timeStamp) / 1000;

        this.setState({
            timeString: diffTime > 60
                ? `${Math.round(diffTime / 60)} 分钟前`
                : `${Math.round(Math.max(diffTime, 1))} 秒前`
        });
    }

    componentWillMount() {
        this._updateTimeString();
        this._timer = setInterval(this._updateTimeString.bind(this), 5000);
    }
    componentWillUnmount() {
        clearInterval(this._timer);
    }

    handleDelete() {
        if (this.props.onDelete) {
            this.props.onDelete(this.props.index);
        }
    }

    render() {
        return (
            <div className="container">
    
                <div className="row">
                    <div className="col-md-3"><p>{`${this.props.comment.user}: `}</p></div>
                    <div className="col-md-4"><p>{this.props.comment.comment}</p></div>
                    <div className="col-md-3"><p>{this.state.timeString}</p></div>
                    <div className="col-md-2"><button 
                                                className="btn btn-danger"
                                                onClick={this.handleDelete.bind(this)}>删除
                                            </button>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Comment;