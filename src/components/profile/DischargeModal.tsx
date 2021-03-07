import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormLabel,
  SimpleGrid,
  FormControl,
  NumberInput,
  NumberInputField,
  ModalFooter,
  Button,
  Box,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

interface DischargeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DischargeForm {
  discharge_date: number;
  discharge_month: number;
  discharge_year: number;
}

const DischargeModal: React.FC<DischargeModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit } = useForm<DischargeForm>();

  const onSubmit = (value: DischargeForm) => {
    console.log(value);
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Discharge the Patient</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <FormLabel mt={4}>Discharge Date</FormLabel>

              <SimpleGrid columns={3} spacing="10px">
                <FormControl isRequired>
                  <FormLabel htmlFor="discharge_date">Date</FormLabel>
                  <NumberInput name="discharge_date" min={1} max={31}>
                    <NumberInputField bg="white" ref={register()} />
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="discharge_month">Month</FormLabel>
                  <NumberInput name="discharge_month" min={1} max={12}>
                    <NumberInputField ref={register()} bg="white" />
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="discharge_year">Year</FormLabel>
                  <NumberInput name="discharge_year" min={1980} max={2050}>
                    <NumberInputField ref={register()} bg="white" />
                  </NumberInput>
                </FormControl>
              </SimpleGrid>
            </Box>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" onClick={onClose} size="sm">
            Discharge
          </Button>

          <Button onClick={onClose} mx={2} size="sm">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DischargeModal;
