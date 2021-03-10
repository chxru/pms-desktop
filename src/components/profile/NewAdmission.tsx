import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  SimpleGrid,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import ConsultantName from '../../data/Consultant';

interface NewAdmissionProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NewAdmissionForm {
  admission_number: string;
  admission_date: number;
  admission_month: number;
  admission_year: number;
  consultant_name: string;
  discharge_date: number;
  discharge_month: number;
  discharge_year: number;
}

const NewAdmissionModal: React.FC<NewAdmissionProps> = ({
  // eslint-disable-next-line react/prop-types
  isOpen,
  // eslint-disable-next-line react/prop-types
  onClose,
}) => {
  const { register, handleSubmit } = useForm<NewAdmissionForm>();

  const onSubmit = (value: NewAdmissionForm) => {
    console.log(value);
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Creat Bed Head Ticket</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired>
                <FormLabel htmlFor="admission_number">
                  Admision Number
                </FormLabel>
                <Input
                  name="admission_number"
                  ref={register({ required: true })}
                />
              </FormControl>

              <Box>
                <FormLabel mt={4}>Admission Date</FormLabel>

                <SimpleGrid columns={3} spacing="10px">
                  <FormControl isRequired>
                    <FormLabel htmlFor="admission_date">Date</FormLabel>
                    <NumberInput name="admission_date" min={1} max={31}>
                      <NumberInputField bg="white" ref={register()} />
                    </NumberInput>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="admission_month">Month</FormLabel>
                    <NumberInput name="admission_month" min={1} max={12}>
                      <NumberInputField ref={register()} bg="white" />
                    </NumberInput>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="admission_year">Year</FormLabel>
                    <NumberInput name="admission_year" min={1980} max={2050}>
                      <NumberInputField ref={register()} bg="white" />
                    </NumberInput>
                  </FormControl>
                </SimpleGrid>
              </Box>

              <FormControl isRequired>
                <FormLabel htmlFor="consultant_name" mt={4}>
                  Consultant Name{' '}
                </FormLabel>
                <Select
                  onChange={(value) => {
                    console.log(value);
                  }}
                  options={ConsultantName}
                  name="consultant_name"
                  isFocused
                  placeholder="Select Consultant Name"
                />
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
    </>
  );
};

export default NewAdmissionModal;
