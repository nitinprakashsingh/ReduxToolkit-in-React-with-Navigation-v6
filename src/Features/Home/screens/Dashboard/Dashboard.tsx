// ==========================================
// HomePage.tsx
// ==========================================
import { useState } from "react";
import {
  Building2,
  CalendarCheck,
  Home,
  ListChecks,
  Package,
  Stethoscope,
  Users,
  UserPlus,
  Pencil,
} from "lucide-react";

import HoriOmLogo from "../../../../Assets/HoriOmLogo.png";
import BookingList from "../../components/BookingList";
import DepartmentList from "../../components/DepartmentList";
import DoctorForm from "../../components/DoctorForm/DoctorForm";
import DoctorList from "../../components/DoctorList/DoctorList";
import PackageManagement, {
  PackageView,
} from "../../components/PackageManagement";
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
  SubMenuButton,
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

const doctorsData = [
  {
    id: 1,
    name: "Dr. Anil Mehta",
    speciality: "Cardiologist",
    phone: "9876543211",
    email: "anil.mehta@example.com",
    startCareerDate: "2014-06-10",
    registrationNumber: "MCI-47291",
    consultancyFees: "800",
  },
  {
    id: 2,
    name: "Dr. Neha Sharma",
    speciality: "Dermatologist",
    phone: "9123456781",
    email: "neha.sharma@example.com",
    startCareerDate: "2017-03-22",
    registrationNumber: "MCI-58326",
    consultancyFees: "650",
  },
];

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
  const [doctorView, setDoctorView] = useState<"list" | "add">("list");
  const [packageView, setPackageView] = useState<PackageView>("list");

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
      if (doctorView === "add") {
        return (
          <Card>
            <DoctorForm onDoctorList={() => setDoctorView("list")} />
          </Card>
        );
      }

      return (
        <Card>
          <DoctorList
            doctors={doctorsData}
            onAddSchedule={() => setDoctorView("add")}
          />
        </Card>
      );
    }

    // ------------------------------
    // Booking List
    // ------------------------------
    if (selectedItem.title === "Booking List") {
      return (
        <Card>
          <BookingList />
        </Card>
      );
    }

    // ------------------------------
    // Package Management
    // ------------------------------
    if (selectedItem.title === "Package Management") {
      return (
        <Card>
          <PackageManagement view={packageView} onViewChange={setPackageView} />
        </Card>
      );
    }

    // ------------------------------
    // Department List
    // ------------------------------
    if (selectedItem.title === "Department List") {
      return (
        <Card>
          <DepartmentList />
        </Card>
      );
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

                if (item.title === "Doctors Management") {
                  setDoctorView("list");
                }

                if (item.title === "Package Management") {
                  setPackageView("list");
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

            {/* Sub Menu for Doctors Management */}
            {selectedItem.title === "Doctors Management" &&
              item.title === "Doctors Management" && (
                <div
                  style={{
                    marginLeft: "40px",
                    marginTop: "8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <SubMenuButton onClick={() => setDoctorView("list")}>
                    <ListChecks size={14} />
                    Doctor List
                  </SubMenuButton>

                  <SubMenuButton onClick={() => setDoctorView("add")}>
                    <CalendarCheck size={14} />
                    Add Schedule
                  </SubMenuButton>
                </div>
              )}

            {/* Sub Menu for Package Management */}
            {selectedItem.title === "Package Management" &&
              item.title === "Package Management" && (
                <div
                  style={{
                    marginLeft: "40px",
                    marginTop: "8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <SubMenuButton onClick={() => setPackageView("list")}>
                    <ListChecks size={14} />
                    Package List
                  </SubMenuButton>

                  <SubMenuButton onClick={() => setPackageView("subscribed")}>
                    <Users size={14} />
                    Subscribed
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
