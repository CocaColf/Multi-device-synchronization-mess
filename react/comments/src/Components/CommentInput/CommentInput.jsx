import React, {Component} from 'react';
class CommentInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            comment: ''
        }
    }

    _setUsername(userName) {
        localStorage.setItem('user', userName);
    }


    componentDidMount() {
        this.textArea.focus();
        this.setState({
            user: localStorage.getItem('user')
        });
    }

    handleSetUser(e) {
        this.setState({
            user: e.target.value
        });
    }

    handleSetContent(e) {
        this.setState({
            comment: e.target.value
        });
    }

    // 点击提交
    handleSubmit(e) {
        e.preventDefault();
        if (this.props.onSubmit) {
            const { user, comment } = this.state;
            this.props.onSubmit({
                user, 
                comment,
                createTime: +new Date()
            });
          }
        
        this._setUsername(this.state.user);

        this.setState({ comment: '' });
    }

    render() {
        return (
           <div className="container">
                <form action="">
                    <div className="form-group">
                        <label htmlFor="">用户名</label>
                        <input 
                            className="form-control"
                            type="text" 
                            name="user" 
                            onChange={this.handleSetUser.bind(this)} 
                            value={this.state.user}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="textContent">评论内容: </label>
                        <textarea 
                            className="form-control"
                            name="textConetnt" 
                            cols="30" 
                            rows="10" 
                            onChange={this.handleSetContent.bind(this)} 
                            value={this.state.comment}
                            ref={(textArea) => this.textArea = textArea}>
                        </textarea>
                    </div>

                    <button onClick={this.handleSubmit.bind(this)} className="btn btn-primary btn-block">提交</button>
                </form>
                
           </div>
        );
    }
}

export default CommentInput;