import { ChevronDown, type LucideIcon } from "lucide-react";
import { Container, DropDownIcon, IconContainer, Title } from "./SideBar.Style";

type SideBarItemProps = {
  title: string;
  icon: LucideIcon;
   isActive: boolean;
  onClick: () => void;
};

const SideBarItem = ({ title, icon: Icon , isActive , onClick}: SideBarItemProps) => {
    return (
        <Container onClick={onClick}>
      <IconContainer>
        <Icon size={18} color="#fff" />
      </IconContainer>
            <Title>{title}</Title>
      <DropDownIcon
        style={{
          transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
        }}
      >
        <ChevronDown size={16} color="#fff" />
      </DropDownIcon>
        </Container>
  );
};

export default SideBarItem;
