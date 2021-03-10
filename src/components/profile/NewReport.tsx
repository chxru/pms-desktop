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

interface NewReportProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NewReportForm {
  diagType: string;
  remark: string;
}

const NewReportModal: React.FC<NewReportProps> = ({
  // eslint-disable-next-line react/prop-types
  isOpen,
  // eslint-disable-next-line react/prop-types
  onClose,
}) => {
  const { register, handleSubmit } = useForm<NewReportForm>();
  const onSubmit = (value: NewReportForm) => {
    console.log(value);
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Report</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired>
              <FormLabel htmlFor="report type">Report Type</FormLabel>
              <Input name="report type" ref={register({ required: true })} />
            </FormControl>

            <FormControl isRequired mt={6}>
              <FormLabel htmlFor="report">Report</FormLabel>
              <Input
                type="file"
                name="report"
                ref={register({ required: true })}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="remark" mt={4}>
                Remark
              </FormLabel>
              <Input name="remark" ref={register({ required: true })} />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" colorScheme="blue" mr={3}>
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewReportModal;
