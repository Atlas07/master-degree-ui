import * as R from 'ramda';
import { FC, FormEvent, useEffect, useState } from 'react';
import { Alert, Form } from 'react-bootstrap';

import CenteredModal from '../../../molecules/CenteredModal';
import {
  createFan,
  CreateFanType,
  FanType,
  updateFan,
} from '../../../services/api/fan';
import { ErrorResponse } from '../../../services/api/guestApi';
import { initialDefaultValues, MODAL_INPUTS } from './columns';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  initialValues: FanType | null;
};

const FanModal: FC<Props> = ({ isOpen, onClose, onSubmit, initialValues }) => {
  const [values, setValues] = useState<CreateFanType>(
    initialValues ?? initialDefaultValues,
  );
  const [error, setError] = useState<string | null>(null);
  const [isValidated, setIsValidated] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setError(null);

    if (e.currentTarget.checkValidity() === false) {
      return;
    }

    setIsValidated(true);

    const request = initialValues
      ? updateFan({ id: initialValues.id, ...values })
      : createFan(values);

    request
      .then(onSubmit)
      .then(onClose)
      // TODO: ViolationError
      .catch((err: ErrorResponse) =>
        setError(err?.message ?? 'Unexpected error.'),
      );
  };

  useEffect(() => {
    setValues(initialValues ?? initialDefaultValues);
  }, [initialValues]);

  return (
    <CenteredModal
      title={`${initialValues ? 'Edit' : 'Add'} fan`}
      isOpen={isOpen}
      onSecondaryButtonClick={onClose}
      onPrimaryButtonClick={handleSubmit}
      primaryButtonText={initialValues ? 'Edit' : 'Create'}
      isPrimaryButtonDisabled={false} // TODO
      content={
        <>
          <Form noValidate validated={isValidated}>
            {MODAL_INPUTS.map(input => (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{input.Header}</Form.Label>
                <Form.Control
                  type="text"
                  // @ts-ignore
                  value={values[input.accessor]}
                  onChange={e =>
                    setValues(R.assoc(input.accessor, e.currentTarget.value))
                  }
                  required
                />
              </Form.Group>
            ))}
          </Form>
          {error && <Alert variant="danger">{error}</Alert>}
        </>
      }
    />
  );
};

export default FanModal;
