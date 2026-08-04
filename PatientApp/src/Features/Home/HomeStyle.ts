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
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;
  padding: 14px 0;
  background: #f4f7fb;

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
  position: relative;
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

export const SearchSuggestionList = styled.ul`
  position: absolute;
  z-index: 10;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  margin: 0;
  padding: 8px;
  list-style: none;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.14);

  li { padding: 8px 12px; color: #64748b; font-size: 14px; }
`

export const SearchSuggestionButton = styled.button`
  display: grid;
  width: 100%;
  gap: 3px;
  padding: 10px 12px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #111827;
  text-align: left;
  cursor: pointer;

  strong { font-size: 15px; }
  span { color: #7354bd; font-size: 13px; font-weight: 700; }
  &:hover { background: #f4effd; }
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

export const FeatureCard = styled.button`
  width: 100%;
  border: 1px solid rgba(148, 163, 184, 0.16);
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 166px;
  padding: 24px;
  border-radius: 28px;
  background: #ffffff;
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.05);

  &:hover {
    border-color: #0db7a4;
    transform: translateY(-2px);
  }
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

export const ResultSection = styled.main`
  min-height: 100vh;
  background: #ffffff;
`

export const ResultHeader = styled.header`
  background: linear-gradient(135deg, #7354bd, #6541af);
  color: #ffffff;
  border-radius: 0 0 56px 56px;
  padding: 34px 28px 42px;
`

export const ResultHeaderContent = styled.div`
  width: min(1120px, 100%);
  margin: 0 auto;
`

export const ResultBackButton = styled.button`
  border: 0;
  padding: 0;
  background: transparent;
  color: #ffffff;
  font-size: 42px;
  line-height: 1;
  cursor: pointer;
`

export const ResultHeaderTitle = styled.h1`
  display: inline-block;
  margin: 0 0 24px 16px;
  font-size: 34px;
  letter-spacing: -0.03em;
`

export const ResultSearchRow = styled.div`
  display: flex;
  gap: 16px;
`

export const ResultSearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-height: 72px;
  padding: 0 24px;
  border-radius: 20px;
  background: #ffffff;
  color: #6b7280;
  font-size: 30px;
`

export const ResultSearchInput = styled.input`
  width: 100%;
  border: 0;
  outline: 0;
  color: #111827;
  font-size: 22px;
`

export const ResultFilterButton = styled.button`
  min-width: 150px;
  border: 0;
  border-radius: 20px;
  background: #0db7a4;
  color: #ffffff;
  font-size: 22px;
  font-weight: 800;
  cursor: pointer;
`

export const ResultList = styled.section`
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: 42px 28px 64px;
  box-sizing: border-box;
