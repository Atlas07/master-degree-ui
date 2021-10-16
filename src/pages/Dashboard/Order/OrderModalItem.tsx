import { nanoid } from 'nanoid';
import * as R from 'ramda';
import { FC } from 'react';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';

import { AirConditioningDeviceType } from '../../../services/api/airConditioningDevice';
import { AirHandlingUnitType } from '../../../services/api/airHandlingUtit';
import { CoolingRackType } from '../../../services/api/coolingRack';
import { FanType } from '../../../services/api/fan';
import { MiningFarmType } from '../../../services/api/miningFarm';
import {
  OrderDevicePurposeMap,
  OrderEntityType,
} from '../../../services/api/order';

type Props = {
  label: string;
  className?: string;
  list: ItemType[];
  setList: Function;
  // TODO: refactor
  options:
    | MiningFarmType[]
    | CoolingRackType[]
    | AirConditioningDeviceType[]
    | AirHandlingUnitType[]
    | FanType[];
};

export type ItemType = OrderEntityType<'id', number> & {
  key: string;
  isSaved?: boolean;
};

const createEmptyItem = (): ItemType => ({
  id: 1,
  amount: 0,
  orderDevicePurpose: OrderDevicePurposeMap.INSTALLATION,
  key: nanoid(),
  toDeleteFromOrder: false,
  isSaved: false,
});

const OrderModalItem: FC<Props> = ({
  list,
  setList,
  label,
  className = '',
  options,
}) => {
  const handleItemChange = (
    key: 'id' | 'amount' | 'orderDevicePurpose',
    newValue: OrderDevicePurposeMap,
    itemToChange: ItemType,
  ) => {
    // TODO: refactor
    // const updateDevicePurpose = R.when(
    //   R.equals(R.prop('key')),
    //   R.assoc('devicePurpose', newValue, itemToChange),
    // );
    // @ts-ignore
    // setList(R.map(updateDevicePurpose));

    setList(
      R.map(
        item =>
          // @ts-ignore
          item.key === itemToChange.key
            ? R.assoc(key, newValue, itemToChange)
            : item,
        list,
      ),
    );
  };

  const handleDeleteItem = (item: ItemType) => {
    item.isSaved
      ? setList(
          R.map(
            listItem =>
              listItem.key === item.key
                ? R.assoc('toDeleteFromOrder', true, listItem)
                : listItem,
            list,
          ),
        )
      : setList(
          R.filter<ItemType>(listItem => listItem.key !== item.key, list),
        );
  };

  return (
    <Wrapper className={className}>
      <Form.Label>{label}</Form.Label>

      {list
        .filter(item => item.toDeleteFromOrder !== true)
        .map(item => (
          <ItemsWrapper key={item.key}>
            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Name</Form.Label>
              <Form.Select
                value={item.id}
                onChange={(e: any) =>
                  handleItemChange('id', e.currentTarget.value, item)
                }
              >
                {options.map(option => (
                  <option value={option.id} key={option.id}>
                    {option.model}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                value={item.amount}
                placeholder="Enter quantity"
                onChange={(e: any) =>
                  handleItemChange('amount', e.currentTarget.value, item)
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Device purpose</Form.Label>
              <Form.Select
                value={String(item.orderDevicePurpose)}
                onChange={(e: any) =>
                  handleItemChange(
                    'orderDevicePurpose',
                    e.currentTarget.value,
                    item,
                  )
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

            <ButtonDelete
              variant="outline-danger"
              onClick={() => handleDeleteItem(item)}
            >
              Delete
            </ButtonDelete>
          </ItemsWrapper>
        ))}

      <Button
        variant="outline-success"
        onClick={() => setList(R.append(createEmptyItem(), list))}
      >
        Add new
      </Button>
    </Wrapper>
  );
};

export default OrderModalItem;

const Wrapper = styled.div`
  padding: 15px;
  border: 1px solid #000;
  border-radius: 6px;
`;

const ItemsWrapper = styled.div`
  display: flex;
`;

const ButtonDelete = styled(Button)`
  margin-top: 32px;
  height: 38px;
`;
