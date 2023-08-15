import './radio.css';

type RadioPropsType ={
  id: string,
  name: string,
  title: string,
  onClick: (id: string) => void,
}

function Radio({id, name, title, onClick}:RadioPropsType) {

  const HandleOnClick = () => {
    onClick(id);
  };

  return(
    <label className={'radio__label'}>
      <input
        className={'radio__input visually-hidden'}
        type={'radio'}
        name={name}
        onClick={HandleOnClick}
      />
      <span className={'radio__text unselectable'}>{title}</span>
    </label>
  );
}
export default Radio;