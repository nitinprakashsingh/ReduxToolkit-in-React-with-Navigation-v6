import { useMemo, useState } from "react";
import styled from "styled-components";
import { getDoctorEmail, signOut } from "../../../utils/cookies";
import { useNavigate } from "react-router-dom";
import SideDrawer from "../../SideDrawer";
import { mockAppointments } from "../AppointmentManagement/mockAppointments";

const Page = styled.div`
  min-height: 100vh;
  background: #eef2ff;
  color: #111827;
`;

const Container = styled.div`
  width: min(1180px, 100%);
  margin: 0 auto;
  padding: 28px 24px 40px;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  margin-bottom: 28px;
`;

const ProfileCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 26px;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
`;

const Avatar = styled.div`
  width: 84px;
  height: 84px;
  border-radius: 22px;
  background: #7c3aed;
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 28px;
  font-weight: 800;
`;

const ProfileInfo = styled.div`
  min-width: 240px;
`;

const ProfileName = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 800;
`;

const ProfileEmail = styled.p`
  margin: 8px 0 0;
  color: #64748b;
`;

const Button = styled.button<{ secondary?: boolean }>`
  border: none;
  border-radius: 14px;
  padding: 12px 18px;
  background: ${({ secondary }) => (secondary ? "#475569" : "#7c3aed")};
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
`;

const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.35);
  z-index: 30;
`;

const DrawerPanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: min(360px, 88vw);
  background: #ffffff;
  box-shadow: -18px 0 48px rgba(15, 23, 42, 0.16);
  padding: 28px;
  display: flex;
  flex-direction: column;
  z-index: 40;
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const DrawerTitle = styled.h3`
  margin: 0;
  font-size: 22px;
  font-weight: 800;
`;

const DrawerSection = styled.div`
  margin-top: 22px;
`;

const DrawerLabel = styled.p`
  margin: 0 0 10px;
  color: #475569;
  font-size: 14px;
  font-weight: 700;
`;

const ProfilePicBox = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 24px;
  background: #eef2ff;
  display: grid;
  place-items: center;
  color: #4338ca;
  font-size: 18px;
  font-weight: 700;
`;

const ProfileInput = styled.input`
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 14px;
  padding: 14px 16px;
  font-size: 15px;
  color: #0f172a;
  margin-bottom: 16px;
  outline: none;
`;

const StatsGrid = styled.div`
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  margin-top: 28px;
`;

const StatCard = styled.div`
  background: #ffffff;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
`;

const StatLabel = styled.p`
  margin: 0;
  color: #475569;
  font-size: 14px;
  font-weight: 700;
`;

const StatValue = styled.h3`
  margin: 12px 0 0;
  font-size: 34px;
  color: #0f172a;
`;

const Section = styled.section`
  margin-top: 34px;
`;

const Subtitle = styled.p`
  margin: 8px 0 0;
  color: #64748b;
  font-size: 15px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 18px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: 800;
`;

const ScheduleList = styled.div`
  display: grid;
  gap: 16px;
`;

const ScheduleItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding: 18px 22px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
`;

const ItemInfo = styled.div`
  min-width: 0;
`;

const ItemName = styled.p`
  margin: 0;
  font-weight: 700;
`;

const ItemMeta = styled.p`
  margin: 8px 0 0;
  color: #64748b;
  font-size: 14px;
`;

const ItemBadge = styled.span`
  background: #eef2ff;
  color: #4338ca;
  border-radius: 14px;
  padding: 10px 14px;
  font-weight: 700;
  font-size: 13px;
`;

const NotificationList = styled.div`
  display: grid;
  gap: 14px;
`;

const NotificationItem = styled.div`
  padding: 18px 22px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
`;

const NotificationTitle = styled.p`
  margin: 0;
  font-weight: 700;
`;

const NotificationTime = styled.p`
  margin: 8px 0 0;
  color: #64748b;
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [avatarLetter] = useState("D");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const doctorEmail = getDoctorEmail();

  const appointments = mockAppointments;

  const todayAppointments = useMemo(
    () => appointments.filter((item) => item.date === "2026-08-06"),
    [appointments]
  );

  const pendingReports = useMemo(
    () => appointments.filter((item) => item.status === "Pending Report"),
    [appointments]
  );

  const emergencyCases = useMemo(
    () => appointments.filter((item) => item.isEmergency),
    [appointments]
  );

  const todaySchedule = todayAppointments.slice(0, 4);
  const notifications = [
    { id: "n1", title: "New lab report available", time: "10 minutes ago" },
    { id: "n2", title: "Urgent case assigned", time: "1 hour ago" },
    { id: "n3", title: "Patient rescheduled appointment", time: "Yesterday" },
  ];

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  return (
    <Page>
      <Container>
        <Header>
          <div>
            <SectionTitle>Doctor Dashboard</SectionTitle>
            <Subtitle>Overview of today&apos;s appointments, emergency cases, and schedule.</Subtitle>
          </div>
          <Button onClick={() => navigate("/appointments")}>Manage appointments</Button>
        </Header>

        <ProfileCard>
          <Avatar>
            {profilePic ? <img src={profilePic} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 22 }} /> : avatarLetter}
          </Avatar>
          <ProfileInfo>
            <ProfileName>Dr. Priya Kapoor</ProfileName>
            <ProfileEmail>{doctorEmail}</ProfileEmail>
          </ProfileInfo>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button onClick={() => setDrawerOpen(true)}>Open doctor menu</Button>
            <Button secondary onClick={handleSignOut}>Sign out</Button>
          </div>
        </ProfileCard>

        {drawerOpen && <SideDrawer onClose={() => setDrawerOpen(false)} />}

        <StatsGrid>
          <StatCard>
            <StatLabel>Total appointments for today</StatLabel>
            <StatValue>{todayAppointments.length}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Upcoming appointments</StatLabel>
            <StatValue>{appointments.filter((item) => item.status === "Scheduled").length}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Pending reports</StatLabel>
            <StatValue>{pendingReports.length}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Emergency cases</StatLabel>
            <StatValue>{emergencyCases.length}</StatValue>
          </StatCard>
        </StatsGrid>

        <Section>
          <SectionHeader>
            <SectionTitle>Today&apos;s schedule</SectionTitle>
            <span>{todaySchedule.length} appointments</span>
          </SectionHeader>
          <ScheduleList>
            {todaySchedule.map((item) => (
              <ScheduleItem key={item.id}>
                <ItemInfo>
                  <ItemName>{item.patientName}</ItemName>
                  <ItemMeta>{item.department}</ItemMeta>
                </ItemInfo>
                <ItemBadge>{item.slot}</ItemBadge>
              </ScheduleItem>
            ))}
          </ScheduleList>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>Notifications</SectionTitle>
          </SectionHeader>
          <NotificationList>
            {notifications.map((notification) => (
              <NotificationItem key={notification.id}>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationTime>{notification.time}</NotificationTime>
              </NotificationItem>
            ))}
          </NotificationList>
        </Section>
      </Container>
    </Page>
  );
};

export default Dashboard;
