// pages/index.tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@/components/molecules/Form";
import Header from "@/components/atoms/Header";
import Footer from "@/components/atoms/Footer";
import styled from "styled-components";

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
