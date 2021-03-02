import React, { useEffect } from 'react';
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
import { ipcRenderer } from 'electron';

interface PatientFormInterface {
  firstname: string;
  lastname: string;
  dob_year: number;
  dob_month: number;
  dob_date: number;
  gender: 'male' | 'female';
  gurardian_firstname: string;
  gurardian_lastname: string;
  gurardian_nic: string;
  gurardian_mobile: number;
  gurardian_fixed: number;
  gurardian_addr_house: string;
  gurardian_addr_street: string;
  gurardian_addr_city: string;
}

const AddPatientPage: React.FC = () => {
  const { handleSubmit, register } = useForm<PatientFormInterface>();
  const onSubmit = (values: PatientFormInterface) => {
    ipcRenderer.send('new-patient-add', values);
  };

  useEffect(() => {
    ipcRenderer.on(
      'new-patient-add-res',
      (_, args: { res: string | boolean; error?: string }) => {
        // add patient is success
        if (args.res) {
          // eslint-disable-next-line no-console
          console.log(args.res);
        } else {
          // eslint-disable-next-line no-console
          console.log(args);
        }
      }
    );
    return () => {
      ipcRenderer.removeListener('register-new-user-res', () => {});
    };
  }, []);

  return (
    <Container maxW="4xl" bg="white" paddingY="7">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="xl" fontWeight="bold">
          Patient details
        </Text>

        <Divider />

        {/* Name */}
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="40px" mt={5}>
          <FormControl isRequired>
            <FormLabel htmlFor="firstname">First Name</FormLabel>
            <Input
              name="firstname"
              bg="white"
              type="string"
              ref={register({ required: true })}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="lastname">Last Name</FormLabel>
            <Input
              name="lastname"
              bg="white"
              type="string"
              ref={register({ required: true })}
            />
          </FormControl>
        </SimpleGrid>

        {/* date of birth */}
        <SimpleGrid columns={2} spacing="40px" mt={5}>
          <Box>
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
                      ref={register({ required: true })}
                    >
                      Male
                    </Radio>
                    <Radio
                      name="gender"
                      value="female"
                      ref={register({ required: true })}
                    >
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

        <Text fontSize="xl" fontWeight="bold" paddingTop="12">
          Parent/Gurardian Details
        </Text>
        <Divider />

        {/* Guardian Name */}
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="40px" mt={5}>
          <FormControl isRequired>
            <FormLabel htmlFor="gurardian_firstname">First Name</FormLabel>
            <Input
              name="gurardian_firstname"
              ref={register({ required: true })}
              bg="white"
              type="string"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="gurardian_lastname">Last Name</FormLabel>
            <Input
              name="gurardian_lastname"
              ref={register({ required: true })}
              type="string"
              bg="white"
            />
          </FormControl>
        </SimpleGrid>

        {/* Guardian NIC */}
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="40px" mt={5}>
          <FormControl isRequired>
            <FormLabel htmlFor="gurardian_nic">NIC</FormLabel>
            <Input
              name="gurardian_nic"
              type="string"
              ref={register({ required: true })}
              bg="white"
              placeholder="123456789V"
            />
          </FormControl>
        </SimpleGrid>

        <Text fontSize="xl" fontWeight="bold" paddingTop="12">
          Contact Details
        </Text>
        <Divider />

        {/* Contact Number */}
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="40px" mt={3}>
          <FormControl>
            <FormLabel htmlFor="gurardian_mobile">Mobile Number</FormLabel>
            <Input
              name="gurardian_mobile"
              type="number"
              ref={register()}
              bg="white"
              placeholder="07********"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="gurardian_fixed">Fixed Number</FormLabel>
            <Input
              name="gurardian_fixed"
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
            <FormLabel htmlFor="gurardian_addr_house">House Number</FormLabel>
            <Input
              name="gurardian_addr_house"
              ref={register({ required: true })}
              bg="white"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="gurardian_addr_street">
              Street Address
            </FormLabel>
            <Input
              name="gurardian_addr_street"
              ref={register({ required: true })}
              bg="white"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="gurardian_city">City</FormLabel>
            <Input
              name="gurardian_city"
              ref={register({ required: true })}
              bg="white"
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
