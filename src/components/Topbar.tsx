/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-nested-ternary */
import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  SkeletonText,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ipcRenderer } from 'electron';

// icons
import { LogOut, Search } from 'react-feather';

// context
import AuthContext from '../context/auth-context';

const Topbar: React.FC = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [activeTab, setactiveTab] = useState<string>('dashboard');

  // search function
  type SearchResultType = {
    _id: string;
    firstname: string;
    lastname: string;
  };
  const [searchState, setsearchState] = useState<
    'inactive' | 'searching' | 'no-res' | 'found'
  >('inactive');
  const [searchResult, setsearchResult] = useState<SearchResultType[]>();

  const { handleSubmit, register, reset } = useForm<{ pharse: string }>();
  const onSubmit = handleSubmit(({ pharse }) => {
    setsearchState('searching');
    setsearchResult([]);
    ipcRenderer.send('quick-search', pharse);
    ipcRenderer.once(
      'quick-search-res',
      (
        _,
        args: {
          res: SearchResultType[];
          error?: string;
        }
      ) => {
        if (args.res.length) {
          setsearchState('found');
          setsearchResult([...args.res]);
        } else {
          setsearchState('no-res');
        }
      }
    );
  });

  const SearchResultBox: React.FC = () => {
    return (
      <Flex width="100%" justifyContent="center">
        <Box
          backgroundColor="#fff"
          width="lg"
          maxHeight="xl"
          paddingX="21px"
          paddingY="14px"
          marginY="7px"
          overflowY="auto"
          shadow="sm"
        >
          {searchState === 'searching' ? (
            <Stack>
              <SkeletonText noOfLines={3} />
              <SkeletonText noOfLines={2} />
            </Stack>
          ) : searchState === 'no-res' ? (
            <Text>No result found</Text>
          ) : searchState === 'found' && searchResult?.length !== 0 ? (
            <>
              {searchResult?.map((i) => {
                return (
                  <Box key={i['_id']}>
                    <Text>
                      {i.firstname} {i.lastname}
                    </Text>
                    <Text color="gray" fontSize="sm">
                      Patient ID: {i['_id']}
                    </Text>
                  </Box>
                );
              })}
            </>
          ) : (
            <Text>Error</Text>
          )}
        </Box>
      </Flex>
    );
  };

  return (
    <Flex direction="column" position="fixed" w="100vw" zIndex="10">
      <Flex
        direction="row"
        height="54px"
        width="100%"
        boxShadow="sm"
        backgroundColor="#fff"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {/* App name */}
        <Box>
          <Text>PMS</Text>
        </Box>

        {/* Navigation */}
        <Flex as="nav" height="full">
          <Flex
            as="span"
            alignItems="center"
            paddingX="3"
            cursor="pointer"
            height="full"
            borderBottom={activeTab === 'dashboard' ? '1px' : '0px'}
            borderColor="teal"
            onClick={() => {
              history.replace('/');
              setactiveTab('dashboard');
            }}
          >
            Dashboard
          </Flex>
          <Flex
            as="span"
            alignItems="center"
            paddingX="3"
            cursor="pointer"
            height="full"
            borderBottom={activeTab === 'browse' ? '1px' : '0px'}
            borderColor="teal"
            onClick={() => {
              // history.replace('/');
              setactiveTab('browse');
            }}
          >
            Browse
          </Flex>
        </Flex>

        {/* Search input with button */}
        <Flex>
          <form onSubmit={onSubmit}>
            <InputGroup>
              <InputRightElement pointerEvents="none">
                <Box paddingRight="24px">
                  <Search size="18" />
                </Box>
              </InputRightElement>
              <Input
                name="pharse"
                ref={register()}
                placeholder="Search"
                marginX="3"
                onBlur={() => {
                  setsearchState('inactive');
                  reset();
                }}
              />
            </InputGroup>
          </form>
          <Button
            paddingX="3"
            width="200px"
            colorScheme="teal"
            onClick={() => {
              history.push('/addPatient');
              setactiveTab('addPatient');
            }}
          >
            Add Patient
          </Button>
        </Flex>

        {/* Topbar-end buttons */}
        <Flex>
          <Box as="span">
            <LogOut
              cursor="pointer"
              onClick={() => {
                auth.SignOut();
              }}
            />
          </Box>
        </Flex>
      </Flex>
      {searchState !== 'inactive' && <SearchResultBox />}
    </Flex>
  );
};

export default Topbar;
