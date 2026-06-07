import React from "react"
import {
  Page,
  Container,
  TopBar,
  LocationInfo,
  MenuButton,
  LocationLabel,
  LocationValue,
  SearchSection,
  SearchCard,
  SearchIcon,
  SearchInput,
  SearchAction,
  PageTitle,
  PageSubtitle,
  Section,
  SectionHeader,
  SectionTitle,
  ViewAllButton,
  CardGrid,
  FeatureCard,
  FeatureIcon,
  FeatureLabel,
  FeatureDescription,
  FooterNote,
} from "./HomeStyle"

const sections = [
  {
    title: "Common Care",
    items: [
      { label: "General Checkup", description: "Routine health review", icon: "🩺" },
      { label: "Viral Tests", description: "Fast diagnosis", icon: "🧬" },
      { label: "ENT Care", description: "Nose, ear & throat", icon: "👃" },
      { label: "Heart Health", description: "Cardio monitoring", icon: "❤️" },
    ],
  },
  {
    title: "Seasonal Care",
    items: [
      { label: "Cold & Flu", description: "Seasonal support", icon: "🤧" },
      { label: "Allergy Relief", description: "Quick comfort", icon: "🌿" },
      { label: "Skin Care", description: "Sensitive treatment", icon: "🧴" },
      { label: "Wellness Plan", description: "Preventive care", icon: "📋" },
    ],
  },
]

const Home = () => {
  return (
    <Page>
      <Container>
        <TopBar>
          <LocationInfo>
            <MenuButton aria-label="Open menu">☰</MenuButton>
            <div>
              <LocationLabel>Location</LocationLabel>
              <LocationValue>Sector 47, Gurgaon ▾</LocationValue>
            </div>
          </LocationInfo>
          <SearchAction aria-label="Open filters">⛭</SearchAction>
        </TopBar>

        <SearchSection>
          <div>
            <PageTitle>Find care near you</PageTitle>
            <PageSubtitle>Search hospitals, doctors, and health services in your area.</PageSubtitle>
          </div>
          <SearchCard>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput placeholder="Search by hospital" />
          </SearchCard>
        </SearchSection>

        {sections.map((section) => (
          <Section key={section.title}>
            <SectionHeader>
              <SectionTitle>{section.title}</SectionTitle>
              <ViewAllButton>View all</ViewAllButton>
            </SectionHeader>
            <CardGrid>
              {section.items.map((item) => (
                <FeatureCard key={item.label}>
                  <FeatureIcon>{item.icon}</FeatureIcon>
                  <FeatureLabel>{item.label}</FeatureLabel>
                  <FeatureDescription>{item.description}</FeatureDescription>
                </FeatureCard>
              ))}
            </CardGrid>
          </Section>
        ))}

        <FooterNote>Browse featured care categories for fast access to services and appointments.</FooterNote>
      </Container>
    </Page>
  )
}

export default Home
