import React from 'react'
import { Link } from 'react-router-dom'
import LandingPageHeader from 'views/components/header/LandingPageHeader'

function NotFound() {
  return (
    <div className='no-overflow-x'>
      <LandingPageHeader />
      <div className='not-found-text-wrapper'>
      <p className='font-75 thick-font'>
        Page not found
      </p>
      <p className='font-30 thick-font gray-text'>
        The link is either invalid or doesn’t exist
      </p>
      <Link to="/" className="font-24 thick-font">
        <u>
          Go to Homepage
        </u>
      </Link>
      </div>
    </div>
  )
}

export default NotFound