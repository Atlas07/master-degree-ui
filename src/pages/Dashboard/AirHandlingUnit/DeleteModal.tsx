import { FC, useState } from 'react';
import { Alert } from 'react-bootstrap';

import CenteredModal from '../../../molecules/CenteredModal';
import {
  AirHandlingUnitType,
  deleteAirHandlingUnit,
} from '../../../services/api/airHandlingUtit';
import { ErrorResponse } from '../../../services/api/guestApi';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  values: AirHandlingUnitType | null;
};

const DeleteModal: FC<Props> = ({ isOpen, onClose, onSubmit, values }) => {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    setError(null);

    if (!values) {
      return;
    }

    deleteAirHandlingUnit(values.id)
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
        title="Delete device"
        content={
          <>
            <p>This action will delete air handling device #{values.id}</p>
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

export default DeleteModal;
