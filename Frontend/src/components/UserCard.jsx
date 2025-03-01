import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton,Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { BiTrash } from 'react-icons/bi'
import EditModel from './EditModel'

const UserCard = ({ user,setUsers}) => {
  const toast = useToast();
  const handleDeleteUser = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/friends/"+user.id,{
        method:"DELETE",
      }) 
      if (!res.ok) {
        throw new Error(data.error)
      }
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id))
      toast({
        title: "Success",
        status: "success",
        description: "Friend deleted successfully",
        duration: 2000,
        position: "top-center"
      })
    } catch (error) {
      toast({
        title: "An error occured",
        description: error.message,
        staus: "error",
        duration: 4000,
        isClosable: true,
        position: "top-center",
      })
    }
  }
  return (
    <Card>
        <CardHeader>
            <Flex gap={4}>
            <Flex flex={"1"} gap={"4"} alignItems={"center"} >
              <Avatar src={user.imgUrl} />
              <Box>
                <Heading size='sm'>{user.name}</Heading>
                <Text>{user.role}</Text>
              </Box>
            </Flex>
            <Flex>
              <EditModel user={user} setUsers={setUsers} />
              <IconButton
                variant='ghost'
                colorScheme='red'
                size={"sm"}
                aria-label='See menu'
                icon={<BiTrash size={20} />}
                onClick={handleDeleteUser}
              />
            </Flex>
            </Flex>
        </CardHeader>
        <CardBody>
          <Text>
            {user.description}
          </Text>
        </CardBody>
    </Card>
  )
}

export default UserCard