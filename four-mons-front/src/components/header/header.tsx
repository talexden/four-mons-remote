import './header.css';
import Logo from '../logo/logo';
import Button from '../button/button';
import {btn} from '../../common/const';

type HeaderPropsType = {
  onClick: (title: string)=> void;
  page: string;
  wsStatus: string
}


function Header ({onClick, page, wsStatus}: HeaderPropsType):JSX.Element {

  return (
    <header className='header'>
      <nav className='navigation header-navigation'>
          <ul className='navigation__list'>
            <li className='navigation__item'>
              <Button btn={btn.loadSetting} mod={page === btn.loadSetting.title} action={onClick}/>
            </li>
            <li className='navigation__item navigation__item--logo'>
              <Logo page={page}/>
            </li>
            <li className='navigation__item'>
              <Button btn={btn.remote} mod={page === btn.remote.title} action={onClick}/>
            </li>
          </ul>
      </nav>
      <div className='header__text-wrapper'>
        <p className='header__text unselectable'>Remote is {wsStatus}</p>
      </div>
    </header>
  )
}

export default Header;