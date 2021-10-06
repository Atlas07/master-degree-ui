import { FC, FormEvent, useEffect, useState } from 'react';
import { Alert, Form } from 'react-bootstrap';

import CenteredModal from '../../../molecules/CenteredModal';
import { ErrorResponse } from '../../../services/api/guestApi';
import {
  OrderStatusMap,
  OrderStatusType,
  OrderType,
  processOrder,
} from '../../../services/api/order';

type ChangeFormEvent = FormEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  values: OrderType;
};

const availableAfterPlanned = [
  OrderStatusMap.IN_PROGRESS,
  OrderStatusMap.CANCELLED,
  OrderStatusMap.SUSPENDED,
  OrderStatusMap.WAITING_FOR_ACTION,
];
const availableAfterSuspend = [
  OrderStatusMap.IN_PROGRESS,
  OrderStatusMap.CANCELLED,
  OrderStatusMap.WAITING_FOR_ACTION,
];
const availableAfterWaitingForAction = [
  OrderStatusMap.IN_PROGRESS,
  OrderStatusMap.CANCELLED,
  OrderStatusMap.SUSPENDED,
];
const availableAfterInProgress = [
  OrderStatusMap.SUSPENDED,
  OrderStatusMap.CANCELLED,
  OrderStatusMap.WAITING_FOR_ACTION,
  OrderStatusMap.COMPLETED,
];

const availableAfterCanceled: string[] = [];

const StatusMap = {
  [OrderStatusMap.PLANNED]: availableAfterPlanned,
  [OrderStatusMap.SUSPENDED]: availableAfterSuspend,
  [OrderStatusMap.WAITING_FOR_ACTION]: availableAfterWaitingForAction,
  [OrderStatusMap.IN_PROGRESS]: availableAfterInProgress,
  [OrderStatusMap.CANCELLED]: availableAfterCanceled,
};

const ProcessModal: FC<Props> = ({ isOpen, onClose, onSubmit, values }) => {
  const [status, setStatus] = useState(values?.status);
  const [actionComment, setActionComment] = useState('');
  const [waitingActionUsername, setWaitingActionUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleProcess = () => {
    setError(null);

    if (!values) {
      return;
    }

    processOrder({
      orderId: values.orderId,
      statusTo: status,
      actionComment,
      waitingActionUsername,
    })
      .then(onSubmit)
      .then(onClose)
      .catch((err: ErrorResponse) =>
        setError(err?.message ?? 'Unexpected error.'),
      );
  };

  useEffect(() => {
    setStatus(values?.status);
  }, [values?.status]);

  if (!values || !status) {
    return null;
  }

  return (
    <>
      <CenteredModal
        title="Process order"
        content={
          <>
            <p>This action will process order #{values.orderId}</p>

            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>New status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={String(status)}
                onChange={(e: any) => {
                  console.log(e.currentTarget.value);
                  return setStatus(e.currentTarget.value as OrderStatusType);
                }}
              >
                <option value={String(status)}>{status}</option>
                {/* @ts-ignore */}
                {StatusMap[values?.status].map(statusItem => (
                  <option key={statusItem} value={statusItem}>
                    {statusItem}
                  </option>
                ))}

                {/* <option value={OrderStatusMap.EMPTY}>
                  {OrderStatusMap.EMPTY}
                </option>
                <option value={OrderStatusMap.PLANNED}>
                  {OrderStatusMap.PLANNED}
                </option>
                <option value={OrderStatusMap.CANCELLED}>
                  {OrderStatusMap.CANCELLED}
                </option>
                <option value={OrderStatusMap.IN_PROGRESS}>
                  {OrderStatusMap.IN_PROGRESS}
                </option>
                <option value={OrderStatusMap.SUSPENDED}>
                  {OrderStatusMap.SUSPENDED}
                </option>
                <option value={OrderStatusMap.WAITING_FOR_ACTION}>
                  {OrderStatusMap.WAITING_FOR_ACTION}
                </option> */}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicInput">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter comment"
                value={actionComment}
                onChange={(e: ChangeFormEvent) =>
                  setActionComment(e.currentTarget.value)
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicInput">
              <Form.Label>Waiting user to act</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter waiting user to act"
                value={waitingActionUsername}
                onChange={(e: ChangeFormEvent) =>
                  setWaitingActionUsername(e.currentTarget.value)
                }
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
          </>
        }
        isOpen={isOpen}
        onSecondaryButtonClick={onClose}
        onPrimaryButtonClick={handleProcess}
        primaryButtonText="Process"
      />
    </>
  );
};

export default ProcessModal;
