import styled from "styled-components";

const CardHover = styled.section`
  .card {
    border-color: var(--dark);
    background-color: var(--dark);
    transition: border-color 500ms ease, background-color 500ms ease;
  }
  .card-title,
  .card-subtitle {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  #profile {
    border-radius: 50%;
    transition: border-radius 500ms ease;
  }

  &:hover,
  &:focus-within {
    .card {
      border-color: var(--secondary);
      background-color: var(--secondary);
    }

    #profile {
      border-radius: 0%;
    }
  }
`;

export default CardHover;
