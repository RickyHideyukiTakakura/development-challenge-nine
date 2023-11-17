import styled from "styled-components";

export const DetailsContainer = styled.main`
  height: 100%;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  img {
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
    object-fit: cover;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
