import { useActions } from '../hooks/use-actions';

import './add-cell.css';

interface AddCellProps {
  previousCellID: string | null;
  forceVisible?: boolean;
}

export const AddCell: React.FC<AddCellProps> = ({
  previousCellID,
  forceVisible,
}) => {
  const { insertCellAfter } = useActions();
  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellID, 'code')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellID, 'text')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>

      <div className="divider"></div>
    </div>
  );
};
