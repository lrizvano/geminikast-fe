import styled from "styled-components";

const Hover = styled.section`
  .card {
    border-color: var(--dark);
    background-color: var(--dark);
    transition: border-color 500ms ease, background-color 500ms ease;
  }
  .card-body {
    color: white;
  }
  .card-title,
  .card-subtitle {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &:hover,
  &:focus-within {
    .card {
      border-color: var(--secondary);
      background-color: var(--secondary);
    }
  }
`;

export default Hover;
