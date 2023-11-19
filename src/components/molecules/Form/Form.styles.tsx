import styled from "styled-components";

export const StyledButton = styled.button`
  font-family: rubik, sans-serif;
  background: #005dad;
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  border-radius: 22px;
  height: 44px;
  padding-left: 22px;
  padding-right: 22px;
  border: none;

  &:hover {
    background: #5cb4ff;
  }
`;

export const StyledForm = styled.div`

    label {
        display: flex;
        margin-bottom: 5px;
    }

`;
