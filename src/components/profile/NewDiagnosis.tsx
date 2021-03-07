import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

interface NewDiagnosisProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NewDiagnosisForm {
  diagType: string;
  remark: string;
}

const NewDiagnosisModal: React.FC<NewDiagnosisProps> = ({
  isOpen,
  onClose,
}) => {
  const { register, handleSubmit } = useForm<NewDiagnosisForm>();

  const onSubmit = (value: NewDiagnosisForm) => {
    console.log(value);
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Dignosis</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired>
              <FormLabel htmlFor="diagType">Digonisis Type</FormLabel>
              <Input name="diagType" ref={register({ required: true })} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="remark" mt={4}>
                Remark
              </FormLabel>
              <Input name="remark" ref={register({ required: true })} />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewDiagnosisModal;
