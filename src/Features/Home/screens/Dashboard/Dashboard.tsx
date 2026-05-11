// ==========================================
// HomePage.tsx
// ==========================================
import { useState } from "react";
import {
  Building2,
  CalendarCheck,
  Home,
  Package,
  Stethoscope,
  Users,
  UserPlus,
  Pencil,
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
  EditButton,
  SectionTitle,
  StyledTable,
  TableHeadCell,
  TableDataCell,
  TableRow,
  SubMenuButton
} from "../Dashboard/Dashboard.style";

// ==========================================
// Sample Data
// ==========================================
const staffData = [
  {
    id: 1,
    name: "Rahul Kumar",
    email: "rahul@example.com",
    phone: "9876543210",
    relationship: "Manager",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@example.com",
    phone: "9123456780",
    relationship: "Receptionist",
  },
  {
    id: 3,
    name: "Amit Sharma",
    email: "amit@example.com",
    phone: "9988776655",
    relationship: "Nurse",
  },
];

// ==========================================
// Sidebar Items
// ==========================================
const sidebarItems = [
  {
    id: 1,
    title: "Home",
    icon: Home,
  },
  {
    id: 2,
    title: "Staff Management",
    icon: Users,
  },
  {
    id: 3,
    title: "Doctors Management",
    icon: Stethoscope,
  },
  {
    id: 4,
    title: "Booking List",
    icon: CalendarCheck,
  },
  {
    id: 5,
    title: "Package Management",
    icon: Package,
  },
  {
    id: 6,
    title: "Department List",
    icon: Building2,
  },
];

const HomePage = () => {
  const [selectedItem, setSelectedItem] = useState(sidebarItems[0]);
  const [staffView, setStaffView] = useState<"list" | "add">("list");

  // ==========================================
  // Render Content Based on Sidebar Selection
  // ==========================================
  const renderContent = () => {
    // ------------------------------
    // Staff Management
    // ------------------------------
    if (selectedItem.title === "Staff Management") {
      // Show Add Staff Form
      if (staffView === "add") {
        return (
          <Card>
            <h2>Add New Staff</h2>
            <p>Staff creation form will be displayed here.</p>
          </Card>
        );
      }

      // Show Staff List
  return (
  <Card>
    <SectionTitle>Staff List</SectionTitle>

    <StyledTable>
      <thead>
        <tr>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Phone No</TableHeadCell>
          <TableHeadCell>Relationship</TableHeadCell>
          <TableHeadCell>Action</TableHeadCell>
        </tr>
      </thead>

      <tbody>
        {staffData.map((staff) => (
          <TableRow key={staff.id}>
            <TableDataCell>{staff.name}</TableDataCell>
            <TableDataCell>{staff.email}</TableDataCell>
            <TableDataCell>{staff.phone}</TableDataCell>
            <TableDataCell>{staff.relationship}</TableDataCell>
            <TableDataCell>
              <EditButton onClick={() => alert(`Edit ${staff.name}`)}>
                <Pencil size={16} />
                Edit
              </EditButton>
            </TableDataCell>
          </TableRow>
        ))}
      </tbody>
    </StyledTable>
  </Card>
);
    }

    // ------------------------------
    // Home
    // ------------------------------
    if (selectedItem.title === "Home") {
      return <Card>Dashboard Home Content</Card>;
    }

    // ------------------------------
    // Doctors Management
    // ------------------------------
    if (selectedItem.title === "Doctors Management") {
      return <Card>Doctors Management Content</Card>;
    }

    // ------------------------------
    // Booking List
    // ------------------------------
    if (selectedItem.title === "Booking List") {
      return <Card>Booking List Content</Card>;
    }

    // ------------------------------
    // Package Management
    // ------------------------------
    if (selectedItem.title === "Package Management") {
      return <Card>Package Management Content</Card>;
    }

    // ------------------------------
    // Department List
    // ------------------------------
    if (selectedItem.title === "Department List") {
      return <Card>Department List Content</Card>;
    }

    return <Card>No Content Available</Card>;
  };

  return (
    <Container>
      {/* ==========================================
          Sidebar
      ========================================== */}
      <Sidebar>
        <Text>
          <Logo src={HoriOmLogo} alt="Hari Om Seva Sansta logo" />
          <Title>Hari Om Seva Sansta</Title>
          <Subtitle>Profile</Subtitle>
        </Text>

        {sidebarItems.map((item) => (
          <div key={item.id}>
            {/* Main Sidebar Item */}
            <SideBarItem
              title={item.title}
              icon={item.icon}
              isActive={selectedItem.id === item.id}
              onClick={() => {
                setSelectedItem(item);

                // Reset default view for Staff Management
                if (item.title === "Staff Management") {
                  setStaffView("list");
                }
              }}
            />

            {/* Sub Menu for Staff Management */}
            {selectedItem.title === "Staff Management" &&
              item.title === "Staff Management" && (
                <div
                  style={{
                    marginLeft: "40px",
                    marginTop: "8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <SubMenuButton
                    onClick={() => setStaffView("list")}
                  >
                    <Users size={14} />
                    Staff List
                  </SubMenuButton>

                  <SubMenuButton
                    onClick={() => setStaffView("add")}
                  >
                    <UserPlus size={14} />
                    Add New Staff
                  </SubMenuButton>
                </div>
              )}
          </div>
        ))}
      </Sidebar>

      <Content>
        <CardWrapper>{renderContent()}</CardWrapper>
      </Content>
    </Container>
  );
};

export default HomePage;
