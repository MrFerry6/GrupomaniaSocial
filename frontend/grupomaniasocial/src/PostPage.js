import React from 'react';

const PostPage = () => {
    return(<>
    <h1>USERR LOGGED</h1>
    <button onClick={unlogin}>Unlogin</button>
    </>)
}
function unlogin(){
    window.sessionStorage.removeItem('token')
    window.location.reload(false); 
}
export default PostPage;