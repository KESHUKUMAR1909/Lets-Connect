import React from 'react'
import {Link} from 'react-router-dom'
import '../App.css';
const Landing = () => {
  return (
    <div className='landingPageContainer'>
      <nav>
        <div className='navHeader'>
          <h2>Lets Connect</h2>
        </div>

        <div className='navlist'>
          <p>Join as Guest</p>
          <p>Signup</p>
          <div role='button'>
            <p>Login</p>
          </div>
        </div>
      </nav>


      <div className="landingMainContainer">
        <div>
          <h1><span style={{color:"#FF9839"}}>Connect</span> with your loved ones</h1>
          <p>Cover a distance By Lets Connect</p>
          <div role='button' style={{fontSize:"1.6rem"}}>
            <Link style={{textDecoration:"none" , color:"white"}} to={'/auth'}> Get Started</Link>
          </div>
        </div>
        <div>
          <img src='/mobile.png' alt='Mobile' />
        </div>
      </div>

    </div>
  )
}

export default Landing
