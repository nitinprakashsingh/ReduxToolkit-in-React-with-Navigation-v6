import React, { useMemo, useState } from "react"
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
  ViewAllScreen,
  ViewAllHeader,
  BackButton,
  ViewAllTitle,
  ViewAllTabs,
  ViewAllTab,
  ViewAllContent,
  ViewAllCardGrid,
  ViewAllCard,
  ViewAllCardIcon,
  ViewAllCardLabel,
  ViewAllCardSubtitle,
  ViewAllSearchCard,
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

const topCareItems = [
  { label: "Heart attack", category: "Heart", icon: "🩸", subtitle: "Emergency response" },
  { label: "Heart Failure", category: "Heart", icon: "❤️‍🩹", subtitle: "Chronic support" },
  { label: "Angina", category: "Heart", icon: "💓", subtitle: "Chest discomfort" },
  { label: "High BP", category: "Heart", icon: "📈", subtitle: "Blood pressure care" },
  { label: "Liver cleanse", category: "Liver", icon: "🧪", subtitle: "Detox plans" },
  { label: "Kidney stones", category: "Kidney", icon: "🪨", subtitle: "Mineral management" },
  { label: "Stomach pain", category: "Stomach", icon: "🤢", subtitle: "Digestive relief" },
  { label: "Brain fog", category: "Brain", icon: "🧠", subtitle: "Cognitive wellness" },
  { label: "Lung check", category: "Lung", icon: "🌬️", subtitle: "Respiratory screening" },
  { label: "Eye care", category: "Eye", icon: "👁️", subtitle: "Vision diagnostics" },
  { label: "Liver function", category: "Liver", icon: "🩸", subtitle: "Function testing" },
  { label: "Kidney health", category: "Kidney", icon: "💧", subtitle: "Hydration care" },
]

const categoryTabs = ["All", "Heart", "Liver", "Kidney", "Stomach", "Brain", "Lung", "Eye"]

const Home = () => {
  const [viewAllOpen, setViewAllOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTopCareItems = useMemo(
    () =>
      topCareItems.filter((item) => {
        const matchCategory = activeCategory === "All" || item.category === activeCategory
        const matchSearch = item.label.toLowerCase().includes(searchTerm.toLowerCase())
        return matchCategory && matchSearch
      }),
    [activeCategory, searchTerm]
  )

  const openViewAll = () => {
    setActiveCategory("All")
    setSearchTerm("")
    setViewAllOpen(true)
  }

  const closeViewAll = () => {
    setViewAllOpen(false)
  }

  if (viewAllOpen) {
    return (
      <Page>
        <ViewAllScreen>
          <Container>
            <ViewAllHeader>
              <BackButton type="button" onClick={closeViewAll} aria-label="Go back">
                ←
              </BackButton>
              <ViewAllTitle>Top Care</ViewAllTitle>
            </ViewAllHeader>

            <ViewAllSearchCard>
              <SearchIcon>🔍</SearchIcon>
              <SearchInput
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search care categories"
              />
            </ViewAllSearchCard>

            <ViewAllTabs>
              {categoryTabs.map((tab) => (
                <ViewAllTab
                  key={tab}
                  type="button"
                  $active={activeCategory === tab}
                  onClick={() => setActiveCategory(tab)}
                >
                  {tab}
                </ViewAllTab>
              ))}
            </ViewAllTabs>

            <ViewAllContent>
              <ViewAllCardGrid>
                {filteredTopCareItems.map((item) => (
                  <ViewAllCard key={item.label}>
                    <ViewAllCardIcon>{item.icon}</ViewAllCardIcon>
                    <ViewAllCardLabel>{item.label}</ViewAllCardLabel>
                    <ViewAllCardSubtitle>{item.subtitle}</ViewAllCardSubtitle>
                  </ViewAllCard>
                ))}
              </ViewAllCardGrid>
            </ViewAllContent>
          </Container>
        </ViewAllScreen>
      </Page>
    )
  }

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
              <ViewAllButton type="button" onClick={openViewAll}>
                View all
              </ViewAllButton>
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
