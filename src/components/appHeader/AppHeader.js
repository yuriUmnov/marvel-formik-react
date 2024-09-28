import {Link, NavLink} from 'react-router-dom';
import './appHeader.scss';


const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                     <li><NavLink 
                     end
                    //  activeStyle={{'color': '#9f0013'}}
                     style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})} //{isActive} сразу используем деструктуризацию для того что вытащить аргумент isActive  дальше будет фун-ия  isActive true = '#9f0013', isActive false = 'inherit
                       to="/">Characters</NavLink></li>{/*exact and activeStyle={{'color': '#9f0013'}}*/}
                    /
                    <li><NavLink 
                    // end 
                    // activeStyle={{'color': '#9f0013'}} 
                    style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})} //{isActive} сразу используем деструктуризацию для того что вытащить аргумент isActive  дальше будет фун-ия  isActive true = '#9f0013', isActive false = 'inherit
                    to="/comics">Comics</NavLink></li> {/*exact*/}
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;