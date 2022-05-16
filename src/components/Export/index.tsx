import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { ExportFileBtn } from './styles';

const Export = () => {
  return (
    <ExportFileBtn type="button">
      <FontAwesomeIcon className="icon" icon={faFileExport} />
      <span> Export </span>
    </ExportFileBtn>
  );
};

export default Export;
