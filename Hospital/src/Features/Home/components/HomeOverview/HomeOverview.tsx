import { Bed, Building2, CalendarDays, ClipboardList, PackageCheck } from "lucide-react";
import { useState } from "react";

import HospitalProfile from "../HospitalProfile";
import {
  AvailabilityOptions,
  CardIcon,
  CardTitle,
  HelpButton,
  OverviewCard,
  OverviewGrid,
  RadioLabel,
} from "./HomeOverview.Style";

type HomeOverviewProps = {
  onBookingClick?: () => void;
  onPackageClick?: () => void;
};

const HomeOverview = ({ onBookingClick, onPackageClick }: HomeOverviewProps) => {
  const [showProfile, setShowProfile] = useState(false);

  if (showProfile) {
    return <HospitalProfile onBack={() => setShowProfile(false)} />;
  }

  return (
    <>
      <OverviewGrid>
        <OverviewCard onClick={() => setShowProfile(true)}>
          <CardIcon>
            <Building2 size={58} strokeWidth={1.8} />
          </CardIcon>
          <AvailabilityOptions onClick={(event) => event.stopPropagation()}>
            <RadioLabel>
              <input defaultChecked name="hospitalAvailability" type="radio" />
              Yes
            </RadioLabel>
            <RadioLabel>
              <input name="hospitalAvailability" type="radio" />
              No
            </RadioLabel>
          </AvailabilityOptions>
          <CardTitle>Hospital Availability</CardTitle>
        </OverviewCard>

        <OverviewCard $active onClick={onBookingClick}>
          <CardIcon>
            <ClipboardList size={58} strokeWidth={1.8} />
          </CardIcon>
          <CardTitle>Booking</CardTitle>
        </OverviewCard>

        <OverviewCard>
          <CardIcon>
            <Bed size={58} strokeWidth={1.8} />
          </CardIcon>
          <CardTitle>Manage beds</CardTitle>
        </OverviewCard>

        <OverviewCard>
          <CardIcon>
            <CalendarDays size={58} strokeWidth={1.8} />
          </CardIcon>
          <CardTitle>Add schedule</CardTitle>
        </OverviewCard>

        <OverviewCard onClick={onPackageClick}>
          <CardIcon>
            <PackageCheck size={58} strokeWidth={1.8} />
          </CardIcon>
          <CardTitle>Our Package</CardTitle>
        </OverviewCard>
      </OverviewGrid>

      <HelpButton>Need Help ?</HelpButton>
    </>
  );
};

export default HomeOverview;
