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
  ghouse: string;
  gstreet: string;
  gcity: string;
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
        <Text fontSize="xl" fontWeight="bold">
          Patient details
        </Text>

        <Divider />

        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="40px" mt={5}>
          <FormControl isRequired>
            <FormLabel htmlFor="firstname">First Name</FormLabel>
            <Input
              name="firstname"
              bg="white"
              type="string"
              placeholder="Kasun"
              ref={register({ required: true })}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="lastname">Last Name</FormLabel>
            <Input
              name="lastname"
              bg="white"
              type="string"
              placeholder="Perera"
              ref={register({ required: true })}
            />
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
                    <NumberInputField bg="white" ref={register()} />
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="dob_month">Month</FormLabel>
                  <NumberInput name="dob_month" min={1} max={12}>
                    <NumberInputField ref={register()} bg="white" />
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="dob_year">Year</FormLabel>
                  <NumberInput name="dob_year" min={1980} max={2050}>
                    <NumberInputField ref={register()} bg="white" />
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
                    <Radio
                      name="gender"
                      value="male"
                      ref={register()}
                      borderColor="#63707e"
                    >
                      Male
                    </Radio>
                    <Radio
                      name="gender"
                      value="female"
                      ref={register()}
                      borderColor="#63707e"
                    >
                      Female
                    </Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            </Box>
            <Box marginTop="7">
              <FormControl isRequired>
                <FormLabel htmlFor="patientcode"> Patient code</FormLabel>
                <Input
                  name="patientcode"
                  ref={register({ required: true })}
                  bg="white"
                />
              </FormControl>
            </Box>
          </Box>
          <Box>
            <FormLabel htmlFor="dob_year">Patient Image</FormLabel>
          </Box>
        </SimpleGrid>

        <Text fontSize="xl" fontWeight="bold" paddingTop="12">
          {' '}
          Parent/Gurardian Details{' '}
        </Text>
        <Divider />

        {/* Guardian Name */}
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="40px" mt={5}>
          <FormControl isRequired>
            <FormLabel htmlFor="gFirstname">First Name</FormLabel>
            <Input
              name="gFirstname"
              ref={register({ required: true })}
              bg="white"
              type="string"
              placeholder="Thamara"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="gLastname">Last Name</FormLabel>
            <Input
              name="gLastname"
              ref={register({ required: true })}
              type="string"
              bg="white"
              placeholder="Perera"
            />
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="40px" mt={5}>
          <FormControl>
            {' '}
            {/* Guardian NIC */}
            <FormLabel htmlFor="gNIC"> NIC </FormLabel>
            <Input
              name="gNIC"
              type="number"
              ref={register({ required: true })}
              bg="white"
              placeholder="123456789V"
            />
          </FormControl>
        </SimpleGrid>
        <Text fontSize="xl" paddingTop="10" paddingLeft="10">
          Contact Details
        </Text>

        {/* Contact Number */}
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="40px" mt={3}>
          <FormControl isRequired>
            <FormLabel htmlFor="gMobileno">Mobile Number</FormLabel>
            <Input
              name="gMobileno"
              type="number"
              ref={register()}
              bg="white"
              placeholder="07********"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="gFixedno">Fixed Number</FormLabel>
            <Input
              name="gFixedno"
              type="number"
              ref={register({ min: 0 })}
              bg="white"
              placeholder="091*******"
            />
          </FormControl>
        </SimpleGrid>

        {/* Address */}
        <Text paddingTop="8" fontSize="md" fontWeight="bold">
          Address
        </Text>
        <SimpleGrid columns={2} spacing="40px" mt={3}>
          <FormControl isRequired>
            <FormLabel htmlFor="ghouse"> House Number </FormLabel>
            <Input
              name="ghouse"
              ref={register({ required: true })}
              bg="white"
              placeholder="No.123"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="gstreet"> Street Address </FormLabel>
            <Input
              name="gstreet"
              ref={register({ required: true })}
              bg="white"
              placeholder="Saman Rd,"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="gcity"> City </FormLabel>
            <Input
              name="gcity"
              ref={register({ required: true })}
              bg="white"
              placeholder="Galle"
            />
          </FormControl>
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
