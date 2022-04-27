
import { Form, Button, Accordion, Image, Navbar, Container, Nav } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';
import NavLogo from './NavbarLogo.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { use } from 'bcrypt/promises';

const PostPage = () => {
    const [postTopics, setpostTopics] = useState();
    const [postBody, setPostBody] = useState([{}]);
    const [postIds, setpostIds] = useState();
    const [unreadIds, setUnreadIds] = useState();
    const [isImage, setIsImage] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [isUnread, setIsUnread] = useState(false)

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

                if (postIds) {
                    if (user.user.unreadPosts.length === 0 && user.user.readPosts.length === 0 && postIds.length > 0) {

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
        if (postBody.image) {
            setIsImage(true);
            setIsVideo(false);
        }
        if (!postBody.video && !postBody.image) {
            setIsImage(true);
            setIsVideo(true);
        }
    }
    function handleVideoChange(event) {
        setPostBody(
            {
                title: postBody.title,
                text: postBody.text,
                image: postBody.image,
                video: event.target.files[0]
            });
        if (postBody.video) {
            setIsImage(false);
            setIsVideo(true);
        }
        if (!postBody.video && !postBody.image) {
            setIsImage(true);
            setIsVideo(true);
        }
    }
    function sendPost() {
        let url = "http://localhost:3001/api/users/postImage";
        if (!postBody.image) {
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
                { "Authorization": "Bearer " + session },

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
            .then((result) => { })
            .catch(error => console.log('error', error));
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
            return ele !== value;
        });
    }
    return (<>
        <Navbar>
            <Container>
                <Container>
                    <Navbar.Brand href="#"  >
                        <Image src={NavLogo}
                            style={{
                                width: '85%',
                                height: '100%'
                            }} />
                    </Navbar.Brand>
                </Container>
                <Nav className="me-auto">
                    <Nav.Link onClick={unlogin}>
                        <h4 className='navbar-link'>LOGOUT</h4>
                    </Nav.Link>
                    <Nav.Link onClick={deleteUser}>
                        <h4 className='navbar-link'>DELETE</h4>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        <Container>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label style={{
                        fontSize: 'medium',
                        fontWeight: '900',
                        color: 'rgb(229, 73, 17)'
                    }}>TITLE</Form.Label>
                    <Form.Control type="text" placeholder="Title" onChange={handleTitleChange} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label style={{
                        fontSize: 'medium',
                        fontWeight: '900',
                        color: 'rgb(229, 73, 17)'
                    }} htmlFor='post-input'>POST</Form.Label>
                    <Form.Control id='post-input' as="textarea" rows={5} onChange={handleTextChange} />
                    <Form.Group>
                        <Container style={{
                            marginTop: '1rem',
                            display: 'flex',
                            flexDirection: 'column'

                        }}>
                            <Form.Label htmlFor='image-input'
                                style={{
                                    fontSize: 'medium',
                                    fontWeight: '900',
                                    color: 'rgb(229, 73, 17)'
                                }}
                            >IMAGE</Form.Label>
                            <Form.Control disabled={isImage} id='image-input' type='file' accept="image/,.png,.jpg,.gif" onChange={handleImageChange}
                                style={{
                                    fontSize: 'small',
                                    fontWeight: '700',
                                    color: 'black',
                                    backgroundColor: 'rgb(229, 190, 177)'
                                }} />
                            <Form.Label htmlFor='video-input'
                                style={{
                                    marginTop: '0.5rem',
                                    fontSize: 'medium',
                                    fontWeight: '900',
                                    color: 'rgb(229, 73, 17)'
                                }}
                            >VIDEO</Form.Label>
                            <Form.Control disabled={isVideo} id='video-input' type='file' accept="video/,.mov" onChange={handleVideoChange}
                                style={{
                                    fontSize: 'small',
                                    fontWeight: '700',
                                    color: 'black',
                                    backgroundColor: 'rgb(229, 190, 177)'
                                }} />
                        </Container>
                    </Form.Group>
                </Form.Group>
                <Container>
                    <Button onClick={sendPost}
                        style={{
                            backgroundColor: 'rgb(299, 73, 17)'
                        }}>PUBLISH POST</Button></Container>
            </Form>
        </Container>
        <Container style={{
            marginTop: '2.5rem',
            marginBottom: '5rem',
            borderTopStyle: 'double',
            borderBottomStyle: 'double',
            borderColor: 'rgb(229, 73, 17)'
        }}>
            {postTopics &&
                postTopics.map((topic) => (
                    <Container key={"container" + topic.id} style={{
                        marginTop: "0.5rem",
                        marginBottom: "0.5rem",
                    }}>
                        <Accordion key={topic.id} defaultActiveKey="0">
                            <Accordion.Item key={"item" + topic.id} eventKey="1">
                                <Accordion.Header key={"header" + topic.id}
                                    onClick={(e) => {
                                        handleUpdateRead(e, topic.id)
                                    }}><Container
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}>
                                        <h4
                                            style={{
                                                fontSize: 'medium',
                                                fontWeight: 'bold',
                                                width: '90%'
                                            }}
                                        >{topic.title}</h4>
                                        {unreadIds &&
                                            unreadIds.map((id) => <> {
                                                topic.id === id &&  <i className="bi bi-patch-exclamation" key={'icon'+topic.id}></i>
                                            }</>
                                            )}
                                    </Container>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <ReactPlayer key={"player" + topic.id} url={topic.video} controls={true}></ReactPlayer>
                                    <Image key={"image" + topic.id} src={topic.image}></Image>
                                    <div key={"text" + topic.id}>{topic.text}</div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Container>
                ))}
        </Container>


    </>)
}


export default PostPage;



