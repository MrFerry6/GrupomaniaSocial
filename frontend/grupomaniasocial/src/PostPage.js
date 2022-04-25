
import { Form, Button, Accordion } from 'react-bootstrap';

import React, { useState, useEffect } from 'react';

const PostPage = () => {
    const [postTopics, setpostTopics] = useState();
    const [postBody, setPostBody] = useState([
        {
        }
    ]);
    const [postIds, setpostIds] = useState();
    const [unreadIds, setUnreadIds] = useState();
    const [readIds, setReadIds] = useState();

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

        fetch("http://localhost:3001/api/users/getPosts", requestOptions)
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
                    for (let id of postIds) {
                        if (!user.user.unreadPosts.includes(id)) {
                            user.user.unreadPosts.push(id);
                        }
                    }
                    updateUnreadPosts(session, user.user.unreadPosts);
                }
                if (user.user.unreadPosts.length > 0 && user.user.readPosts.length > 0 && postIds.length > 0) {
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
                text: postBody.text,
                image: postBody.image,
                video: postBody.video
            });
    }
    function handleTextChange(event) {
        setPostBody(
            {
                title: postBody.title,
                text: event.target.value,
                image: postBody.image,                
                video: postBody.video,
            });
    }
    function handleImageChange(event) {
        setPostBody(
            {
                title: postBody.title,
                text: postBody.text, 
                image: event.target.files[0],
                video: postBody.video
            });
    }
    function handleVideoChange(event) {
        setPostBody(
            {
                title: postBody.title,
                text: postBody.text,                
                image: postBody.image,
                video: event.target.files[0]
            });
    }
    function sendPost() {
        let url = "http://localhost:3001/api/users/postImage";
        if(!postBody.image){
            url = "http://localhost:3001/api/users/postVideo"
        }
        const session = window.sessionStorage.getItem('session')
        var formdata = new FormData();
        formdata.append("video", postBody.video);
        formdata.append("image", postBody.image);
        formdata.append("title", postBody.title);
        formdata.append("text", postBody.text);

        var requestOptions = {
            method: 'POST',
            headers: 
                {"Authorization": "Bearer " + session},
                        
            body: formdata,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    function deleteUser() {
        const session = window.sessionStorage.getItem('session')


        var requestOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + session
            },
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
                console.log('handleUpdate: ' + result)
                const unread = arrayRemove(user.user.unreadPosts, id);
                let read = user.user.readPosts;
                if (!read.includes(id)) {
                    read.push(id);
                }
                updateUnreadPosts(session, unread);
                updateReadPosts(session, read);
            })
    }
    function arrayRemove(arr, value) {

        return arr.filter(function (ele) {
            return ele != value;
        });
    }
    return (<>
        <Button onClick={unlogin}>Unlogin</Button>
        <Button onClick={deleteUser}>delete</Button>
        <Form>
            <Form.Group className="mb-3" >
                <Form.Label>title</Form.Label>
                <Form.Control type="text" placeholder="Title" onChange={handleTitleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>post</Form.Label>
                <Form.Control as="textarea" rows={5} onChange={handleTextChange} />
                <Form.Group>
                    <Form.Label>image</Form.Label>
                    <Form.Control type='file' accept="image/,.png,.jpg" onChange={handleImageChange} />                    
                    <Form.Label>video</Form.Label>
                    <Form.Control type='file' accept="video/,.avi,.gif,.mov" onChange={handleVideoChange} />
                </Form.Group>

                <Button onClick={sendPost}>Send</Button>
            </Form.Group>
        </Form>
        <div>
            {postTopics &&
                postTopics.map((topic) => (
                    <Accordion key={topic.id} defaultActiveKey="0">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header onClick={(e) => {
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



