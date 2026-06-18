import styled from "styled-components"

export const Page = styled.div`
  min-height: 100vh;
  background: #f4f7fb;
  color: #111827;
`

export const Container = styled.div`
  width: min(1180px, 100%);
  margin: 0 auto;
  padding: 32px 28px 48px;
`

export const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;

  @media (max-width: 780px) {
    flex-direction: column;
    align-items: stretch;
  }
`

export const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  cursor: pointer;
`

export const MenuButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  border: none;
  background: #ffffff;
  color: #5b21b6;
  position: relative;
  font-size: 0;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);

  &::before {
    content: "";
    position: absolute;
    left: 14px;
    top: 16px;
    width: 20px;
    height: 2px;
    border-radius: 999px;
    background: currentColor;
    box-shadow: 0 7px 0 currentColor, 0 14px 0 currentColor;
  }
`

export const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 40;
  background: rgba(15, 23, 42, 0.42);
  backdrop-filter: blur(2px);
`

export const SideDrawer = styled.aside`
  display: flex;
  flex-direction: column;
  width: min(360px, 86vw);
  height: 100dvh;
  max-height: 100vh;
  padding: 24px;
  background: #ffffff;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 24px 0 60px rgba(15, 23, 42, 0.18);
`

export const DrawerHeader = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 22px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
`

export const DrawerTitle = styled.h2`
  margin: 0;
  color: #111827;
  font-size: 22px;
  font-weight: 800;
`

export const DrawerSubtitle = styled.p`
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
`

export const CloseDrawerButton = styled.button`
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 12px;
  background: #f3f4f6;
  color: #374151;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
`

export const DrawerNav = styled.nav`
  flex: 1 1 auto;
  min-height: 0;
  display: grid;
  align-content: start;
  gap: 10px;
  padding: 26px 0;
  overflow-y: auto;
  overscroll-behavior: contain;
`

export const DrawerNavItem = styled.button`
  width: 100%;
  min-height: 46px;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: #111827;
  font-size: 15px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: #ecfdf5;
    color: #047857;
  }
`

export const DrawerFooter = styled.div`
  flex: 0 0 auto;
  margin-top: auto;
  padding-top: 22px;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
`

export const SignOutButton = styled.button`
  width: 100%;
  min-height: 48px;
  border: none;
  border-radius: 14px;
  background: #ef4444;
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 14px 30px rgba(239, 68, 68, 0.22);
`

export const LocationLabel = styled.p`
  margin: 0 0 4px;
  color: #6b7280;
  font-size: 13px;
`

export const LocationValue = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.03em;
`

export const SearchSection = styled.section`
  display: grid;
  gap: 22px;
  margin-bottom: 32px;

  @media (max-width: 780px) {
    gap: 18px;
  }
`

export const SearchCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-radius: 22px;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.04);
`

export const SearchIcon = styled.span`
  font-size: 20px;
  color: #0f766e;
`

export const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  color: #111827;
  background: transparent;
  min-height: 44px;

  &::placeholder {
    color: #9ca3af;
  }
`

export const SearchAction = styled.button`
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 16px;
  background: #10b981;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 14px 32px rgba(16, 185, 129, 0.18);

  @media (max-width: 780px) {
    align-self: flex-start;
  }
`

export const PageTitle = styled.h2`
  margin: 0;
  font-size: 34px;
  line-height: 1.1;
  font-weight: 800;
`

export const PageSubtitle = styled.p`
  margin: 10px 0 0;
  max-width: 620px;
  font-size: 15px;
  color: #4b5563;
  line-height: 1.75;
`

export const Section = styled.section`
  margin-bottom: 34px;
`

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;

  @media (max-width: 660px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const SectionTitle = styled.h3`
  margin: 0;
  font-size: 22px;
  font-weight: 800;
`

export const ViewAllButton = styled.button`
  border: 1px solid #14b8a6;
  background: rgba(20, 184, 166, 0.08);
  color: #0f766e;
  border-radius: 999px;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 780px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`

export const FeatureCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 166px;
  padding: 24px;
  border-radius: 28px;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.16);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.05);
`

export const FeatureIcon = styled.div`
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: #def7ec;
  color: #047857;
  font-size: 24px;
`

export const FeatureLabel = styled.h4`
  margin: 0;
  font-size: 17px;
  font-weight: 800;
`

export const FeatureDescription = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.7;
`

export const FooterNote = styled.p`
  margin: 0;
  padding: 20px 0 0;
  color: #6b7280;
  font-size: 13px;
`

export const ViewAllScreen = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #7c3aed 0%, #6d28d9 100%);
  padding: 40px 0 60px;
`

export const ViewAllHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 24px;
  color: #ffffff;
`

export const BackButton = styled.button`
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
`

export const ViewAllTitle = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.03em;
`

export const ViewAllSearchCard = styled(SearchCard)`
  margin-bottom: 20px;
  background: #ffffff;
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
`

export const ViewAllTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 26px;
`

export const ViewAllTab = styled.button<{ $active?: boolean }>`
  border: none;
  border-radius: 999px;
  padding: 10px 18px;
  min-height: 42px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  color: ${({ $active }) => ($active ? "#ffffff" : "#475569")};
  background: ${({ $active }) => ($active ? "rgba(255, 255, 255, 0.22)" : "rgba(255, 255, 255, 0.12)")};
  box-shadow: ${({ $active }) => ($active ? "0 12px 24px rgba(255, 255, 255, 0.18)" : "none")};
`

export const ViewAllContent = styled.section`
  padding: 0 0 24px;
`

export const ViewAllCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 780px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`

export const ViewAllCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 190px;
  padding: 24px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 18px 32px rgba(15, 23, 42, 0.08);
`

export const ViewAllCardIcon = styled.div`
  width: 60px;
  height: 60px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: #eef2ff;
  color: #4f46e5;
  font-size: 24px;
`

export const ViewAllCardLabel = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #111827;
`

export const ViewAllCardSubtitle = styled.p`
  margin: 0;
  color: #475569;
  font-size: 14px;
  line-height: 1.7;
`