`

export const ResultSummary = styled.p`
  margin: 0 0 24px;
  color: #6b7280;
  font-size: 28px;

  strong { color: #111827; }
  span { display: block; margin-top: 6px; color: #0b9788; font-size: 16px; font-weight: 700; }
`

export const ResultCard = styled.article`
  display: grid;
  grid-template-columns: 270px 1fr;
  gap: 24px;
  margin-bottom: 24px;
  padding: 18px;
  border: 2px solid #e5d9f6;
  border-radius: 28px;
  background: #fbf8ff;
`

export const ResultCardImage = styled.img`
  width: 100%;
  height: 210px;
  border-radius: 18px;
  object-fit: cover;
  background: #dbeafe;
`

export const ResultCardDetails = styled.div`
  h2 { margin: 0 0 6px; color: #111827; font-size: 26px; }
`

export const ResultDistance = styled.p`
  margin: 0 0 12px;
  color: #00aa98;
  font-size: 19px;
  font-weight: 600;
`

export const ResultMeta = styled.div`
  display: flex;
  gap: 34px;
  margin-bottom: 14px;
  color: #747474;
  font-size: 16px;

  > div + div { padding-left: 24px; border-left: 1px solid #d1d5db; }
  span, strong { display: block; }
`

export const ResultMetaValue = styled.strong`
  margin-top: 4px;
  color: #111827;
  font-size: 19px;
`

export const ResultRating = styled.span`
  display: inline-block;
  margin-right: 12px;
  padding: 4px 9px;
  border: 2px solid #0db7a4;
  border-radius: 7px;
  color: #111827;
  font-size: 17px;
  font-weight: 700;
`

export const ResultBookButton = styled.button`
  display: block;
  width: 100%;
  height: 54px;
  margin-top: 18px;
  border: 0;
  border-radius: 16px;
  background: #0db7a4;
  color: #ffffff;
  font-size: 21px;
  font-weight: 800;
  cursor: pointer;

  &:hover { background: #0b9788; }
`

export const DoctorList = styled.main`
  min-height: 100vh;
  background: #f6f8fc;
  padding-bottom: 56px;
`

export const DoctorHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 26px 28px 30px;
  border-bottom: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);

  ${ResultBackButton} {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: #f4effd;
    color: #6541af;
    font-size: 28px;
  }
`

export const DoctorHeaderContent = styled.div`
  width: min(1120px, 100%);
  margin: 0 auto;
`

export const DoctorHeaderTitle = styled.h1`
  display: inline-block;
  margin: 0 0 24px 16px;
  font-size: 34px;
  letter-spacing: -0.03em;
`

export const DoctorSearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 68px;
  padding: 0 22px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid #dbe1ea;
  color: #707070;
  font-size: 28px;
`

export const DoctorSearchInput = styled.input`
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: #111827;
  font-size: 20px;
`

export const DoctorSummary = styled.p`
  width: min(1120px, 100%);
  margin: 34px auto 20px;
  padding: 0 28px;
  box-sizing: border-box;
  color: #64748b;
  font-size: 18px;
  font-weight: 700;
`

export const DoctorDetails = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  width: min(1180px, 100%);
  margin: 0 auto;
  padding: 0 28px;
  box-sizing: border-box;

  @media (max-width: 1000px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`

export const DoctorCard = styled.article`
  position: relative;
  overflow: hidden;
  padding: 10px 10px 12px;
  border: 1px solid #e1e5eb;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 14px 32px rgba(44, 32, 81, 0.08);

  h2 { margin: 15px 8px 4px; color: #17101f; font-size: 21px; line-height: 1.2; }
  p { margin: 0 8px; color: #7b8290; font-size: 16px; }
`

export const DoctorPhoto = styled.img`
  width: 132px;
  width: 100%;
  height: 260px;
  border-radius: 14px;
  object-fit: cover;
  background: #e6eef5;
`

export const DoctorRating = styled.span`
  position: absolute;
  top: 242px;
  left: 20px;
  padding: 5px 9px;
  border: 2px solid #0db7a4;
  border-radius: 7px;
  background: #ffffff;
  color: #111827;
  font-size: 15px;
  font-weight: 800;
`

export const DoctorMeta = styled.div`
  display: grid;
  gap: 5px;
  margin-top: 18px;
  color: #6b7280;
  font-size: 14px;

  strong { color: #111827; font-size: 15px; }
`

export const DoctorCardSpecialties = styled.div`
  display: grid;
  gap: 7px;
  margin: 14px 8px 0;
  padding-top: 14px;
  border-top: 1px solid #e5e7eb;

  strong { font-size: 14px; }
  span { color: #707784; font-size: 13px; line-height: 1.45; }
`

export const DoctorBookButton = styled.button`
  width: 100%;
  height: 44px;
  margin-top: 16px;
  border: 0;
  border-radius: 12px;
  background: #0db7a4;
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;

  &:hover { background: #0a9d8d; }
`

export const DetailMain = styled.main`
  min-height: 100vh;
  background: #f6f8fc;
  color: #111827;
`

export const DetailTopbar = styled.div`
  position: sticky;
  top: 0;
  z-index: 20;
  width: min(1180px, 100%);
  margin: 0 auto;
  padding: 24px 28px;
  box-sizing: border-box;
  background: #f6f8fc;
`

export const DetailBackButton = styled.button`
  border: 0;
  background: transparent;
  color: #6541af;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
`

export const DetailHeader = styled.header`
  background: #ffffff;
  border-top: 1px solid #e9edf3;
  border-bottom: 1px solid #e9edf3;
`

export const DetailContent = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  gap: 32px;
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: 32px 28px;
  box-sizing: border-box;

  ${DetailHeader} & { grid-template-columns: 190px 1fr; align-items: center; }

  @media (max-width: 760px) { grid-template-columns: 1fr; }
`

export const DetailPhoto = styled.img`
  width: 190px;
  height: 220px;
  border-radius: 20px;
  object-fit: cover;
  background: #e6eef5;
`

export const DetailIdentity = styled.div`
  p { margin: 0 0 8px; color: #7354bd; font-size: 15px; font-weight: 800; }
  > span { color: #64748b; font-size: 15px; }
`

export const DetailTitle = styled.h1`
  margin: 0;
  font-size: 38px;
  letter-spacing: -0.04em;
`

export const DetailSubheading = styled.p`
  margin: 7px 0 15px;
  color: #64748b;
  font-size: 21px;
`

export const DetailFacts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  overflow: hidden;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: #ffffff;
`

export const DetailFact = styled.div`
  display: grid;
  gap: 7px;
  padding: 20px;
  border-right: 1px solid #e2e8f0;

  &:last-child { border-right: 0; }
  span { color: #64748b; font-size: 14px; }
  strong { font-size: 16px; }
`

export const DetailSpeciality = styled.section`
  margin-top: 26px;
  padding: 28px;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: #ffffff;

  h2 { margin: 0; font-size: 24px; }
  p { margin: 12px 0 20px; color: #64748b; line-height: 1.7; }
`

export const DetailSpecialityTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  span { padding: 8px 12px; border-radius: 999px; background: #f0ebfb; color: #6541af; font-size: 14px; font-weight: 700; }
`

export const DetailBookingCard = styled.aside`
  align-self: start;
  position: sticky;
  top: 24px;
  padding: 26px;
  border: 1px solid #d8eee9;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.08);
`

export const DetailBookingTitle = styled.h2`
  margin: 0;
  font-size: 22px;
`

export const DetailBookingHint = styled.p`
  margin: 10px 0 22px;
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
`

export const DetailBookingFee = styled.p`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 15px 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  color: #64748b;

  strong { color: #111827; font-size: 19px; }
`

export const RelatedDoctorSection = styled.section`
  margin-top: 26px;

  h2 { margin: 0 0 16px; font-size: 24px; }
`

export const RelatedDoctorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 600px) { grid-template-columns: 1fr; }
`

export const RelatedDoctorCard = styled.button`
  display: grid;
  grid-template-columns: 74px 1fr;
  column-gap: 14px;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #ffffff;
  text-align: left;
  cursor: pointer;

  img { grid-row: span 4; width: 74px; height: 94px; border-radius: 12px; object-fit: cover; background: #e6eef5; }
  span { align-self: end; color: #7354bd; font-size: 12px; font-weight: 800; }
  strong { align-self: center; font-size: 15px; }
  small { color: #64748b; font-size: 12px; }
  em { align-self: start; color: #0b9788; font-size: 12px; font-style: normal; font-weight: 800; }

  &:hover { border-color: #0db7a4; box-shadow: 0 10px 24px rgba(13, 183, 164, 0.1); }
`

export const BookingPage = styled.main`
  min-height: 100vh;
  background: #f6f8fc;
  color: #111827;
`

export const BookingHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 28px max(28px, calc((100% - 1120px) / 2));
  border-bottom: 1px solid #e3e8ef;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);

  h1 { margin: 18px 0 6px; font-size: 32px; letter-spacing: -0.03em; }
  p { margin: 0; color: #64748b; }
`

export const BookingBackButton = styled.button`
  border: 0;
  background: transparent;
  color: #6541af;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
`

export const BookingBody = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  gap: 30px;
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: 34px 28px 64px;
  box-sizing: border-box;

  @media (max-width: 840px) { grid-template-columns: 1fr; }
`

export const BookingDoctorCard = styled.section`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px;
  border: 1px solid #dfd5f0;
  border-radius: 18px;
  background: #ffffff;

  span { color: #64748b; font-size: 14px; }
  h2 { margin: 4px 0; font-size: 21px; }
  p { margin: 0; color: #7354bd; font-size: 15px; font-weight: 700; }
`

export const BookingDoctorPhoto = styled.img`
  width: 76px;
  height: 88px;
  border-radius: 13px;
  object-fit: cover;
  background: #e6eef5;
`

export const BookingSection = styled.section`
  margin-top: 24px;
  padding: 26px;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: #ffffff;

  h2 { margin: 0 0 18px; font-size: 22px; }
  h3 { margin: 25px 0 12px; color: #64748b; font-size: 15px; }
`

export const BookingChoices = styled.div`
  display: flex;
  gap: 12px;
`

export const BookingChoice = styled.button<{ $active: boolean }>`
  min-height: 46px;
  padding: 0 18px;
  border: 2px solid ${({ $active }) => ($active ? "#0db7a4" : "#dce2ea")};
  border-radius: 12px;
  background: ${({ $active }) => ($active ? "#edfcf9" : "#ffffff")};
  color: #111827;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
`

export const BookingFields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 22px;
`

export const BookingField = styled.div<{ $wide?: boolean }>`
  display: grid;
  gap: 8px;
  grid-column: ${({ $wide }) => ($wide ? "1 / -1" : "auto")};

  label { color: #475569; font-size: 14px; font-weight: 700; }
  input, select, textarea { width: 100%; min-height: 46px; padding: 10px 12px; border: 1px solid #cfd8e3; border-radius: 10px; box-sizing: border-box; outline-color: #0db7a4; color: #111827; font: inherit; }
  textarea { min-height: 86px; resize: vertical; }
`

export const BookingDates = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
`

export const BookingDateButton = styled.button<{ $active: boolean }>`
  flex: 1 0 94px;
  min-height: 54px;
  border: 2px solid ${({ $active }) => ($active ? "#7354bd" : "#e0e5ec")};
  border-radius: 12px;
  background: ${({ $active }) => ($active ? "#7354bd" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#374151")};
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
`

export const BookingSlots = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
`

export const BookingSlot = styled.button<{ $active: boolean }>`
  min-height: 44px;
  border: 1px solid ${({ $active }) => ($active ? "#0db7a4" : "#dce2ea")};
  border-radius: 10px;
  background: ${({ $active }) => ($active ? "#0db7a4" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#374151")};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`

export const BookingSidebar = styled.aside`
  align-self: start;
  position: sticky;
  top: 24px;
  padding: 24px;
  border: 1px solid #d8eee9;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.08);

  p { display: flex; justify-content: space-between; gap: 16px; margin: 17px 0; color: #64748b; font-size: 14px; }
  p strong { color: #111827; text-align: right; }
`

export const BookingSummaryTitle = styled.h2`
  margin: 0;
  font-size: 21px;
`

export const BookingSummaryFee = styled.p`
  padding: 17px 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  font-size: 15px !important;

  strong { font-size: 20px; }
`

export const BookingConfirmButton = styled.button`
  width: 100%;
  height: 52px;
  margin-top: 22px;
  border: 0;
  border-radius: 13px;
  background: #0db7a4;
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;

  &:hover { background: #0a9d8d; }
`

export const PaymentPage = styled.main`
  min-height: 100vh;
  background: #f6f8fc;
  color: #111827;
`

export const PaymentMethodsPage = styled(PaymentPage)``

export const PaymentTopbar = styled.header`
  padding: 28px max(28px, calc((100% - 620px) / 2));
  border-bottom: 1px solid #e3e8ef;
  background: #ffffff;
  h1 { margin: 18px 0 6px; font-size: 30px; letter-spacing: -0.03em; }
  p { margin: 0; color: #64748b; }
`

export const PaymentBackButton = styled.button`
  border: 0;
  background: transparent;
  color: #6541af;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
`

export const PaymentPanel = styled.section`
  width: min(560px, calc(100% - 40px));
  margin: 38px auto;
  padding: 28px;
  border: 1px solid #e2e8f0;
  border-radius: 22px;
  background: #ffffff;
  box-sizing: border-box;
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.08);
  > p { margin: 0; color: #64748b; font-size: 14px; }
  > h2 { margin: 5px 0 22px; font-size: 21px; }
`

export const PaymentAmount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  span { color: #64748b; font-size: 15px; }
  strong { font-size: 26px; }
`

export const PaymentDemoNote = styled.p`
  margin: 14px 0 25px !important;
  padding: 10px 12px;
  border-radius: 10px;
  background: #fff7ed;
  color: #9a3412 !important;
  font-size: 13px !important;
  font-weight: 700;
`

export const PaymentSectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  color: #111827;
  font-size: 16px;
  font-weight: 800;
`

export const PaymentChangeButton = styled.button`
  border: 0;
  background: transparent;
  color: #0b9788;
  font: inherit;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
`

export const PaymentMethodRow = styled.button<{ $selected?: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 13px;
  margin-bottom: 10px;
  padding: 14px;
  border: 1px solid ${({ $selected }) => ($selected ? "#0db7a4" : "#e2e8f0")};
  border-radius: 14px;
  background: ${({ $selected }) => ($selected ? "#f0fdfa" : "#ffffff")};
  color: #111827;
  text-align: left;
  cursor: pointer;
  > span { display: grid; gap: 3px; flex: 1; }
  strong { font-size: 15px; }
  small { color: #64748b; font-size: 13px; }
  > b { color: #0b9788; font-size: 20px; }
`

export const PaymentMethodIcon = styled.span<{ $accent: string }>`
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: ${({ $accent }) => $accent};
  color: #ffffff;
  font-size: 14px;
  font-weight: 900;
`

export const PaymentPayButton = styled.button`
  width: 100%;
  min-height: 54px;
  margin-top: 20px;
  border: 0;
  border-radius: 14px;
  background: #0db7a4;
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  &:hover { background: #0a9d8d; }
`

export const PaymentConfirmation = styled.section`
  width: min(460px, calc(100% - 40px));
  display: grid;
  justify-items: center;
  margin: 80px auto;
  padding: 38px 28px;
  border-radius: 22px;
  background: #ffffff;
  text-align: center;
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.08);
  p { margin: 18px 0 4px; color: #0b9788; font-size: 15px; font-weight: 800; }
  h1 { margin: 0; font-size: 28px; }
  > span { margin-top: 12px; color: #64748b; line-height: 1.6; }
`

export const PaymentConfirmationIcon = styled.div`
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #d1fae5;
  color: #047857;
  font-size: 32px;
  font-weight: 900;
`

export const PaymentEmptyState = styled.div`
  padding: 28px 10px;
  text-align: center;
  > span { display: inline-grid; width: 52px; height: 52px; place-items: center; border-radius: 50%; background: #f0ebfb; color: #6541af; font-size: 24px; font-weight: 800; }
  h2 { margin: 16px 0 8px; font-size: 20px; }
  p { margin: 0; color: #64748b; line-height: 1.6; }
`
