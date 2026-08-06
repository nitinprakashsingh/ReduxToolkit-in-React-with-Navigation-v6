import styled from "styled-components";
import { getDoctorEmail, signOut } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";
import { useState, type ChangeEvent } from "react";

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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const DrawerTitle = styled.h3`
  margin: 0;
  font-size: 22px;
  font-weight: 800;
`;

const DrawerText = styled.p`
  margin: 8px 0 0;
  color: #475569;
  font-size: 14px;
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

const ActionButton = styled.button<{ secondary?: boolean }>`
  width: 100%;
  border: none;
  border-radius: 14px;
  padding: 14px 16px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  color: #ffffff;
  background: ${({ secondary }) => (secondary ? "#475569" : "#7c3aed")};
  margin-top: 10px;
`;

const SideDrawer = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const doctorEmail = getDoctorEmail();

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  return (
    <>
      <DrawerOverlay onClick={onClose} />
      <DrawerPanel>
        <DrawerHeader>
          <div>
            <DrawerTitle>Doctor Menu</DrawerTitle>
            <DrawerText>Manage profile and notifications</DrawerText>
          </div>
          <button onClick={onClose} style={{ border: "none", background: "transparent", fontSize: 20, cursor: "pointer" }}>
            ×
          </button>
        </DrawerHeader>

        <DrawerSection>
          <DrawerLabel>Doctor</DrawerLabel>
          <DrawerText>Dr. Priya Kapoor</DrawerText>
          <DrawerText>{doctorEmail}</DrawerText>
        </DrawerSection>

        <DrawerSection>
          <DrawerLabel>Profile picture</DrawerLabel>
          <ProfilePicBox>
            {profilePic ? (
              <img src={profilePic} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 24 }} />
            ) : (
              "No image selected"
            )}
          </ProfilePicBox>
          <ProfileInput
            type="file"
            accept="image/*"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                setProfilePic(reader.result as string);
              };
              reader.readAsDataURL(file);
            }}
          />
        </DrawerSection>

        <DrawerSection>
          <DrawerLabel>Notifications</DrawerLabel>
          <DrawerText>New lab report available</DrawerText>
          <DrawerText>Urgent case assigned</DrawerText>
          <DrawerText>Patient rescheduled appointment</DrawerText>
        </DrawerSection>

        <ActionButton onClick={handleSignOut} secondary>
          Sign out
        </ActionButton>
      </DrawerPanel>
    </>
  );
};

export default SideDrawer;
