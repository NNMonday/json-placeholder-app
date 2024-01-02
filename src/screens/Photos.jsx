import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Card, Button } from 'react-bootstrap'

export default function Photos() {
  const step = 12
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(search)
  const [start, setStart] = useState(0)
  const [photosList, setPhotosList] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [hideLoad, setHideLoad] = useState(false)
  const [noResult, setNoResult] = useState(false)
  const [selectChoice, setSelectChoice] = useState('')
  const [filterObject, setFilterObject] = useState('')

  useEffect(() => {
    setDisabled(true)
    var url = `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${step}`
    if (filter.length > 0) {
      if (filterObject === 'image-id'){
        url = url.concat(`&id=${filter}`) 
      } else {
        url = url.concat(`&albumId=${filter}`) 

      }
    }
    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.length === 0) {
          setDisabled(false)
          setNoResult(true)
          return []
        } else {
          if (res.length < step) {
            setHideLoad(true)
          }
          setPhotosList(prevPhotosList => {
            if (prevPhotosList.length > 0 && prevPhotosList[prevPhotosList.length - 1].id === res[res.length - 1].id) {
              return prevPhotosList;
            } else {
              return [...prevPhotosList, ...res];
            }
          });
        }
        setDisabled(false)
      })
      .catch(err => console.log(err))
  }, [start, filter, filterObject]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.length === 0) {
      setNoResult(true)
    } else {
      setPhotosList([])
      setNoResult(false)
      setFilterObject(selectChoice)
      setFilter(search)
    }
  }

  return (
    <>
      <Row>
        <Col xs={12}>
          <h2 className='fw-bold'>Photos</h2>
        </Col>
      </Row>
      <Row className="my-4">
        <Col xs={12}>
          <Form className='d-flex gap-2' onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId='album-id'>
              <Form.Select value={selectChoice} onChange={(e) => { setSelectChoice(e.target.value) }}>
                <option value='album-id'>Album Id</option>
                <option value='image-id'>Image Id</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId='search-input'>
              <Form.Control type='text' placeholder='Search by album id' value={search} onChange={(e) => setSearch(e.target.value.trim())} />
            </Form.Group>
            <Button variant='primary' type='submit' disabled={disabled}>
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        {
          noResult
            ? <>
              <h2 className='fw-bold'>No results</h2>
            </>
            : photosList.length > 0
              ? (
                photosList.map(p => {
                  return (
                    <Col xs={3} className='mb-4' key={p.id}>
                      <Card className='w-100'>
                        <Card.Img variant='top' src={p.url} />
                        <Card.Body>
                          <Card.Title className='text-truncate'>
                            {p.title}
                          </Card.Title>
                          <Card.Text className='mb-1'>
                            Id: #{p.id}
                          </Card.Text>
                          <Card.Text>
                            Album Id: #{p.albumId}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  )
                })
              )
              : <>
                <h2 className='fw-bold'>Loading...</h2>
              </>
        }
      </Row>
      <Row hidden={hideLoad || noResult}>
        <Col xs={12}>
          <div className="w-100 text-center">
            <Button disabled={disabled} variant='primary' onClick={() => setStart(preStart => preStart + 12)}>
              Load more
            </Button>
          </div>
        </Col>
      </Row>
    </>
  )
}
