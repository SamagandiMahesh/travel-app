import styled from "styled-components";

export const StyledAirlineDetailsSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 24px;

  .label-section {
    text-transform: uppercase;
    color: rgb(76, 76, 76);
  }

  .time-section {
    font-size: 20px;
    font-weight: 500;
    color: rgb(76, 76, 76);
    padding: 12px 0;
  }

  .location-section {
    color: rgb(144, 144, 144);
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    padding-bottom: 12px;
  }
`;