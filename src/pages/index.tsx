import React, {  } from "react";
import Footer from "@/components/atoms/Footer";
import styled from "styled-components";
import { Form } from "@/components/molecules/Form/Form";
import Header from "@/components/atoms/Header";

const StyledTitle = styled.h1`
    color: '#000';
    font-size: 24px;
    margin: 0;
`;


const Home: React.FC<{ label?: string }> = ({ label = "Home Page" }) => {
  return (
    <>
    <Header/>
      <StyledTitle>{label}</StyledTitle>
      <Form/>
      <Footer/>
    </>
  );
};

export default Home;
