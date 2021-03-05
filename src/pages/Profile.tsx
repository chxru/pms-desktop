import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Divider,
  Flex,
  SimpleGrid,
  Square,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import { PatientInterface } from '../database/schemes/patient_scheme';

interface Bedticketform {
  admission_number: string;
  admission_date: number;
  admission_month: number;
  admission_year: number;
  consultant_name: string;
  discharge_date: number;
  discharge_month: number;
  discharge_year: number;
}

const ProfileView: React.FC = () => {
  const { handleSubmit, register } = useForm<Bedticketform>();
  const {
    isOpen: admissionIsopen,
    onOpen: admissionOnopen,
    onClose: admissionOnclose,
  } = useDisclosure();
  const {
    isOpen: dignosisIsopen,
    onOpen: dignosisOnopen,
    onClose: dignosisOnclose,
  } = useDisclosure();

  const {
    isOpen: reportIsopen,
    onOpen: reportOnopen,
    onClose: reportOnclose,
  } = useDisclosure();

  const {
    isOpen: drugIsopen,
    onOpen: drugOnopen,
    onClose: drugOnclose,
  } = useDisclosure();

  const {
    isOpen: dischargeIsopen,
    onOpen: dischargeOnopen,
    onClose: dischargeOnclose,
  } = useDisclosure();

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  const { id } = useParams<{ id: string }>();
  const [patient, setpatient] = useState<PatientInterface>();

  const onSubmit = (values: Bedticketform) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  useEffect(() => {
    ipcRenderer.send('get-patient-by-id', id);
    ipcRenderer.once(
      'get-patient-by-id-res',
      (_, args: { res: PatientInterface | false; error?: string }) => {
        if (args.res) {
          setpatient(args.res);
        }
      }
    );
  }, [id]);

  return (
    <Container maxW="4xl" bg="white" paddingY="7">
      <Flex wrap="wrap">
        <Square bg="blue.500" size="256px">
          <Text>Profile picture</Text>
        </Square>
        <Box flex="1">
          <Text fontSize="xl" fontWeight="bold" paddingLeft="7">
            {patient?.firstname.join(' ')} {patient?.lastname.join(' ')}
          </Text>
          <SimpleGrid columns={{ sm: 1, md: 2 }} pt={5}>
            <Box paddingX={7}>
              <Text fontWeight="bold">Patient Details</Text>
              <Divider />
              <Text>{patient?.gender}</Text>
              <Text>
                {patient?.dob_year} / {patient?.dob_month} / {patient?.dob_date}
              </Text>
              <Text>
                {patient?.dob_year
                  ? new Date().getFullYear() - patient?.dob_year
                  : '-'}{' '}
                years old
              </Text>
            </Box>
            <Box paddingX={7}>
              <Text fontWeight="bold">Parent/Gurardian Details</Text>
              <Divider />
              <Text>
                {patient?.gurardian_firstname} {patient?.gurardian_lastname}
              </Text>
              <Text>{patient?.gurardian_nic}</Text>
              <Text>{patient?.gurardian_mobile}</Text>
              <Text>{patient?.gurardian_fixed}</Text>
              <Text>
                {patient?.gurardian_addr_house},{' '}
                {patient?.gurardian_addr_street}, {patient?.gurardian_addr_city}
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>

      <Tabs isFitted variant="enclosed" mt={10}>
        <TabList fontWeight="bold">
          <Tab>Current Addmision</Tab>
          <Tab>History</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex width="full" justifyContent="center" alignContent="center">
              <Button onClick={admissionOnopen}>Add Addmision Details</Button>
            </Flex>

            <Modal
              closeOnOverlayClick={false}
              isOpen={admissionIsopen}
              onClose={admissionOnclose}
            >
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
                          <NumberInput
                            name="admission_year"
                            min={1980}
                            max={2050}
                          >
                            <NumberInputField ref={register()} bg="white" />
                          </NumberInput>
                        </FormControl>
                      </SimpleGrid>
                    </Box>

                    <FormControl isRequired>
                      <FormLabel htmlFor="consultant_name" mt={4}>
                        Consultant Name
                      </FormLabel>
                      <Input
                        name="consultant_name"
                        ref={register({ required: true })}
                      />
                    </FormControl>
                  </form>
                </ModalBody>

                <ModalFooter>
                  <Button type="submit" colorScheme="blue" mr={3}>
                    Save
                  </Button>
                  <Button onClick={admissionOnclose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* Diagnosis Table */}
            <Text fontSize="lg" fontWeight="bold" mt={10}>
              Diagnosis
            </Text>
            <Divider mb={5} />

            {/* Add new dignosis modal */}
            <Flex justify="flex-end">
              <Button onClick={dignosisOnopen} size="sm">
                Add New Dignosis
              </Button>
            </Flex>
            <Modal
              closeOnOverlayClick={false}
              isOpen={dignosisIsopen}
              onClose={dignosisOnclose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add New Dignosis</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isRequired>
                      <FormLabel htmlFor="">Digonisis Type</FormLabel>
                      <Input name="" ref={register({ required: true })} />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel htmlFor="" mt={4}>
                        Diagnosis
                      </FormLabel>
                      <Input name="" ref={register({ required: true })} />
                    </FormControl>
                  </form>
                </ModalBody>

                <ModalFooter>
                  <Button type="submit" colorScheme="blue" mr={3}>
                    Save
                  </Button>
                  <Button onClick={dignosisOnclose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Table size="md">
              <Thead>
                <Tr>
                  <Th fontSize="md">Type</Th>
                  <Th fontSize="md">Diagnosis</Th>
                  <Th />
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>aaaaa</Td>
                  <Td>bbbbbbbbbbbb</Td>
                  <Td isNumeric>
                    {/* Remove Button with alert */}
                    <Button
                      colorScheme="red"
                      onClick={() => setIsOpen(true)}
                      size="sm"
                    >
                      Remove
                    </Button>
                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="sm" fontWeight="bold">
                            Remove Dignosis
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure? You can not undo this action
                            afterwards.
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onClose} ml={3}>
                              Remove
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </Td>
                </Tr>
                <Tr>
                  <Td>ccccccc</Td>
                  <Td>ddddddddd</Td>
                  <Td isNumeric>
                    <Button
                      colorScheme="red"
                      onClick={() => setIsOpen(true)}
                      size="sm"
                    >
                      Remove
                    </Button>

                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Remove Dignosis
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure? You can not undo this action
                            afterwards.
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onClose} ml={3}>
                              Remove
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </Td>
                </Tr>
                <Tr>
                  <Td>eeeeeeee</Td>
                  <Td>fffffffff</Td>
                  <Td isNumeric>
                    <Button
                      colorScheme="red"
                      onClick={() => setIsOpen(true)}
                      size="sm"
                    >
                      Remove
                    </Button>

                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Remove Dignosis
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure? You can not undo this action
                            afterwards.
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onClose} ml={3}>
                              Remove
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </Td>
                </Tr>
              </Tbody>
            </Table>

            {/* Report Table */}
            <Text fontSize="lg" fontWeight="bold" mt={10}>
              Patient Reports
            </Text>
            <Divider size="100px" mb={5} />

            {/* Add new report modale */}
            <Flex width="full" justify="flex-end">
              <Button onClick={reportOnopen} size="sm">
                Add New Report
              </Button>
            </Flex>
            <Modal
              closeOnOverlayClick={false}
              isOpen={reportIsopen}
              onClose={reportOnclose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add New Dignosis</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isRequired>
                      <FormLabel htmlFor="">Report Name</FormLabel>
                      <Input name="" ref={register({ required: true })} />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel htmlFor="" mt={4}>
                        Report Image
                      </FormLabel>
                      <Input
                        name=""
                        type="file"
                        ref={register({ required: true })}
                      />
                    </FormControl>
                  </form>
                </ModalBody>

                <ModalFooter>
                  <Button type="submit" colorScheme="blue" mr={3}>
                    Save
                  </Button>
                  <Button onClick={reportOnclose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* Report Dispaly table */}
            <Table size="md">
              <Thead>
                <Tr>
                  <Th fontSize="md">Report Name</Th>
                  <Th fontSize="md">Report</Th>
                  <Th />
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>aaaaa</Td>
                  <Td>bbbbbbbbbbbb</Td>
                  <Td isNumeric>
                    <Button
                      colorScheme="red"
                      onClick={() => setIsOpen(true)}
                      size="sm"
                    >
                      Remove
                    </Button>

                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Remove Report
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure? You can not undo this action
                            afterwards.
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onClose} ml={3}>
                              Remove
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </Td>
                </Tr>
                <Tr>
                  <Td>ccccccc</Td>
                  <Td>ddddddddd</Td>
                  <Td isNumeric>
                    <Button
                      colorScheme="red"
                      onClick={() => setIsOpen(true)}
                      size="sm"
                    >
                      Remove
                    </Button>

                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Remove Report
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure? You can not undo this action
                            afterwards.
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onClose} ml={3}>
                              Remove
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </Td>
                </Tr>
                <Tr>
                  <Td>ccccccc</Td>
                  <Td>ddddddddd</Td>
                  <Td isNumeric>
                    <Button
                      colorScheme="red"
                      onClick={() => setIsOpen(true)}
                      size="sm"
                    >
                      Remove
                    </Button>

                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Remove Report
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure? You can not undo this action
                            afterwards.
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onClose} ml={3}>
                              Remove
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </Td>
                </Tr>
              </Tbody>
            </Table>

            {/* Drugs Table */}
            <Text fontSize="lg" fontWeight="bold" mt={10}>
              Drugs Details
            </Text>
            <Divider size="100px" mb={5} />

            {/* Add new drugs modale */}
            <Flex width="full" justify="flex-end">
              <Button onClick={drugOnopen} size="sm">
                Add New Drug
              </Button>
            </Flex>
            <Modal
              closeOnOverlayClick={false}
              isOpen={drugIsopen}
              onClose={drugOnclose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add New Drug</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isRequired>
                      <FormLabel htmlFor="">Drug Name</FormLabel>
                      <Input name="" ref={register({ required: true })} />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel htmlFor="" mt={4}>
                        Drug Dose
                      </FormLabel>
                      <Input name="" ref={register({ required: true })} />
                    </FormControl>
                  </form>
                </ModalBody>

                <ModalFooter>
                  <Button type="submit" colorScheme="blue" mr={3}>
                    Save
                  </Button>
                  <Button onClick={drugOnclose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* Drug Dispaly table */}
            <Table size="md">
              <Thead>
                <Tr>
                  <Th fontSize="md">Drug Name</Th>
                  <Th fontSize="md">Dose</Th>
                  <Th />
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Fexofenadine</Td>
                  <Td>180mg bd 1/52</Td>
                  <Td isNumeric>
                    <Button
                      colorScheme="red"
                      onClick={() => setIsOpen(true)}
                      size="sm"
                    >
                      Remove
                    </Button>

                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Discharge
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure? You can not undo this action
                            afterwards.
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onClose} ml={3}>
                              Remove
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </Td>
                </Tr>
                <Tr>
                  <Td>ccccccc</Td>
                  <Td>ddddddddd</Td>
                  <Td isNumeric>
                    <Button
                      colorScheme="red"
                      onClick={() => setIsOpen(true)}
                      size="sm"
                    >
                      Remove
                    </Button>

                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Remove Report
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure? You can not undo this action
                            afterwards.
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onClose} ml={3}>
                              Remove
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </Td>
                </Tr>
                <Tr>
                  <Td>eeeeeeee</Td>
                  <Td>fffffffff</Td>
                  <Td isNumeric>
                    <Button
                      colorScheme="red"
                      onClick={() => setIsOpen(true)}
                      size="sm"
                    >
                      Remove
                    </Button>

                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Remove Report
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure? You can not undo this action
                            afterwards.
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onClose} ml={3}>
                              Remove
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </Td>
                </Tr>
              </Tbody>
            </Table>

            {/* Discharg the patient */}
            <Flex
              width="full"
              justifyContent="center"
              alignContent="center"
              mt={10}
            >
              <Button onClick={dischargeOnopen} bg="red.500">
                Discharge the Patient
              </Button>
            </Flex>
            <Modal
              closeOnOverlayClick={false}
              isOpen={dischargeIsopen}
              onClose={dischargeOnclose}
            >
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
                          <NumberInput
                            name="discharge_year"
                            min={1980}
                            max={2050}
                          >
                            <NumberInputField ref={register()} bg="white" />
                          </NumberInput>
                        </FormControl>
                      </SimpleGrid>
                    </Box>
                  </form>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="red"
                    onClick={() => setIsOpen(true)}
                    size="sm"
                  >
                    Discharge
                  </Button>

                  <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Discharge Patient
                        </AlertDialogHeader>

                        <AlertDialogBody>
                          Are you sure? You can not undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onClose} px={5}>
                            Cancel
                          </Button>
                          <Button colorScheme="red" onClick={onClose} size="sm">
                            Discharge
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                  <Button onClick={dischargeOnclose} mx={2} size="sm">
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </TabPanel>

          {/* History of the patient */}
          <TabPanel>
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton bg="blue.100">
                    <Box flex="1" textAlign="left">
                      1/12/2021 - 31/12/2021
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>

                <AccordionPanel pb={4}>
                  {/* Dignosis History */}
                  <Text fontSize="lg" fontWeight="bold" mt={10}>
                    Diagnosis
                  </Text>
                  <Divider mb={5} />
                  <Table size="md">
                    <Thead>
                      <Tr>
                        <Th fontSize="md">Type</Th>
                        <Th fontSize="md">Diagnosis</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>aaaaa</Td>
                        <Td>bbbbbbbbbbbb</Td>
                      </Tr>
                      <Tr>
                        <Td>ccccccc</Td>
                        <Td>ddddddddd</Td>
                      </Tr>
                      <Tr>
                        <Td>eeeeeeee</Td>
                        <Td>fffffffff</Td>
                      </Tr>
                    </Tbody>
                  </Table>

                  {/* Report History */}
                  <Text fontSize="lg" fontWeight="bold" mt={10}>
                    Report
                  </Text>
                  <Divider mb={5} />
                  <Table size="md">
                    <Thead>
                      <Tr>
                        <Th fontSize="md">Type</Th>
                        <Th fontSize="md">Diagnosis</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>aaaaa</Td>
                        <Td>bbbbbbbbbbbb</Td>
                      </Tr>
                      <Tr>
                        <Td>ccccccc</Td>
                        <Td>ddddddddd</Td>
                      </Tr>
                      <Tr>
                        <Td>eeeeeeee</Td>
                        <Td>fffffffff</Td>
                      </Tr>
                    </Tbody>
                  </Table>

                  {/* Drugs History */}
                  <Text fontSize="lg" fontWeight="bold" mt={10}>
                    Drugs
                  </Text>
                  <Divider mb={5} />
                  <Table size="md">
                    <Thead>
                      <Tr>
                        <Th fontSize="md">Drug Name</Th>
                        <Th fontSize="md">Dose</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>Fexofenadine</Td>
                        <Td>180mg bd 1/52</Td>
                      </Tr>
                      <Tr>
                        <Td>ccccccc</Td>
                        <Td>ddddddddd</Td>
                      </Tr>
                      <Tr>
                        <Td>eeeeeeee</Td>
                        <Td>fffffffff</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton bg="blue.100">
                    <Box flex="1" textAlign="left">
                      Section 2 title
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default ProfileView;
