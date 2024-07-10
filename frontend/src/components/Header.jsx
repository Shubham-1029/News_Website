import '../components/css/Header.css'
import { assets } from '../assets/asset';
const Header = () => {
  return (
    <header>
      <h1 className="header-first text-center"><img className="img-fluid" src={assets.image5} alt="" /></h1>
      <h6 className='header-second text-center'>Democracy Dies in Darkness</h6>
    </header>
  );
};

export default Header;