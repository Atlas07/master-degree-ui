import * as R from 'ramda';
import { FC, FormEvent, useEffect, useState } from 'react';
import { Alert, Form, Spinner } from 'react-bootstrap';

import CenteredModal from '../../../molecules/CenteredModal';
import {
  AirConditioningDeviceType,
  createAirConditioningDevice,
  CreateAirConditioningDeviceType,
  DeviceMap,
  updateAirConditioningDevice,
} from '../../../services/api/airConditioningDevice';
import { ErrorResponse } from '../../../services/api/guestApi';
import {
  fetchManufacters,
  ManufacterType,
} from '../../../services/api/manufacter';
import { initialDefaultValues, MODAL_INPUTS } from './columns';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  initialValues: AirConditioningDeviceType | null;
};

const Modal: FC<Props> = ({ isOpen, onClose, onSubmit, initialValues }) => {
  const [manufactures, setManufactures] = useState<ManufacterType[] | null>(
    null,
  );
  const [values, setValues] = useState<CreateAirConditioningDeviceType>(
    initialValues ?? {
      ...initialDefaultValues,
      airConditioningDevice: DeviceMap.CANAL,
    },
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
      ? updateAirConditioningDevice({ id: initialValues.id, ...values })
      : createAirConditioningDevice(values);

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

  useEffect(() => {
    fetchManufacters().then(setManufactures);
  }, []);

  return (
    <CenteredModal
      title={`${initialValues ? 'Edit' : 'Add'} device`}
      isOpen={isOpen}
      onSecondaryButtonClick={onClose}
      onPrimaryButtonClick={handleSubmit}
      primaryButtonText={initialValues ? 'Edit' : 'Create'}
      isPrimaryButtonDisabled={false} // TODO
      content={
        <>
          {manufactures === null && <Spinner animation="border" />}

          {manufactures !== null && (
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

              <Form.Group className="mb-3" controlId="formBasicSelect">
                <Form.Label>Air conditioning device</Form.Label>
                <Form.Select
                  value={values.airConditioningDevice}
                  onChange={(e: any) =>
                    setValues(
                      R.assoc('airConditioningDevice', e.currentTarget.value),
                    )
                  }
                >
                  <option value={DeviceMap.CANAL}>{DeviceMap.CANAL}</option>
                  <option value={DeviceMap.SPLIT_SYSTEM}>
                    {DeviceMap.SPLIT_SYSTEM}
                  </option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicSelect">
                <Form.Label>Manufacturer</Form.Label>
                <Form.Select
                  value={values.manufacturer}
                  onChange={(e: any) =>
                    setValues(R.assoc('manufacturer', e.currentTarget.value))
                  }
                >
                  {manufactures.map(manufacturer => (
                    <option value={manufacturer.name} key={manufacturer.id}>
                      {manufacturer.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          )}

          {error && <Alert variant="danger">{error}</Alert>}
        </>
      }
    />
  );
};

export default Modal;
