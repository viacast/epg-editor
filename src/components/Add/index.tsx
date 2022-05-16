import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AddBtn } from './styles';

const Add = () => {
  return (
    <AddBtn type="button">
      <FontAwesomeIcon className="icon" icon={faPlus} />
      <span> Add </span>
    </AddBtn>
  );
};

export default Add;
