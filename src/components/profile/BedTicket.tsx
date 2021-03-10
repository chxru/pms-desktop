/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  Flex,
  Table,
  Tbody,
  Text,
  Td,
  Th,
  Tr,
  Thead,
  useDisclosure,
} from '@chakra-ui/react';
import NewDiagnosisModal from './NewDiagnosis';
import NewReortModal from './NewReport';
import DischargeModal from './DischargeModal';

const RemoveDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const cancelRef = useRef(null);

  return (
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
            Are you sure? You can not undo this action afterwards.
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
  );
};

const TableRow: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Tr>
      <Td>type name</Td>
      <Td>diagnosis name</Td>
      <Td isNumeric>
        {/* Remove Button with alert */}
        <Button colorScheme="red" onClick={onOpen} size="sm">
          Remove
        </Button>
      </Td>
      <RemoveDialog isOpen={isOpen} onClose={onClose} />
    </Tr>
  );
};

const BedTicket: React.FC = () => {
  const {
    isOpen: diagIsOpen,
    onOpen: diagOnOpen,
    onClose: diagOnClose,
  } = useDisclosure();

  const {
    isOpen: reportIsOpen,
    onOpen: reportOnOpen,
    onClose: reportOnClose,
  } = useDisclosure();

  const {
    isOpen: dischargeIsopen,
    onOpen: dischargeOnopen,
    onClose: dischargeOnclose,
  } = useDisclosure();

  return (
    <>
      {/* Diagnosis Table */}
      <Box>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          paddingTop="7px"
        >
          <Text fontSize="lg" fontWeight="bold">
            Diagnosis
          </Text>

          <Button onClick={diagOnOpen} size="sm" marginY="3">
            Add New Dignosis
          </Button>
        </Flex>

        <Divider mb={5} />

        {/* Diagnosis data table */}
        <Table size="md">
          <Thead>
            <Tr>
              <Th fontSize="md">Type</Th>
              <Th fontSize="md">Diagnosis</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            <TableRow />
          </Tbody>
        </Table>
      </Box>

      {/* Reports */}
      <Box>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          paddingTop="7px"
        >
          <Text fontSize="lg" fontWeight="bold">
            Reports
          </Text>

          <Button onClick={reportOnOpen} size="sm" marginY="3">
            Add New Report
          </Button>
        </Flex>

        <Divider mb={5} />

        {/* Reports data table */}
        <Table size="md">
          <Thead>
            <Tr>
              <Th fontSize="md">Type</Th>
              <Th fontSize="md">Remarks</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            <TableRow />
          </Tbody>
        </Table>
      </Box>

      {/* Drugs */}
      <Box>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          paddingTop="7px"
        >
          <Text fontSize="lg" fontWeight="bold">
            Drugs
          </Text>

          <Button onClick={diagOnOpen} size="sm" marginY="3">
            Add New Drug Report
          </Button>
        </Flex>

        <Divider mb={5} />

        {/* Reports data table */}
        <Table size="md">
          <Thead>
            <Tr>
              <Th fontSize="md">Name</Th>
              <Th fontSize="md">Dose</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            <TableRow />
          </Tbody>
        </Table>
      </Box>

      {/* Discharge button */}
      <Flex width="full" justifyContent="center" alignContent="center" mt={10}>
        <Button
          onClick={dischargeOnopen}
          borderColor="red.500"
          variant="outline"
        >
          Discharge the Patient
        </Button>
      </Flex>

      {/* new diagnosis form modal */}
      <NewDiagnosisModal isOpen={diagIsOpen} onClose={diagOnClose} />
      <NewReortModal isOpen={reportIsOpen} onClose={reportOnClose} />
      <DischargeModal isOpen={dischargeIsopen} onClose={dischargeOnclose} />
    </>
  );
};

export default BedTicket;
