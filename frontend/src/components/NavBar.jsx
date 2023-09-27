import { Link } from 'react-router-dom';
export default function NavBar(){
 return (
    <nav>
        <Link to='/'>About</Link>
        <Link to='/birds'>View Birds</Link>
        <Link to='/animals'>View Animals</Link>
    </nav>
 )
}