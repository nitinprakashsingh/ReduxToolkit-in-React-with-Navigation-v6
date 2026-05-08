import { ChevronDown, type LucideIcon } from "lucide-react";
import { Container, DropDownIcon, IconContainer, Title } from "./SideBar.Style";

type SideBarItemProps = {
  title: string;
  icon: LucideIcon;
};

const SideBarItem = ({ title, icon: Icon }: SideBarItemProps) => {
    return (
        <Container>
      <IconContainer>
        <Icon size={18} color="#fff" />
      </IconContainer>
            <Title>{title}</Title>
      <DropDownIcon>
        <ChevronDown size={16} color="#fff" />
      </DropDownIcon>
        </Container>
  );
};

export default SideBarItem;
