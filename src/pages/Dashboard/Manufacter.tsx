import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

import {
  fetchManufacters,
  ManufacterType,
} from '../../services/api/manufacter';

const Manufacter = () => {
  const [manufactures, setManufactures] = useState<ManufacterType[] | null>(
    null,
  );

  useEffect(() => {
    fetchManufacters().then(setManufactures);
  }, []);

  if (!manufactures) {
    return <Spinner animation="border" />;
  }

  return <div>Manufacter</div>;
};

export default Manufacter;
