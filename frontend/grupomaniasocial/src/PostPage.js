
import { Form, Button } from 'react-bootstrap';

import React, { useState } from 'react';

const PostPage = () => {

    const [postBody, setPostBody] = useState([
        {
            title: '',
            text: ''
        }
    ]);
    function handleTitleChange(event) {
        setPostBody(
            {
                title: event.target.value,
                text: postBody.text
            });
    }
    function handleTextChange(event) {
        setPostBody(
            {
                title: postBody.title,
                text: event.target.value
            });
    }
    function sendPost() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let session = window.sessionStorage.getItem('session')
        var raw = JSON.stringify({
            "title": postBody.title,
            "text": postBody.text,
            "token": session
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/api/users/post", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    function deleteUser() {
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
    function unlogin() {
        window.sessionStorage.removeItem('session')
        window.location.reload(false);
    }

    return (<>
        <Button onClick={unlogin}>Unlogin</Button>
        <Button onClick={deleteUser}>delete</Button>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Title" onChange={handleTitleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>post</Form.Label>
                <Form.Control as="textarea" rows={5} onChange={handleTextChange} />
                <Button onClick={sendPost}>Send</Button>
                <Button>Media</Button>
            </Form.Group>
        </Form>
    </>)
}


export default PostPage;