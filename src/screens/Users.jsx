import React, { useEffect, useState } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Users() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(res => setUsers(res))
      .catch(err => console.log(err))
  }, [])

  const navigate = useNavigate()

  return (
    <Row>
      <Col xs={12}>
        <h2 className="fw-bold">
          Users
        </h2>
      </Col>
      <Col xs={12}>
        <Table striped hover>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>username</th>
              <th>email</th>
              <th>phone</th>
              <th>website</th>
              <th>city</th>
              <th>Company Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => {
              return (
                <tr key={u.id} onClick={() => {
                  navigate(`/users/${u.id}`)
                }}>
                  <td>
                    {u.id}
                  </td>
                  <td>
                    {u.name}
                  </td>
                  <td>
                    {u.username}
                  </td>
                  <td>
                    {u.email}
                  </td>
                  <td>
                    {u.phone}
                  </td>
                  <td>
                    {u.website}
                  </td>
                  <td>
                    {u.address.city}
                  </td>
                  <td>
                    {u.company.name}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  )
}
