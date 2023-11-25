import React, { ReactNode } from "react";
import styled from "styled-components";
import { Form } from "@/components/molecules/Form/Form";

 type HomeProps = {
  label?: ReactNode;
}

const defaultProps: HomeProps = {
  label: "Home Page",
};

const Home: React.FC<HomeProps> = ({ label }) => {
  return (
    <>
      <h2 className="display-6 my-4">{label}</h2>
      <Form />
    </>
  );
};


export default Home;
