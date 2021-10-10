import { nanoid } from 'nanoid';
import * as R from 'ramda';
import { FC, FormEvent, useEffect, useState } from 'react';
import { Alert, Form } from 'react-bootstrap';

import CenteredModal from '../../../molecules/CenteredModal';
import { ErrorResponse } from '../../../services/api/guestApi';
import {
  createOrder,
  CreateOrderType,
  OrderDevicePurposeMap,
  OrderEntityType,
  OrderType,
  updateOrder,
} from '../../../services/api/order';
import { initialOrderDefaultValues } from './columns';
import OrderModalItem, { ItemType } from './OrderModalItem';

const pickUpdateProps = R.pick([
  'orderMiningFarms',
  'orderMiningCoolingRacks',
  'orderAirConditioningDevices',
  'orderAirHandlingUnits',
  'orderFanDs',
]);

const mapInitialValuesToState = (values: OrderType): ModalOrderType => ({
  ...values,
  orderMiningFarms: values.orderMiningFarms.map(item => ({
    amount: item.amount,
    orderDevicePurpose: item.orderDevicePurpose,
    id: item.miningFarm.id,
    key: nanoid(),
    toDeleteFromOrder: false,
  })),
  orderMiningCoolingRacks: values.orderMiningCoolingRacks.map(item => ({
    amount: item.amount,
    orderDevicePurpose: item.orderDevicePurpose,
    id: item.miningCooling.id,
    key: nanoid(),
    toDeleteFromOrder: false,
  })),
  orderAirConditioningDevices: values.orderAirConditioningDevices.map(item => ({
    amount: item.amount,
    orderDevicePurpose: item.orderDevicePurpose,
    id: item.airConditioningDevice.id,
    key: nanoid(),
    toDeleteFromOrder: false,
  })),
  orderAirHandlingUnits: values.orderAirHandlingUnits.map(item => ({
    amount: item.amount,
    orderDevicePurpose: item.orderDevicePurpose,
    id: item.airHandlingUnit.id,
    key: nanoid(),
    toDeleteFromOrder: false,
  })),
  orderFanDs: values.orderFanDs.map(item => ({
    amount: item.amount,
    orderDevicePurpose: item.orderDevicePurpose,
    id: item.fan.id,
    key: nanoid(),
    toDeleteFromOrder: false,
  })),
});

const mapToOrderCreateItem = (
  idName:
    | 'miningFarmId'
    | 'miningCoolingRackId'
    | 'airConditioningDeviceId'
    | 'airHandlingUnitId'
    | 'fanId',
  data: ItemType,
): OrderEntityType<
  | 'miningFarmId'
  | 'miningCoolingRackId'
  | 'airConditioningDeviceId'
  | 'airHandlingUnitId'
  | 'fanId',
  number
  // @ts-ignore
> => ({
  [idName]: +data.id,
  amount: +data.amount,
  orderDevicePurpose: data.orderDevicePurpose,
  toDeleteFromOrder: data.toDeleteFromOrder,
});

const mapStateToOrderCreateRequest = (
  values: ModalOrderType,
): CreateOrderType => ({
  ...values,
  orderMiningFarms: values.orderMiningFarms.map(item =>
    mapToOrderCreateItem('miningFarmId', item),
  ),
  orderMiningCoolingRacks: values.orderMiningCoolingRacks.map(item =>
    mapToOrderCreateItem('miningCoolingRackId', item),
  ),
  orderAirConditioningDevices: values.orderAirConditioningDevices.map(item =>
    mapToOrderCreateItem('airConditioningDeviceId', item),
  ),
  orderAirHandlingUnits: values.orderAirHandlingUnits.map(item =>
    mapToOrderCreateItem('airHandlingUnitId', item),
  ),
  orderFanDs: values.orderFanDs.map(item =>
    mapToOrderCreateItem('fanId', item),
  ),
});

export type ModalOrderType = Pick<
  OrderType,
  'status' | 'orderType' | 'waitingActionUsername'
> & {
  actionComment?: string;
  orderMiningFarms: ItemType[];
  orderMiningCoolingRacks: ItemType[];
  orderAirConditioningDevices: ItemType[];
  orderAirHandlingUnits: ItemType[];
  orderFanDs: ItemType[];
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  initialValues: OrderType | null;
};

