import { Container } from 'react-bootstrap'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Users from './screens/Users'
import Photos from './screens/Photos'
import MyNavbar from './components/MyNavbar';
import UserInfo from './screens/UserInfo';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyNavbar />
        <Container className='py-2'>
          <Routes>
            <Route path='/' element={<Navigate to={'/users'} />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<UserInfo />} />
            <Route path='/photos' element={<Photos />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
