import { nanoid } from 'nanoid';
import * as R from 'ramda';
import { FC } from 'react';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';

import {
  OrderDevicePurposeMap,
  OrderEntityType,
} from '../../../services/api/order';

type Props = {
  label: string;
  className?: string;
  list: ItemType[];
  setList: Function;
};

export type ItemType = OrderEntityType<'id', number> & {
  key: string;
};

const createEmptyItem = (): ItemType => ({
  id: 0,
  amount: 0,
  orderDevicePurpose: OrderDevicePurposeMap.INSTALLATION,
  key: nanoid(),
});

const OrderModalItem: FC<Props> = ({
  list,
  setList,
  label,
  className = '',
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

  return (
    <Wrapper className={className}>
      <Form.Label>{label}</Form.Label>

      {list.map(item => (
        <ItemsWrapper key={item.key}>
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Label>Id</Form.Label>
            <Form.Control
              type="text"
              value={item.id}
              placeholder="Enter id"
              onChange={(e: any) =>
                handleItemChange('id', e.currentTarget.value, item)
              }
            />
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
            onClick={() =>
              setList(
                R.filter<ItemType>(listItem => listItem.key !== item.key, list),
              )
            }
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
