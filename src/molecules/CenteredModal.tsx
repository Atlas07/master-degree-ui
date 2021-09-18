import { FC, ReactNode } from 'react';
import { Button, Modal } from 'react-bootstrap';

type Props = {
  title: string;
  content: ReactNode;
  isOpen: boolean;
  className?: string;
  onPrimaryButtonClick?: (...args: any) => void;
  onSecondaryButtonClick?: (...args: any) => void;
  isPrimaryButtonDisabled?: boolean;
  isSecondaryButtonDisabled?: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
};

const CenteredModal: FC<Props> = ({
  title,
  content,
  isOpen,
  onPrimaryButtonClick = () => {},
  onSecondaryButtonClick = () => {},
  isPrimaryButtonDisabled = false,
  isSecondaryButtonDisabled = false,
  primaryButtonText = 'Submit',
  secondaryButtonText = 'Close',
  className = '',
}) => (
  <Modal
    className={className}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    show={isOpen}
  >
    <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{content}</Modal.Body>
    <Modal.Footer>
      <Button
        onClick={onSecondaryButtonClick}
        disabled={isSecondaryButtonDisabled}
      >
        {secondaryButtonText}
      </Button>
      <Button onClick={onPrimaryButtonClick} disabled={isPrimaryButtonDisabled}>
        {primaryButtonText}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default CenteredModal;
