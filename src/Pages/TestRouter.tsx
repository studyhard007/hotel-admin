import React from 'react';
// import {render} from 'react-dom'
import { Link } from 'react-router-dom'

// import About from './About';
// import Home from './Home';
// import Inbox from './Inbox'

class AppTest extends React.Component {
    render() {
     return (
         <div>
             <h1>TestRouter</h1>
             <ul>
                 <li><Link to='/about'>About</Link></li>
                 <li><Link to='/inbox'>Inbox</Link></li>
             </ul>
             {this.props.children}
         </div>
     )
    }
}
export default AppTest