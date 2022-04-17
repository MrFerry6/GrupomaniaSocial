import React from 'react';

const PostPage = () => {
    return(<>
        <button onClick={unlogin}>Unlogin</button>
        <button onClick={deleteUser}>delete</button>
    </>)
}
function deleteUser(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const session = window.sessionStorage.getItem('session')
    var raw = JSON.stringify({
      "session": session
    });
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3001/api/auth/delete", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    unlogin();
}
function unlogin(){
    window.sessionStorage.removeItem('session')
    window.location.reload(false); 
}
export default PostPage;