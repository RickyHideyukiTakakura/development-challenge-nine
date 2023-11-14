import styled from "styled-components";

export const PatientList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    width: 2rem;
    height: 2rem;

    border-radius: 50%;
  }
`;
