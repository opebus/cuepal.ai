import { Avatar, Flex, Text } from '@chakra-ui/react';

const Navbar: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      padding='1rem'
      bg='gray.100'
      color='black'
      width='full'
    >
      <Text fontSize='3xl' fontWeight='bold'>
        CuePal
      </Text>
      <Flex align='center'>
        <Text
          mr='4'
          fontSize={24}
        >{`Hello, ${name}!`}</Text>
        <Avatar name={name} />
      </Flex>
    </Flex>
  );
};

export default Navbar;
