import React from "react";
import { SearchResults } from '../components/organisms/SearchResults/SearchResults';

const Results: React.FC = () => {
  return (
    <React.Fragment>
      <h2 className="display-6 my-4">Search Results</h2>
      <SearchResults />
    </React.Fragment>
  );
};

export default Results;