const OrderModal: FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
}) => {
  const [values, setValues] = useState<ModalOrderType>(
    initialValues
      ? mapInitialValuesToState(initialValues)
      : initialOrderDefaultValues,
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

    console.log({
      initialValues,
      values: pickUpdateProps(mapStateToOrderCreateRequest(values)),
    });

    const request = initialValues
      ? updateOrder({
          orderId: initialValues.orderId,
          // @ts-ignore
          ...R.pipe(
            mapStateToOrderCreateRequest,
            // @ts-ignore
            pickUpdateProps,
            // @ts-ignore
          )(values),

          // ...pickUpdateProps(mapStateToOrderCreateRequest(values)),
        })
      : createOrder(mapStateToOrderCreateRequest(values));

    request
      .then(onSubmit)
      .then(onClose)
      // TODO: ViolationError
      .catch((err: ErrorResponse) =>
        setError(err?.message ?? 'Unexpected error.'),
      );
  };

  useEffect(() => {
    setValues(
      initialValues
        ? mapInitialValuesToState(initialValues)
        : initialOrderDefaultValues,
    );
  }, [initialValues]);

  return (
    <CenteredModal
      title={`${initialValues ? 'Edit' : 'Add'} order`}
      isOpen={isOpen}
      onSecondaryButtonClick={onClose}
      onPrimaryButtonClick={handleSubmit}
      primaryButtonText={initialValues ? 'Edit' : 'Create'}
      isPrimaryButtonDisabled={false} // TODO
      content={
        <>
          <Form.Group className="mb-3" controlId="formBasicSelect">
            <Form.Label>Order type</Form.Label>
            <Form.Select
              disabled={!!initialValues}
              value={String(values.orderType)}
              onChange={(e: any) =>
                setValues(R.assoc('orderType', e.currentTarget.value))
              }
            >
              <option value={OrderDevicePurposeMap.INSTALLATION}>
                {OrderDevicePurposeMap.INSTALLATION}
              </option>
              <option value={OrderDevicePurposeMap.MAINTENANCE}>
                {OrderDevicePurposeMap.MAINTENANCE}
              </option>
              <option value={OrderDevicePurposeMap.PURCHASE}>
                {OrderDevicePurposeMap.PURCHASE}
              </option>
              <option value={OrderDevicePurposeMap.RECONFIGURATION}>
                {OrderDevicePurposeMap.RECONFIGURATION}
              </option>
              <option value={OrderDevicePurposeMap.REPLACING}>
                {OrderDevicePurposeMap.REPLACING}
              </option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicInput">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              disabled={!!initialValues}
              type="text"
              placeholder="Enter comment"
              value={values.actionComment}
              onChange={(e: any) =>
                setValues(R.assoc('actionComment', e.currentTarget.value))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicInput">
            <Form.Label>Assign to</Form.Label>
            <Form.Control
              disabled={!!initialValues}
              type="text"
              placeholder="Enter waiting user to act"
              value={values.waitingActionUsername}
              onChange={(e: any) =>
                setValues(
                  R.assoc('waitingActionUsername', e.currentTarget.value),
                )
              }
            />
          </Form.Group>

          <OrderModalItem
            className="mb-3"
            label="Mining cooling racks"
            list={values.orderMiningCoolingRacks}
            setList={(newList: ItemType[]) =>
              setValues(R.assoc('orderMiningCoolingRacks', newList))
            }
          />

          <OrderModalItem
            className="mb-3"
            label="Mining farms"
            list={values.orderMiningFarms}
            setList={(newList: ItemType[]) =>
              setValues(R.assoc('orderMiningFarms', newList))
            }
          />

          <OrderModalItem
            className="mb-3"
            label="Air conditioning devices"
            list={values.orderAirConditioningDevices}
            setList={(newList: ItemType[]) =>
              setValues(R.assoc('orderAirConditioningDevices', newList))
            }
          />

          <OrderModalItem
            className="mb-3"
            label="Air handling units"
            list={values.orderAirHandlingUnits}
            setList={(newList: ItemType[]) =>
              setValues(R.assoc('orderAirHandlingUnits', newList))
            }
          />

          <OrderModalItem
            className="mb-3"
            label="Fan ds"
            list={values.orderFanDs}
            setList={(newList: ItemType[]) =>
              setValues(R.assoc('orderFanDs', newList))
            }
          />

          {error && <Alert variant="danger">{error}</Alert>}
        </>
      }
    />
  );
};

export default OrderModal;
