import React  from 'react';

function Comment(props) {
    return (
        <div className="container">
        
            <div className="row">
                <div className="col-md-3"><p>{`${props.comment.user}: `}</p></div>
                <div className="col-md-8"><p>{props.comment.comment}</p></div>
            </div>
            
        </div>
    )
}

export default Comment;