import React from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

interface PatientFormInterface {
  firstname: string;
  lastname: string;
  dob_year: number;
  dob_month: number;
  dob_date: number;
  gender: 'male' | 'female';
  patientcode: number;
  gFirstname: string;
  gLastname: string;
  gNIC: number;
  gMobileno: number;
  gFiexedno: number;
  gAddress: number;
}

const AddPatientPage: React.FC = () => {
  const { handleSubmit, register } = useForm<PatientFormInterface>();
  const onSubmit = (values: PatientFormInterface) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };
  return (
    <Container maxW="4xl" bg="white" paddingY="7">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="xl">Patient details</Text>

        <Divider />

        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="40px" mt={5}>
          <FormControl isRequired>
            <FormLabel htmlFor="firstname">First Name</FormLabel>
            <Input name="firstname" ref={register({ required: true })} />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="lastname">Last Name</FormLabel>
            <Input name="lastname" ref={register()} />
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={2} spacing="40px" mt={5}>
          <Box>
            {/* dob */}
            <Box>
              <FormLabel>Date of Birth</FormLabel>

              <SimpleGrid columns={3} spacing="10px">
                <FormControl>
                  <FormLabel htmlFor="dob_date">Date</FormLabel>
                  <NumberInput name="dob_date" min={1} max={31}>
                    <NumberInputField ref={register()} />
                    <NumberIncrementStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberIncrementStepper>
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="dob_month">Month</FormLabel>
                  <NumberInput name="dob_month" min={1} max={12}>
                    <NumberInputField ref={register()} />
                    <NumberIncrementStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberIncrementStepper>
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="dob_year">Year</FormLabel>
                  <NumberInput name="dob_year" min={1980} max={2050}>
                    <NumberInputField ref={register()} />
                    <NumberIncrementStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberIncrementStepper>
                  </NumberInput>
                </FormControl>
              </SimpleGrid>
            </Box>

            {/* gender */}
            <Box marginTop="7">
              <FormControl as="fieldset" isRequired>
                <FormLabel as="legend">Gender</FormLabel>
                <RadioGroup defaultValue="male" name="gender">
                  <HStack spacing="24px">
                    <Radio name="gender" value="male" ref={register()}>
                      Male
                    </Radio>
                    <Radio name="gender" value="female" ref={register()}>
                      Female
                    </Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
          <Box>
            <FormLabel htmlFor="dob_year">Patient Image</FormLabel>
          </Box>
        </SimpleGrid>

        <Center marginTop="14">
          <Button type="submit" colorScheme="teal" marginX="3">
            Submit
          </Button>
          <Button type="reset" marginX="3">
            Reset
          </Button>
        </Center>
      </form>
    </Container>
  );
};

export default AddPatientPage;
