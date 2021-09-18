import { FC, FormEvent, useEffect, useState } from 'react';
import { Alert, Form } from 'react-bootstrap';

import CenteredModal from '../../../molecules/CenteredModal';
import { ErrorResponse } from '../../../services/api/guestApi';
import {
  createManufacter,
  ManufacterType,
  updateManufacter,
} from '../../../services/api/manufacter';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  initialValues: ManufacterType | null;
};

const ManufacterModal: FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
}) => {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [error, setError] = useState<string | null>(null);
  const [isValidated, setIsValidated] = useState(false);

  const handleNameChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setName(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setError(null);

    if (e.currentTarget.checkValidity() === false) {
      return;
    }

    setIsValidated(true);

    const request = initialValues
      ? updateManufacter({ id: initialValues?.id, name })
      : createManufacter(name);

    request
      .then(onSubmit)
      .then(onClose)
      .catch((err: ErrorResponse) =>
        setError(err?.message ?? 'Unexpected error.'),
      );
  };

  useEffect(() => {
    setName(initialValues?.name ?? '');
  }, [initialValues]);

  return (
    <CenteredModal
      title={`${initialValues?.name ? 'Edit' : 'Add'} manufacter`}
      isOpen={isOpen}
      onSecondaryButtonClick={onClose}
      onPrimaryButtonClick={handleSubmit}
      primaryButtonText={initialValues?.name ? 'Edit' : 'Create'}
      isPrimaryButtonDisabled={name.length === 0}
      content={
        <>
          <Form noValidate validated={isValidated}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={handleNameChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Created by</Form.Label>
              <Form.Control
                disabled
                type="text"
                placeholder="Created by"
                value="catalogAdmin"
              />
            </Form.Group>
          </Form>
          {error && <Alert variant="danger">{error}</Alert>}
        </>
      }
    />
  );
};

export default ManufacterModal;
