import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

export default function UserInfo() {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const [edit, setEdit] = useState(false)
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [website, setWebsite] = useState('')
    const [changed, setChanged] = useState(false)
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => res.json())
            .then(res => {
                setUser(res)
                setEmail(res.email)
                setPhone(res.phone)
                setWebsite(res.website)
            })
            .catch(err => console.log(err))
    }, [id])

    const [albums, setAlbums] = useState(null)
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
            .then(res => res.json())
            .then(res => {
                setAlbums(res)
            })
            .catch(err => console.log(err))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...user, email, phone, website })
        })
            .then(res => res.json())
            .then(res => {
                setUser(res)
                setChanged(false)
                setEdit(false)
            })
            .catch(err => console.log(err))
    }

    const [newTitle, setNewTitle] = useState('')
    const addAlbum = (e) => {
        e.preventDefault()
        fetch('https://jsonplaceholder.typicode.com/albums', {
            method: 'POST',
        })
            .then(res => res.json())
            .then((res) => {
                const newAlbum = { userId: id, ...res, title: newTitle }
                fetch('https://jsonplaceholder.typicode.com/albums', {
                    method: 'POST',
                    body: JSON.stringify(newAlbum)
                })
                    .then(res => res.json())
                    .then(() => {
                        const newAlbumList = [...albums, newAlbum]
                        setAlbums(newAlbumList);
                        setNewTitle('')
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const deleteAlbum = (i) => {
        fetch(`https://jsonplaceholder.typicode.com/albums/${i}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(() => {
                setAlbums(prevAlbums =>
                    prevAlbums.filter(album => album.id !== i)
                );
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            {user && albums && <>
                <Row className='mb-4'>
                    <Col xs={12}>
                        <Row className="mb-4">
                            <Col xs={6}>
                                <h2 className='fw-bold'>
                                    {user.name}
                                </h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <div className="d-flex flex-column gap-4">
                                    <Row>
                                        <Col xs={12}>
                                            <h4 className='text-info'>Personal</h4>
                                        </Col>
                                        <Col xs={12}>
                                            <Row>
                                                <Col lg={3} xs={4}>
                                                    <p>Id:</p>
                                                </Col>
                                                <Col lg={9} xs={8}>
                                                    <p className='fw-bold'>{user.id}</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={3} xs={4}>
                                                    <p>Username:</p>
                                                </Col>
                                                <Col lg={9} xs={8}>
                                                    <p className='fw-bold'>{user.username}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <h4 className='text-info'>Address</h4>
                                        </Col>
                                        <Col xs={12}>
                                            <Row>
                                                <Col lg={3} xs={4}>
                                                    <p>Street:</p>
                                                </Col>
                                                <Col lg={9} xs={8}>
                                                    <p className='fw-bold'>{user.address.street}</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={3} xs={4}>
                                                    <p>Suite:</p>
                                                </Col>
                                                <Col lg={9} xs={8}>
                                                    <p className='fw-bold'>{user.address.suite}</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={3} xs={4}>
                                                    <p>City:</p>
                                                </Col>
                                                <Col lg={9} xs={8}>
                                                    <p className='fw-bold'>{user.address.city}</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={3} xs={4}>
                                                    <p>Zipcode:</p>
                                                </Col>
                                                <Col lg={9} xs={8}>
                                                    <p className='fw-bold'>{user.address.zipcode}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <h4 className='text-info'>Company</h4>
                                        </Col>
                                        <Col xs={12}>
                                            <Row>
                                                <Col lg={3} xs={4}>
                                                    <p>Name:</p>
                                                </Col>
                                                <Col lg={9} xs={8}>
                                                    <p className='fw-bold'>{user.company.name}</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={3} xs={4}>
                                                    <p>CatchPhrase:</p>
                                                </Col>
                                                <Col lg={9} xs={8}>
                                                    <p className='fw-bold'>{user.company.catchPhrase}</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={3} xs={4}>
                                                    <p>Bs:</p>
                                                </Col>
                                                <Col lg={9} xs={8}>
                                                    <p className='fw-bold'>{user.company.bs}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col xs={6}>
                                <Row>
                                    <Col xs={6}>
                                        <div className="d-flex justify-content-between">
                                            <h4 className="h4 text-info">Contact:</h4>
                                        </div>
                                    </Col>
                                    {edit
                                        ? <>
                                            <Col className='mb-2' xs={12}>
                                                <Form action="" onSubmit={(e) => handleSubmit(e)}>
                                                    <Row className="mb-3">
                                                        <Col xs={12}>
                                                            <Form.Group controlId='email'>
                                                                <Form.Label>Email:</Form.Label>
                                                                <Form.Control type='email' placeholder='Email...' value={email} onChange={(e) => {
                                                                    setEmail(e.target.value);
                                                                    setChanged(true)
                                                                }} />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Col xs={12}>
                                                            <Form.Group controlId='phone'>
                                                                <Form.Label>Phone:</Form.Label>
                                                                <Form.Control type='text' placeholder='Phone...' value={phone} onChange={(e) => {
                                                                    setPhone(e.target.value);
                                                                    setChanged(true)
                                                                }} />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Col xs={12}>
                                                            <Form.Group controlId='website'>
                                                                <Form.Label>Website:</Form.Label>
                                                                <Form.Control type='text' placeholder='Website...' value={website} onChange={(e) => {
                                                                    setWebsite(e.target.value);
                                                                    setChanged(true)
                                                                }} />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={12}>
                                                            <div className="d-flex gap-3">
                                                                <Button variant='success' type='submit' disabled={!changed}>
                                                                    Submit
                                                                </Button>
                                                                <Button variant='danger' type='reset'>
                                                                    Reset
                                                                </Button>
                                                                <Button onClick={() => setEdit(false)}>
                                                                    Cancel
                                                                </Button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </>
                                        : <>
                                            <Col className='mb-2' xs={12}>
                                                <Row>
                                                    <Col lg={3} xs={4}>
                                                        <p>Email:</p>
                                                    </Col>
                                                    <Col lg={9} xs={8}>
                                                        <p className='fw-bold'>{user.email}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg={3} xs={4}>
                                                        <p>Website:</p>
                                                    </Col>
                                                    <Col lg={9} xs={8}>
                                                        <p className='fw-bold'>{user.website}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg={3} xs={4}>
                                                        <p>Phone:</p>
                                                    </Col>
                                                    <Col lg={9} xs={8}>
                                                        <p className='fw-bold'>{user.phone}</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={12}>
                                                <Button variant='success' onClick={() => setEdit(true)}>
                                                    Edit
                                                </Button>
                                            </Col>
                                        </>}
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Row className="mb-3 pt-3 border-top">
                            <Col xs={8}>
                                <h4>Photo Albums: </h4>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={6}>
                                <Form className='d-flex'>
                                    <Form.Label></Form.Label>
                                    <Form.Control type='text' placeholder='Title of new album' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                                    <Button type='submit' className='flex-shrink-0 w-25 items-center' style={{ marginLeft: '20px' }} variant='success' size='lg' onClick={(e) => addAlbum(e)}>
                                        New Album
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            {albums.map((a, id) => {
                                return (
                                    <Col key={a.id} className='mb-3' md={6}>
                                        <div className='d-flex justify-content-between border rounded text-decoration-none text-black'>
                                            <div className='py-2 flex-shrink-0 border-end d-flex justify-content-center' style={{ width: '10%' }}>{id + 1}</div>
                                            <div className='py-2 w-100 px-4 text-truncate fw-bold text-start'>{a.title}</div>
                                            <div className="text-center flex-shrink-0 py-2" style={{ width: '10%' }}>
                                                <Button variant='danger' size='sm' onClick={() => deleteAlbum(a.id)}>
                                                    X
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                </Row>
            </>}
        </>
    )
}
