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
  box-sizing: border-box;
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

export const FilterOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 24px;
  background: rgba(15, 23, 42, 0.34);
  overflow-y: auto;
`

export const FilterModal = styled.div`
  position: relative;
  width: min(690px, 100%);
  padding: 34px 42px 38px;
  border-radius: 30px;
  background: #ffffff;
  color: #020617;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.26);
  box-sizing: border-box;

  @media (max-width: 720px) {
    padding: 30px 24px 28px;
    border-radius: 24px;
  }

  @media (max-width: 480px) {
    padding: 28px 18px 22px;
    border-radius: 20px;
  }
`

export const FilterNotch = styled.span`
  position: absolute;
  top: -16px;
  left: 50%;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: #ffffff;
  transform: translateX(-50%) rotate(45deg);
`

export const FilterPanelSection = styled.section`
  display: grid;
  gap: 12px;
  margin-bottom: 28px;

  &:last-of-type {
    margin-bottom: 22px;
  }
`

export const FilterPanelTitle = styled.h3`
  margin: 0;
  color: #050505;
  font-size: 24px;
  line-height: 1.2;
  font-weight: 800;

  @media (max-width: 560px) {
    font-size: 20px;
  }
`

export const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px 16px;
`

export const FilterOptionButton = styled.button<{ $active?: boolean }>`
  min-height: 46px;
  padding: 8px 15px;
  border: 2px solid ${({ $active }) => ($active ? "#7354bd" : "#dddddd")};
  border-radius: 8px;
  background: ${({ $active }) => ($active ? "#7354bd" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#26345a")};
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: 560px) {
    min-height: 42px;
    font-size: 16px;
  }
`

export const FilterRadioOption = styled.button<{ $active?: boolean }>`
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border: 2px solid #dddddd;
  border-radius: 8px;
  background: #ffffff;
  color: #26345a;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;

  ${({ $active }) =>
    $active &&
    `
      border-color: #d6d6d6;
    `}

  @media (max-width: 560px) {
    min-height: 42px;
    font-size: 16px;
  }
`

export const FilterRadioMark = styled.span<{ $active?: boolean; $square?: boolean }>`
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
  display: inline-grid;
  place-items: center;
  border: 2px solid ${({ $active }) => ($active ? "#0db7a4" : "#d8d8d8")};
  border-radius: ${({ $square }) => ($square ? "4px" : "999px")};
  background: ${({ $active, $square }) => ($active && $square ? "#0db7a4" : "#ffffff")};

  &::after {
    content: "";
    width: ${({ $square }) => ($square ? "11px" : "12px")};
    height: ${({ $square }) => ($square ? "6px" : "12px")};
    border-radius: ${({ $square }) => ($square ? "0" : "999px")};
    background: ${({ $active, $square }) => ($active && !$square ? "#0db7a4" : "transparent")};
    border-left: ${({ $active, $square }) => ($active && $square ? "3px solid #ffffff" : "0")};
    border-bottom: ${({ $active, $square }) => ($active && $square ? "3px solid #ffffff" : "0")};
    transform: ${({ $square }) => ($square ? "rotate(-45deg) translateY(-1px)" : "none")};
  }
`

export const FilterDivider = styled.hr`
  border: 0;
  border-top: 2px dashed #dddddd;
  margin: 2px 0 20px;
`

export const FilterDistanceLabels = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-top: 14px;
  color: #050505;
  font-size: 24px;
  font-weight: 500;

  @media (max-width: 560px) {
    font-size: 18px;
  }
`

export const FilterDistanceRange = styled.input<{ $value: number }>`
  width: 100%;
  height: 10px;
  margin: 20px 0 0;
  appearance: none;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    #0db7a4 0%,
    #0db7a4 ${({ $value }) => $value * 2}%,
    #d8d8d8 ${({ $value }) => $value * 2}%,
    #d8d8d8 100%
  );
  cursor: pointer;
  touch-action: pan-x;

  &::-webkit-slider-thumb {
    width: 24px;
    height: 24px;
    appearance: none;
    border: 3px solid #ffffff;
    border-radius: 50%;
    background: #0db7a4;
    box-shadow: 0 1px 4px rgba(15, 23, 42, 0.25);
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border: 3px solid #ffffff;
    border-radius: 50%;
    background: #0db7a4;
    box-shadow: 0 1px 4px rgba(15, 23, 42, 0.25);
  }
`

export const FilterDistanceOption = styled.button<{ $active: boolean }>`
  padding: 2px;
  border: 0;
  background: transparent;
  color: ${({ $active }) => ($active ? "#0b9788" : "#050505")};
  font: inherit;
  font-weight: ${({ $active }) => ($active ? "800" : "500")};
  cursor: pointer;
`

export const ApplyFilterButton = styled.button`
  width: 100%;
  height: 60px;
  min-height: 60px;
  border: none;
  border-radius: 22px;
  background: #0db7a4;
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;

  @media (max-width: 560px) {
    height: 60px;
    min-height: 60px;
    border-radius: 16px;
    font-size: 24px;
  }
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

export const SearchControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;

  @media (max-width: 560px) {
    align-items: stretch;
    flex-direction: column;
  }
`

export const SearchCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1 1 auto;
  padding: 10px 16px;
  border-radius: 18px;
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
  min-height: 38px;

  &::placeholder {
    color: #9ca3af;
  }
`

export const FilterButton = styled.button`
  flex: 0 0 auto;
  min-width: 118px;
  min-height: 58px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  border-radius: 18px;
  background: #10b981;
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 14px 32px rgba(16, 185, 129, 0.18);

  @media (max-width: 560px) {
    width: 100%;
    min-height: 52px;
  }
`

export const FilterButtonIcon = styled.span`
  width: 18px;
  height: 18px;
  position: relative;
  display: inline-block;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 18px;
    height: 2px;
    border-radius: 999px;
    background: currentColor;
    box-shadow: 0 7px 0 currentColor;
  }

  &::before {
    top: 2px;
  }

  &::after {
    top: 9px;
    width: 13px;
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
