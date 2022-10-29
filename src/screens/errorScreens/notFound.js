import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

/// Widgets ///
import MessageAlert from '../../components/widgets/MessageAlert/MessageAlert'
import LoadingSpinner from '../../components/widgets/LoadingSpinner/LoadingSpinner'

function NotFound() {
  return (
    <div className='notFound'>
      <h1>Something went wrong!</h1>
      <h2>We couldn't find this page.</h2>
      <p>Here are some useful links:</p>
      <Link to='/'>Home</Link>
      <Link to='/stockdiscovery/'>Stock Discovery</Link>
      <Link to='/register'>Registration</Link>
    </div>
  )

}
export default NotFound
