import styled from "styled-components";

export const LayoutContainer = styled.div`
  height: calc(100vh - 8rem);

  padding: 0 12rem;
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;

  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 10%,
    rgba(0, 212, 255, 1) 100%
  );
`;
