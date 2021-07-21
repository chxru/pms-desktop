/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Divider,
  Flex,
  SimpleGrid,
  Square,
  Image,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  useDisclosure,
  Accordion,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { ipcRenderer } from 'electron';

import { PatientInterface } from '../database/schemes/patient_scheme';

import NewAdmissionModal from '../components/profile/NewAdmission';
import BedTicket from '../components/profile/BedTicket';
import PreviousAdmission from '../components/profile/PreviousAdmission';

interface PatientDataRes extends PatientInterface {
  _attachments: { [name: string]: { content_type: string; data: string } };
}

const ProfileView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setpatient] = useState<PatientDataRes>();

  const {
    isOpen: admissionIsOpen,
    onOpen: admissionOnOpen,
    onClose: admissionOnClose,
  } = useDisclosure();

  useEffect(() => {
    ipcRenderer.send('get-patient-by-id', id);
    ipcRenderer.once(
      'get-patient-by-id-res',
      (_, args: { res: PatientDataRes | false; error?: string }) => {
        if (args.res) {
          setpatient(args.res);
        }
      }
    );
  }, [id]);

  return (
    <Container maxW="4xl" bg="white" paddingY="7">
      {/* patient data */}
      <Flex wrap="wrap">
        {/* title */}
        <Square bg="gray.100" size="250px">
          {patient?._attachments &&
          patient?._attachments.patient.data !== '' ? (
            <Image
              width="100%"
              objectFit="contain"
              src={'data:image/jpeg;base64,'.concat(
                patient?._attachments.patient.data
              )}
            />
          ) : (
            <Text>Profile image</Text>
          )}
        </Square>

        {/* details */}
        <Box flex="1">
          {/* patient name */}
          <Text fontSize="xl" fontWeight="bold" paddingLeft="7">
            {patient?.firstname} {patient?.lastname}
          </Text>

          <SimpleGrid columns={{ sm: 1, md: 2 }} pt={5}>
            {/* left side */}
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

            {/* right side */}
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

      <Tabs isFitted isLazy variant="enclosed" mt={10}>
        <TabList fontWeight="bold">
          <Tab>Current Admision</Tab>
          <Tab>History</Tab>
        </TabList>

        {/* Current admission tab */}
        <TabPanels>
          <TabPanel>
            {patient?.current_bedticket ? (
              <BedTicket />
            ) : (
              <>
                <Flex
                  width="full"
                  justifyContent="center"
                  alignContent="center"
                >
                  <Button
                    onClick={() => {
                      admissionOnOpen();
                    }}
                  >
                    Add Addmision Details
                  </Button>
                </Flex>
                <NewAdmissionModal
                  isOpen={admissionIsOpen}
                  onClose={admissionOnClose}
                />
              </>
            )}
          </TabPanel>

          {/* History of the patient tab */}
          <TabPanel>
            <Accordion allowToggle allowMultiple>
              {!patient?.previous_bedtickets ||
              patient?.previous_bedtickets.length === 0 ? (
                <Text>No previous bed ticket records</Text>
              ) : (
                patient?.previous_bedtickets.map((bd) => (
                  <PreviousAdmission key={bd} />
                ))
              )}
            </Accordion>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default ProfileView;
