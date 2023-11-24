import React, { ReactNode } from "react";
import styled from "styled-components";
import { Form } from "@/components/molecules/Form/Form";

interface HomeProps {
  label?: ReactNode;
}

const defaultProps: HomeProps = {
  label: "Home Page",
};

const Home: React.FC<HomeProps> = ({ label }) => {
  return (
    <>
      <h1 className="display-5">{label}</h1>
      <Form />
    </>
  );
};

Home.defaultProps = defaultProps;

export default Home;
