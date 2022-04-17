import React from 'react';
import { Form, Button } from 'react-bootstrap';

const PostPage = () => {
    return (<>
        <Button onClick={unlogin}>Unlogin</Button>
        <Button onClick={deleteUser}>delete</Button>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>post</Form.Label>
                <Form.Control as="textarea" rows={5}/>
                <Button>Send</Button>
                <Button>Media</Button>
            </Form.Group>
        </Form>
    </>)
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
export default PostPage;