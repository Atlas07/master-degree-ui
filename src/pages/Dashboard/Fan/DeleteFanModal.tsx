import { FC, useState } from 'react';
import { Alert } from 'react-bootstrap';

import CenteredModal from '../../../molecules/CenteredModal';
import { deleteFan, FanType } from '../../../services/api/fan';
import { ErrorResponse } from '../../../services/api/guestApi';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  values: FanType | null;
};

const DeleteFanModal: FC<Props> = ({ isOpen, onClose, onSubmit, values }) => {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    setError(null);

    if (!values) {
      return;
    }

    deleteFan(values.id)
      .then(onSubmit)
      .then(onClose)
      .catch((err: ErrorResponse) =>
        setError(err?.message ?? 'Unexpected error.'),
      );
  };

  if (!values) {
    return null;
  }

  return (
    <>
      <CenteredModal
        title="Delete manufacture"
        content={
          <>
            <p>This action will delete cooling rack #{values.id}</p>
            {error && <Alert variant="danger">{error}</Alert>}
          </>
        }
        isOpen={isOpen}
        onSecondaryButtonClick={onClose}
        onPrimaryButtonClick={handleDelete}
        primaryButtonText="Delete"
      />
    </>
  );
};

export default DeleteFanModal;
