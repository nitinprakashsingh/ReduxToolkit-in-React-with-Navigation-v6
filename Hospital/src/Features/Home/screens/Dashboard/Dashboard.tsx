// ==========================================
// HomePage.tsx
// ==========================================
import { useState } from "react";
import {
  Activity,
  Bed,
  Building2,
  CalendarCheck,
  Home,
  Hospital,
  ListChecks,
  Package,
  Stethoscope,
  Users,
  UserPlus,
} from "lucide-react";

import ShriyanLogo from "../../../../Assets/ShriyanLogo.png";
import BookingList from "../../components/BookingList";
import BedManagement from "../../components/BedManagement";
import CreateBooking from "../../components/CreateBooking";
import DepartmentList from "../../components/DepartmentList";
import DiseaseManagement from "../../components/DiseaseManagement";
import DoctorForm from "../../components/DoctorForm/DoctorForm";
import type { Doctor } from "../../components/DoctorForm/doctorApi";
import DoctorList from "../../components/DoctorList/DoctorList";
import HomeOverview from "../../components/HomeOverview";
import HospitalProfile from "../../components/HospitalProfile";
import PackageManagement, {
  PackageView,
} from "../../components/PackageManagement";
import PatientManagement from "../../components/PatientManagement";
import SideBarItem from "../../components/SideBarItem/SideBar";
import StaffManagement from "../../components/StaffManagement";
//reoo--
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
  SubMenuButton,
} from "../Dashboard/Dashboard.style";

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
    title: "Hospital Profile",
    icon: Hospital,
  },
  {
    id: 5,
    title: "Patient Management",
    icon: UserPlus,
  },
  {
    id: 6,
    title: "Booking List",
    icon: CalendarCheck,
  },
  {
    id: 7,
    title: "Package Management",
    icon: Package,
  },
  {
    id: 8,
    title: "Department Management",
    icon: Building2,
  },
  {
    id: 9,
    title: "Disease Management",
    icon: Activity,
  },
  {
    id: 10,
    title: "Manage Bed",
    icon: Bed,
  },
];

const HomePage = () => {
  const [selectedItem, setSelectedItem] = useState(sidebarItems[0]);
  const [staffView, setStaffView] = useState<"list" | "add">("list");
  const [doctorView, setDoctorView] = useState<"list" | "add">("list");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [packageView, setPackageView] = useState<PackageView>("list");
  const [bookingView, setBookingView] = useState<"list" | "create">("list");
  const [bedView, setBedView] = useState<"list" | "add">("list");

  // ==========================================
  // Render Content Based on Sidebar Selection
  // ==========================================
  const renderContent = () => {
    // ------------------------------
    // Staff Management
    // ------------------------------
    if (selectedItem.title === "Staff Management") {
      return (
        <Card>
          <StaffManagement view={staffView} onViewChange={setStaffView} />
        </Card>
      );
    }

    // ------------------------------
    // Home
    // ------------------------------
    if (selectedItem.title === "Home") {
      return (
        <Card>
          <HomeOverview
            onBookingClick={() => setSelectedItem(sidebarItems[5])}
            onPackageClick={() => {
              setPackageView("list");
              setSelectedItem(sidebarItems[6]);
            }}
          />
        </Card>
      );
    }

    // ------------------------------
    // Doctors Management
    // ------------------------------
    if (selectedItem.title === "Doctors Management") {
      if (doctorView === "add") {
        return (
          <Card>
            <DoctorForm
              doctor={selectedDoctor}
              onDoctorList={() => {
                setSelectedDoctor(null);
                setDoctorView("list");
              }}
            />
          </Card>
        );
      }

      return (
        <Card>
          <DoctorList
            onAddSchedule={() => {
              setSelectedDoctor(null);
              setDoctorView("add");
            }}
            onEditDoctor={(doctor) => {
              setSelectedDoctor(doctor);
              setDoctorView("add");
            }}
          />
        </Card>
      );
    }

    // ------------------------------
    // Hospital Profile
    // ------------------------------
    if (selectedItem.title === "Hospital Profile") {
      return (
        <Card>
          <HospitalProfile />
        </Card>
      );
    }

    // ------------------------------
    // Patient Management
    // ------------------------------
    if (selectedItem.title === "Patient Management") {
      return (
        <Card>
          <PatientManagement />
        </Card>
      );
    }

    // ------------------------------
    // Booking List
    // ------------------------------
    if (selectedItem.title === "Booking List") {
      if (bookingView === "create") {
        return (
          <Card>
            <CreateBooking
              onBookingCreated={() => setBookingView("list")}
              onBack={() => setBookingView("list")}
            />
          </Card>
        );
      }

      return (
        <Card>
          <BookingList onCreateClick={() => setBookingView("create")} />
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
    // Department Management
    // ------------------------------
    if (selectedItem.title === "Department Management") {
      return (
        <Card>
          <DepartmentList />
        </Card>
      );
    }

    // ------------------------------
    // Disease Management
    // ------------------------------
    if (selectedItem.title === "Disease Management") {
      return (
        <Card>
          <DiseaseManagement />
        </Card>
      );
    }

    // ------------------------------
    // Manage Bed
    // ------------------------------
    if (selectedItem.title === "Manage Bed") {
      return (
        <Card>
          <BedManagement view={bedView} onViewChange={setBedView} />
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
          <Logo src={ShriyanLogo} alt="Shriyan Technology Pvt ltd" />
          <Title>Shriyan Technology</Title>
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
                  setSelectedDoctor(null);
                  setDoctorView("list");
                }

                if (item.title === "Package Management") {
                  setPackageView("list");
                }

                if (item.title === "Manage Bed") {
                  setBedView("list");
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
                  <SubMenuButton
                    onClick={() => {
                      setSelectedDoctor(null);
                      setDoctorView("list");
                    }}
                  >
                    <ListChecks size={14} />
                    Doctor List
                  </SubMenuButton>

                  <SubMenuButton
                    onClick={() => {
                      setSelectedDoctor(null);
                      setDoctorView("add");
                    }}
                  >
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

            {/* Sub Menu for Bed Management */}
            {selectedItem.title === "Manage Bed" &&
              item.title === "Manage Bed" && (
                <div
                  style={{
                    marginLeft: "40px",
                    marginTop: "8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <SubMenuButton onClick={() => setBedView("list")}>
                    <ListChecks size={14} />
                    Bed List
                  </SubMenuButton>

                  <SubMenuButton onClick={() => setBedView("add")}>
                    <Bed size={14} />
                    Add Bed
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
