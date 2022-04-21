
import { Form, Button, Accordion } from 'react-bootstrap';

import React, { useState, useEffect } from 'react';

const PostPage = () => {
    const [postTopics, setpostTopics] = useState();
    const [postBody, setPostBody] = useState([
        {
            title: '',
            text: ''
        }
    ]);
    const [postIds, setpostIds] = useState();
    const [unreadIds, setUnreadIds] = useState();
    const [readIds, setReadIds] = useState();

    useEffect(() => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:3001/api/users/getPost", requestOptions)
            .then(response => response.text())
            .then((result) => {
                const entriesResult = JSON.parse(result);
                let entries = [];
                let ids = [];
                for (let entrie of entriesResult) {
                    entries.push(entrie)
                    ids.push(entrie.id)
                }
                setpostIds(ids);
                setpostTopics(entries);
            })
            .catch(error => console.log('error', error));
    }, [])
    useEffect(() => {
        const session = window.sessionStorage.getItem('session')
        var requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + session
            },
            redirect: 'follow'
        };

        fetch("http://localhost:3001/api/auth/findUser", requestOptions)//check route
            .then(response => response.text())
            .then((result) => {
                const user = JSON.parse(result);
                console.log(user.user.unreadPosts);


                if (user.user.unreadPosts.length === 0 && user.user.readPosts.length === 0 && postIds.length > 0) {
                    console.log('PostIds:  ' + postIds);

                    updateUnreadPosts(session, postIds);
                }
                if (user.user.unreadPosts.length > 0 && user.user.readPosts.length === 0 && postIds.length > 0) {
                    console.log('Post at unread: ' + user.user.unreadPosts)
                    for (let id of postIds) {
                        if (!user.user.unreadPosts.includes(id)) {
                            user.user.unreadPosts.push(id);
                        }
                    }
                    updateUnreadPosts(session, user.user.unreadPosts);
                }
                if (user.user.unreadPosts.length > 0 && user.user.readPosts.length > 0 && postIds.length > 0) {
                    console.log('MIELDA!!!!!!!!!!!!!!!!!!')
                    for (let id of postIds) {
                        if (!user.user.unreadPosts.includes(id) && !user.user.readPosts.includes(id)) {
                            user.user.unreadPosts.push(id);
                        }
                    }
                    updateUnreadPosts(session, user.user.unreadPosts);
                }
            })
            .catch(error => console.log('error', error));

    }, [postIds])



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
            "session": session
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/api/users/post", requestOptions)//chek the route
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
    function updateUnreadPosts(session, postIds) {
        var requestOptions = {
            method: 'PUT', headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + session
            },
            body: JSON.stringify(postIds),
            redirect: 'follow'
        };
        fetch('http://localhost:3001/api/auth/modifyUnread', requestOptions)
            .then(response => response.text())
            .then((result) => {
                console.log('result; ' + result);
                const user = JSON.parse(result);
                setUnreadIds(user.user.unreadPosts);
            })
            .catch(error => console.log('error', error));
    }
    function updateReadPosts(session, postIds) {
        var requestOptions = {
            method: 'PUT', headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + session
            },
            body: JSON.stringify(postIds),
            redirect: 'follow'
        };
        fetch('http://localhost:3001/api/auth/modifyRead', requestOptions)
            .then(response => response.text())
            .then((result) => {
                console.log('result; ' + result);
                //const user = JSON.parse(result);
                //setUnreadIds(user.user.unreadPosts);
            })
            .catch(error => console.log('error', error));
    }

    function checkIds(unreadId, postId) {
        if (unreadId === postId) { return true }
        else { return }
    }

    function handleUpdateRead(event, id) {

        const session = window.sessionStorage.getItem('session')
        var requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + session
            },
            redirect: 'follow'
        };

        fetch("http://localhost:3001/api/auth/findUser", requestOptions)//check route
            .then(response => response.text())
            .then((result) => {
                const user = JSON.parse(result);
                console.log('handleUpdate: '+ result)
                const unread = arrayRemove(user.user.unreadPosts,id);
                let read = user.user.readPosts;
                read.push(id);
                updateUnreadPosts(session,unread);
                updateReadPosts(session, read);
            })
    }
    function arrayRemove(arr, value) { 
    
        return arr.filter(function(ele){ 
            return ele != value; 
        });
    }
    return (<>
        <Button onClick={unlogin}>Unlogin</Button>
        <Button onClick={deleteUser}>delete</Button>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>title</Form.Label>
                <Form.Control type="text" placeholder="Title" onChange={handleTitleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>post</Form.Label>
                <Form.Control as="textarea" rows={5} onChange={handleTextChange} />
                <Button onClick={sendPost}>Send</Button>
                <Button>Media</Button>
            </Form.Group>
        </Form>
        <div>
            {postTopics &&
                postTopics.map((topic) => (
                    <Accordion key={topic.id} defaultActiveKey="0">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header onClick={(e) =>{
                                handleUpdateRead(e, topic.id)
                            }}>{topic.title}<div>    -----------:{unreadIds && unreadIds.map((id) => <>
                                {topic.id === id && 'unread'}
                            </>)}
                            </div>
                            </Accordion.Header>
                            <Accordion.Body>{topic.text}</Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))}
        </div>


    </>)
}


export default PostPage;



