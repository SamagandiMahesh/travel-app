import React from "react";
import { SearchForm } from "../components/molecules/SearchForm/SearchForm";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <h2 className="display-6 my-4">Search Form </h2>
      <SearchForm />
    </React.Fragment>
  );
};

export default Home;
