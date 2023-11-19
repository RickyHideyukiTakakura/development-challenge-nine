import styled from "styled-components";

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    width: 2rem;
    height: 2rem;

    border-radius: 50%;

    object-fit: cover;
  }
`;
