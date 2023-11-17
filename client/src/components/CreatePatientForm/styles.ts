import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 50%;

  @media (max-width: 768px) {
    margin-top: 10rem;
  }
`;

export const Avatar = styled.div`
  position: relative;

  margin: 0 auto;

  width: 186px;
  height: 186px;

  > img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }
`;

export const AvatarInput = styled.label`
  position: absolute;

  width: 48px;
  height: 48px;

  background: #009adf;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  bottom: 7px;
  right: 7px;

  cursor: pointer;

  input {
    display: none;
  }

  svg {
    width: 20px;
    height: 20px;
    color: #ffffff;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  margin-bottom: 2rem;
`;
