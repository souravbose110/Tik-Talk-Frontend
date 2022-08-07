import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useNavigate } from "react-router";
import { registerRoute } from "../../utils/API/APIRoutes";
import "./authorization.css";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const [avatars, setAvatars] = useState([]);
  const [selected, setSelected] = useState(-1);

  const api = `https://api.multiavatar.com`;

  const handlePic = (img_url, index) => {
    setPic(img_url.toString());
    setSelected(index);
  };

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setPicLoading(false);
      return;
    }

    if (name.length < 3 || name.length > 20) {
      toast({
        title: "Please enter a name which is between 3 and 20 letters",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setPicLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setPicLoading(false);
      return;
    }

    if (!pic) {
      toast({
        title: "Please pick an avatar",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setPicLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        registerRoute,
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setPicLoading(false);
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      let data = [];
      setPicLoading(true);
      for (let i = 0; i < 4; ++i) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}.png`
        );
        data.push(image.config.url);
      }
      setAvatars(data);
      setPicLoading(false);
    };
    fetchImage();
  }, []);

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="signup-email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="signup-password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl
        id="profilePicture"
        isRequired
        height="125px"
        display="flex"
        flexDir="column"
      >
        <FormLabel>Please Pick An Avatar</FormLabel>
        <div className="avatar-row">
          {avatars.map((avatar, index) => (
            <img
              key={avatar}
              className="avatar"
              style={
                selected === index
                  ? {
                      border: "0.4rem solid #4e0eff",
                    }
                  : {}
              }
              src={avatar}
              alt={`IMG: ${index}`}
              onClick={(e) => handlePic(avatar, index)}
            />
          ))}
        </div>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
