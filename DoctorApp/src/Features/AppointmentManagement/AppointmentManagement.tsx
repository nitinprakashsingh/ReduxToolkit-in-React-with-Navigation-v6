import { useMemo, useState } from "react";
import styled from "styled-components";
import AppointmentsTable from "./AppointmentsTable";
import { mockAppointments } from "./mockAppointments";

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
  gap: 16px;
  align-items: center;
  margin-bottom: 28px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 800;
`;

const Subtitle = styled.p`
  margin: 8px 0 0;
  font-size: 15px;
  color: #475569;
`;

const FilterArea = styled.div`
  display: grid;
  gap: 12px;
  align-items: center;
  grid-template-columns: minmax(220px, 1fr) auto;
`;

const Input = styled.input`
  width: 100%;
  min-height: 48px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid #cbd5e1;
  color: #0f172a;
  font-size: 15px;
  outline: none;
`;

const ReportGrid = styled.div`
  display: grid;
  gap: 18px;
  margin-top: 24px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const StatCard = styled.div`
  border-radius: 24px;
  padding: 24px;
  background: #ffffff;
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
`;

const StatLabel = styled.p`
  margin: 0 0 8px;
  color: #64748b;
  font-size: 14px;
  font-weight: 700;
`;

const StatValue = styled.h3`
  margin: 0;
  font-size: 34px;
  color: #0f172a;
`;

const AppointmentManagement = () => {
  const [filterDate, setFilterDate] = useState("");
  const [appointments, setAppointments] = useState(mockAppointments);

  const filteredAppointments = useMemo(() => {
    if (!filterDate) return appointments;
    return appointments.filter((appointment) => appointment.date === filterDate);
  }, [appointments, filterDate]);

  const completeAppointment = (id: string) => {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "Completed" } : appointment
      )
    );
  };

  const cancelAppointment = (id: string) => {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "Cancelled" } : appointment
      )
    );
  };

  const todayAppointments = useMemo(() => appointments.filter((item) => item.date === "2026-08-06"), [appointments]);
  const pendingReports = useMemo(() => appointments.filter((item) => item.status === "Pending Report"), [appointments]);
  const emergencyCases = useMemo(() => appointments.filter((item) => item.isEmergency), [appointments]);
  const schedule = useMemo(() => todayAppointments.slice(0, 4), [todayAppointments]);

  return (
    <Page>
      <Container>
        <Header>
          <div>
            <Title>Appointment Management</Title>
            <Subtitle>View today&apos;s appointments, mark status, cancel, and filter by date.</Subtitle>
          </div>
          <FilterArea>
            <Input
              type="date"
              value={filterDate}
              onChange={(event) => setFilterDate(event.target.value)}
            />
          </FilterArea>
        </Header>

        <ReportGrid>
          <StatCard>
            <StatLabel>Total appointments today</StatLabel>
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
        </ReportGrid>

        <AppointmentsTable
          appointments={filteredAppointments}
          onComplete={completeAppointment}
          onCancel={cancelAppointment}
        />
      </Container>
    </Page>
  );
};

export default AppointmentManagement;
