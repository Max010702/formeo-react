import styled from "styled-components";

export interface IDividerProps {
  width?: number;
  height?: number;
  bg?: string;
}

const DividerComponent = styled.span<IDividerProps>`
  display: flex;
  min-width: ${({ width }) => (width !== undefined ? `${width}px` : "0")};
  min-height: ${({ height }) => (height !== undefined ? `${height}px` : "0")};
  background: ${({ bg }) => bg ?? "transparent"};
`;

function Divider(props: IDividerProps) {
  return <DividerComponent {...props} />;
}

export default Divider;
