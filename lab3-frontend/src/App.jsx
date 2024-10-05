import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import BookingForm from './components/BookingCreate'
import EmailCheck from './components/CustomerEmailCheck2'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<EmailCheck />} />
          <Route path='/booking' element={<BookingForm />} />
          <Route />
        </Routes>
      </Router>
    </>
  )
}

export default App
