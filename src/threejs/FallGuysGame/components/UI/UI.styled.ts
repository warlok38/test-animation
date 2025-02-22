import styled from "styled-components";

export const Main = styled.main<{ $isLobby: boolean }>`
  display: grid;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  place-content: center;
  pointer-events: none;
  background-color: ${({ $isLobby }) =>
    $isLobby ? "rgba(0, 0, 0, 0.5)" : "transparent"};

  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 1000ms;
`;

export const H2 = styled.h2`
  position: absolute;
  top: 2rem;
  right: 1rem;
  font-size: 3rem;
  line-height: 1;
  font-weight: 900;
  color: #ffffff;
`;

export const Img = styled.img`
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 7rem;
`;

export const ButtonSound = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  pointer-events: auto;

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

export const ButtonStart = styled.button`
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 900;
  color: #ffffff;
  background-color: #f59e0b;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  pointer-events: auto;
  cursor: pointer;
  filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04))
    drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1));

  :hover {
    opacity: 0.8;
  }
`;

export const PlayersListWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 1rem;
  top: 7rem;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    top: 1rem;
    left: 50%;
    flex-direction: row;
  }
`;

export const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PlayerImg = styled.img<{ $isDead: boolean }>`
  border-radius: 100%;
  width: 3rem;
  height: 3rem;
  filter: ${({ $isDead }) => ($isDead ? "grayscale(1)" : "none")};
`;

export const PlayerName = styled.p`
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
