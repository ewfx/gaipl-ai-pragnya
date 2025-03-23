import './Header.css'
import logo from '../img/logo.png'
import cart from '../img/cart.png'

export const Header =({}) =>{
    return(
        <div className='header'>
            <img className="cart"
                src={cart}
            />
            <img className="logo"
                src={logo}
            />
            <h3>&nbsp; | Platform Support Environment</h3>
        </div>
    )
}