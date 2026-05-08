import {
  Building2,
  CalendarCheck,
  Home,
  Package,
  Stethoscope,
  Users,
} from "lucide-react";
import HoriOmLogo from "../../../../Assets/HoriOmLogo.png";
import SideBarItem from "../../components/SideBarItem/SideBar";
import {
  Card,
  CardWrapper,
  Container,
  Content,
  Logo,
  Sidebar,
  Subtitle,
  Text,
  Title,
} from "../Dashboard/Dashboard.style";

const sidebarItems = [
  { title: "Home", icon: Home },
  { title: "User Management", icon: Users },
  { title: "Doctors Management", icon: Stethoscope },
  { title: "Booking List", icon: CalendarCheck },
  { title: "Package Management", icon: Package },
  { title: "Department List", icon: Building2 },
];


const HomePage = () => {
    
    return (
        <Container>
            <Sidebar>
                <Text>
                    <Logo src={HoriOmLogo} alt="Hari Om Seva Sansta logo" />
                    <Title>Hari Om Seva Sansta</Title>
                    <Subtitle>Profile</Subtitle>
                </Text>
                {sidebarItems.map((item) => (
                    <SideBarItem key={item.title} title={item.title} icon={item.icon} />
                ))}
            </Sidebar>
            <Content>
                <CardWrapper>
                    {sidebarItems.map((item) => <Card key={item.id}>{item.title}</Card>)}
                </CardWrapper>
            </Content>
        </Container>
    )
}
export default HomePage
