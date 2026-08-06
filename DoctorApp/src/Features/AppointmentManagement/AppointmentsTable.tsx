import styled from "styled-components";
import type { Appointment } from "./mockAppointments";

const TableWrapper = styled.section`
  margin-top: 32px;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(4, minmax(160px, 240px));
  gap: 12px;
  padding: 22px 28px;
  background: #eef2ff;
  color: #334155;
  font-size: 13px;
  font-weight: 800;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(4, minmax(160px, 240px));
  gap: 12px;
  padding: 22px 28px;
  align-items: center;
  border-top: 1px solid #e2e8f0;

  &:nth-child(odd) {
    background: #fbfcff;
  }
`;

const Cell = styled.div`
  color: #0f172a;
  font-size: 14px;
`;

const StatusPill = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  background: ${({ status }) =>
    status === "Scheduled"
      ? "#4338ca"
      : status === "Completed"
      ? "#16a34a"
      : status === "Pending Report"
      ? "#f97316"
      : status === "Cancelled"
      ? "#ef4444"
      : "#64748b"};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ secondary?: boolean }>`
  border: none;
  padding: 10px 16px;
  border-radius: 12px;
  min-height: 42px;
  font-weight: 700;
  cursor: pointer;
  color: #fff;
  background: ${({ secondary }) => (secondary ? "#475569" : "#2563eb")};

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
  }
`;

const AppointmentsTable = ({
  appointments,
  onComplete,
  onCancel,
}: {
  appointments: Appointment[];
  onComplete: (id: string) => void;
  onCancel: (id: string) => void;
}) => {
  return (
    <TableWrapper>
      <TableHeader>
        <div>Patient</div>
        <div>Time</div>
        <div>Department</div>
        <div>Status</div>
        <div>Actions</div>
      </TableHeader>
      {appointments.map((appointment) => (
        <Row key={appointment.id}>
          <Cell>
            <strong>{appointment.patientName}</strong>
            <div style={{ color: "#64748b", marginTop: 6 }}>{appointment.patientEmail}</div>
          </Cell>
          <Cell>{appointment.slot}</Cell>
          <Cell>{appointment.department}</Cell>
          <Cell>
            <StatusPill status={appointment.status}>{appointment.status}</StatusPill>
          </Cell>
          <Cell>
            <ButtonGroup>
              <ActionButton
                secondary
                disabled={appointment.status !== "Scheduled"}
                onClick={() => onComplete(appointment.id)}
              >
                Complete
              </ActionButton>
              <ActionButton
                disabled={appointment.status !== "Scheduled"}
                onClick={() => onCancel(appointment.id)}
              >
                Cancel
              </ActionButton>
            </ButtonGroup>
          </Cell>
        </Row>
      ))}
    </TableWrapper>
  );
};

export default AppointmentsTable;
