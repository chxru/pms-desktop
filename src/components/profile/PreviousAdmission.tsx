import React from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Divider,
  Table,
  Text,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PreviousAdmissionProps {}

const TableRow: React.FC = () => {
  return (
    <Tr>
      <Td>type name</Td>
      <Td>diagnosis name</Td>
    </Tr>
  );
};

// eslint-disable-next-line no-empty-pattern
const PreviousAdmission: React.FC<PreviousAdmissionProps> = ({}) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
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

        <Table size="md" variant="simple">
          <Thead>
            <Tr>
              <Th fontSize="md">Type</Th>
              <Th fontSize="md">Diagnosis</Th>
            </Tr>
          </Thead>
          <Tbody>
            <TableRow />
          </Tbody>
        </Table>

        {/* Report History */}
        <Text fontSize="lg" fontWeight="bold" mt={10}>
          Report
        </Text>

        <Divider mb={5} />

        <Table size="md" variant="simple">
          <Thead>
            <Tr>
              <Th fontSize="md">Type</Th>
              <Th fontSize="md">Diagnosis</Th>
            </Tr>
          </Thead>
          <Tbody>
            <TableRow />
          </Tbody>
        </Table>

        {/* Drugs History */}
        <Text fontSize="lg" fontWeight="bold" mt={10}>
          Drugs
        </Text>

        <Divider mb={5} />

        <Table size="md" variant="simple">
          <Thead>
            <Tr>
              <Th fontSize="md">Drug Name</Th>
              <Th fontSize="md">Dose</Th>
            </Tr>
          </Thead>
          <Tbody>
            <TableRow />
          </Tbody>
        </Table>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default PreviousAdmission;
