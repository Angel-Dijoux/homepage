import { Link } from "react-router-dom";
import { StarIcon } from "./icons/Star";
import styled from "@emotion/styled";
import Typography from "./ui/Typography";

const LogoBox = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;

  > svg {
    transition: 200ms ease;
  }

  &:hover > svg {
    transform: rotate(20deg);
  }
`;

const ICON_SIZE = 34;

export function Logo() {
  return (
    <Link to="/">
      <LogoBox>
        <StarIcon width={ICON_SIZE} height={ICON_SIZE} />
        <Typography variant="h4" affects="large">
          Angel Dijoux
        </Typography>
      </LogoBox>
    </Link>
  );
}
