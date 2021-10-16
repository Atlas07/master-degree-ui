import { FC } from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';

import { ManufacterType } from '../services/api/manufacter';

type Props = {
  className?: string;
  manufactures: ManufacterType[];
  value: ManufacterType['name'];
  onChange: (data: ManufacterType['name']) => void;
};

const Dropdown: FC<Props> = ({
  className = '',
  manufactures,
  value,
  onChange,
}) => (
  <Wrapper className={className}>
    <Form.Group className="mb-3" controlId="formBasicSelect">
      <Form.Label>Manufacturer</Form.Label>
      <Form.Select
        value={value}
        onChange={(e: any) => onChange(e.currentTarget.value)}
      >
        {manufactures.map(manufacturer => (
          <option value={manufacturer.name} key={manufacturer.id}>
            {manufacturer.name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  </Wrapper>
);

export default Dropdown;

const Wrapper = styled.div``;
