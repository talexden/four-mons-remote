import './logo.css'
import {btn} from '../../common/const';

type LogoPrefsType = {
  page: string
}

function Logo ({page}: LogoPrefsType):JSX.Element {
  const animateClass = page === btn.remote.title ? ' logo__image--animate' : ''
  return (
    <div className='logo'>
      <a className='logo__link' href="#">
        <img src='/lift-logo.svg' className={`logo__image${animateClass}`} alt="logo" />
      </a>
    </div>
  );
}

export default Logo;