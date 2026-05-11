import { useState } from "react";
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
    {
        id: 1,
        title: "Home",
        icon: Home,
        cards: ["Dashboard Overview", "Today's Appointments", "Recent Activity"],
    },
    {
        id: 2,
        title: "User Management",
        icon: Users,
        cards: ["Patients List", "Add Patient", "User Roles"],
    },
    {
        id: 3,
        title: "Doctors Management",
        icon: Stethoscope,
        cards: ["Doctors List", "Add Doctor", "Doctor Schedule"],
    },
    {
        id: 4,
        title: "Booking List",
        icon: CalendarCheck,
        cards: ["Upcoming Bookings", "Completed Bookings", "Cancelled Bookings"],
    },
    {
        id: 5,
        title: "Package Management",
        icon: Package,
        cards: ["All Packages", "Create Package", "Package Pricing"],
    },
    {
        id: 6,
        title: "Department List",
        icon: Building2,
        cards: ["Cardiology", "Neurology", "Orthopedics"],
    },
];


const HomePage = () => {
    const [selectedItem, setSelectedItem] = useState(sidebarItems[0]);
    return (
        <Container>
            <Sidebar>
                <Text>
                    <Logo src={HoriOmLogo} alt="Hari Om Seva Sansta logo" />
                    <Title>Hari Om Seva Sansta</Title>
                    <Subtitle>Profile</Subtitle>
                </Text>
                {sidebarItems.map((item) => (
                    <SideBarItem
                        key={item.id}
                        title={item.title}
                        icon={item.icon}
                        isActive={selectedItem.id === item.id}
                        onClick={() => setSelectedItem(item)}
                    />
                ))}
            </Sidebar>
            <Content>
                <CardWrapper>
                    {selectedItem.cards.map((cardTitle, index) => (
                        <Card key={index}>{cardTitle}</Card>
                    ))}
                </CardWrapper>
            </Content>
        </Container>
    )
}
export default HomePage
