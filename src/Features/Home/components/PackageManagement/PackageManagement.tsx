import { Eye, ListChecks, Pencil, Plus, UserPlus, Users } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

import {
  SectionTitle,
  StyledTable,
  TableDataCell,
  TableHeadCell,
  TableRow,
} from "../../screens/Dashboard/Dashboard.style";
import {
  ActionBar,
  ActionButton,
  HelperText,
  IconButton,
  PackageHeader,
  PrimaryButton,
  SubscribeForm,
  SubscribeFormActions,
  SubscribeFormGrid,
  SubscribePanel,
  StatusBadge,
  TableScroll,
  TextInput,
  TierButton,
  TierGrid,
  SelectInput,
  FieldGroup,
  FieldLabel,
  SecondaryButton,
} from "./PackageManagement.Style";

type PackagePlan = {
  id: number;
  name: string;
  price: string;
  duration: string;
  department: string;
  testsIncluded: number;
  consultancyFree: number;
  description: string;
  tier: PackageTier;
  durationMonths: number;
};

type PackageTier = "Silver" | "Gold" | "Platinum";

export type PackageView = "list" | "subscribed" | "subscribe";

type SubscribedUser = {
  id: number;
  name: string;
  phone: string;
  packageName: PackageTier;
  startDate: string;
  endDate: string;
  status: "Active" | "Expired";
};

type SubscriptionFormValues = {
  name: string;
  phone: string;
  packageName: PackageTier;
};

type PackageManagementProps = {
  view: PackageView;
  onViewChange: (view: PackageView) => void;
};

const packagePlans: PackagePlan[] = [
  {
    id: 1,
    name: "Silver Health Check",
    price: "999",
    duration: "1 Month",
    department: "General Medicine",
    testsIncluded: 4,
    consultancyFree: 1,
    description: "Basic health check with one free doctor consultation.",
    tier: "Silver",
    durationMonths: 1,
  },
  {
    id: 2,
    name: "Gold Family Care",
    price: "2499",
    duration: "3 Months",
    department: "General Medicine",
    testsIncluded: 8,
    consultancyFree: 3,
    description: "Routine tests and consultations for regular family care.",
    tier: "Gold",
    durationMonths: 3,
  },
  {
    id: 3,
    name: "Platinum Complete Care",
    price: "4999",
    duration: "6 Months",
    department: "Multi Department",
    testsIncluded: 15,
    consultancyFree: 6,
    description: "Complete package for preventive health and follow-up visits.",
    tier: "Platinum",
    durationMonths: 6,
  },
];

const initialSubscribedUsers: SubscribedUser[] = [
  {
    id: 1,
    name: "Ramesh Tiwari",
    phone: "9876543101",
    packageName: "Silver",
    startDate: "2026-05-01",
    endDate: "2026-06-01",
    status: "Active",
  },
  {
    id: 2,
    name: "Kavita Joshi",
    phone: "9123456102",
    packageName: "Silver",
    startDate: "2026-03-10",
    endDate: "2026-04-10",
    status: "Expired",
  },
  {
    id: 3,
    name: "Manoj Sinha",
    phone: "9988776103",
    packageName: "Gold",
    startDate: "2026-04-20",
    endDate: "2026-07-20",
    status: "Active",
  },
  {
    id: 4,
    name: "Nisha Kapoor",
    phone: "9012346104",
    packageName: "Gold",
    startDate: "2026-01-05",
    endDate: "2026-04-05",
    status: "Expired",
  },
  {
    id: 5,
    name: "Devendra Singh",
    phone: "9876506105",
    packageName: "Platinum",
    startDate: "2026-05-05",
    endDate: "2026-11-05",
    status: "Active",
  },
  {
    id: 6,
    name: "Anita Sharma",
    phone: "9123406106",
    packageName: "Platinum",
    startDate: "2025-10-01",
    endDate: "2026-04-01",
    status: "Expired",
  },
];

const packageTiers: PackageTier[] = ["Silver", "Gold", "Platinum"];

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const toInputDate = (date: Date) => date.toISOString().slice(0, 10);

const getEndDate = (durationMonths: number) => {
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + durationMonths);

  return toInputDate(endDate);
};

const createInitialFormValues = (
  packageName: PackageTier = "Silver"
): SubscriptionFormValues => ({
  name: "",
  phone: "",
  packageName,
});

const PackageManagement = ({ view, onViewChange }: PackageManagementProps) => {
  const [selectedPackageTier, setSelectedPackageTier] =
    useState<PackageTier>("Silver");
  const [subscribedUsers, setSubscribedUsers] = useState<SubscribedUser[]>(
    initialSubscribedUsers
  );
  const [subscriptionForm, setSubscriptionForm] =
    useState<SubscriptionFormValues>(createInitialFormValues());

  const subscribedUsersByTier = subscribedUsers.filter(
    (user) => user.packageName === selectedPackageTier
  );

  const selectedPlan = packagePlans.find(
    (plan) => plan.tier === subscriptionForm.packageName
  );

  const handleSubscribeClick = (packageName: PackageTier) => {
    setSubscriptionForm(createInitialFormValues(packageName));
    onViewChange("subscribe");
  };

  const handleSubscriptionSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedPlan) {
      return;
    }

    const trimmedName = subscriptionForm.name.trim();
    const trimmedPhone = subscriptionForm.phone.trim();

    if (!trimmedName || !trimmedPhone) {
      return;
    }

    const newSubscription: SubscribedUser = {
      id: Date.now(),
      name: trimmedName,
      phone: trimmedPhone,
      packageName: selectedPlan.tier,
      startDate: toInputDate(new Date()),
      endDate: getEndDate(selectedPlan.durationMonths),
      status: "Active",
    };

    setSubscribedUsers((users) => [newSubscription, ...users]);
    setSelectedPackageTier(selectedPlan.tier);
    setSubscriptionForm(createInitialFormValues(selectedPlan.tier));
    onViewChange("subscribed");
  };

  if (view === "subscribe") {
    return (
      <>
        <PackageHeader>
          <div>
            <SectionTitle>Subscribe Package</SectionTitle>
            <HelperText>
              Add a user subscription for Silver, Gold, or Platinum packages.
            </HelperText>
          </div>
        </PackageHeader>

        <SubscribePanel>
          <SubscribeForm onSubmit={handleSubscriptionSubmit}>
            <SubscribeFormGrid>
              <FieldGroup>
                <FieldLabel htmlFor="subscriber-name">User Name</FieldLabel>
                <TextInput
                  id="subscriber-name"
                  value={subscriptionForm.name}
                  onChange={(event) =>
                    setSubscriptionForm((form) => ({
                      ...form,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Enter user name"
                  required
                />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel htmlFor="subscriber-phone">Phone No</FieldLabel>
                <TextInput
                  id="subscriber-phone"
                  value={subscriptionForm.phone}
                  onChange={(event) =>
                    setSubscriptionForm((form) => ({
                      ...form,
                      phone: event.target.value,
                    }))
                  }
                  placeholder="Enter phone number"
                  required
                />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel htmlFor="package-tier">Package</FieldLabel>
                <SelectInput
                  id="package-tier"
                  value={subscriptionForm.packageName}
                  onChange={(event) =>
                    setSubscriptionForm((form) => ({
                      ...form,
                      packageName: event.target.value as PackageTier,
                    }))
                  }
                >
                  {packageTiers.map((tier) => (
                    <option key={tier} value={tier}>
                      {tier}
                    </option>
                  ))}
                </SelectInput>
              </FieldGroup>
            </SubscribeFormGrid>

            <SubscribeFormActions>
              <SecondaryButton type="button" onClick={() => onViewChange("list")}>
                Cancel
              </SecondaryButton>
              <PrimaryButton type="submit">
                <UserPlus size={16} />
                Subscribe
              </PrimaryButton>
            </SubscribeFormActions>
          </SubscribeForm>
        </SubscribePanel>
      </>
    );
  }

  if (view === "subscribed") {
    return (
      <>
        <PackageHeader>
          <div>
            <SectionTitle>Subscribed Packages</SectionTitle>
            <HelperText>
              Select a package type to view active and expired users.
            </HelperText>
          </div>
        </PackageHeader>

        <ActionBar>
          <ActionButton onClick={() => onViewChange("list")}>
            <ListChecks size={16} />
            Package List
          </ActionButton>
          <ActionButton $active>
            <Users size={16} />
            Subscribed
          </ActionButton>
        </ActionBar>

        <TierGrid>
          {packageTiers.map((tier) => (
            <TierButton
              key={tier}
              $active={selectedPackageTier === tier}
              onClick={() => setSelectedPackageTier(tier)}
            >
              {tier}
            </TierButton>
          ))}
        </TierGrid>

        <TableScroll>
          <StyledTable>
            <thead>
              <tr>
                <TableHeadCell>User Name</TableHeadCell>
                <TableHeadCell>Phone No</TableHeadCell>
                <TableHeadCell>Package</TableHeadCell>
                <TableHeadCell>Start Date</TableHeadCell>
                <TableHeadCell>End Date</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Action</TableHeadCell>
              </tr>
            </thead>

            <tbody>
              {subscribedUsersByTier.map((user) => (
                <TableRow key={user.id}>
                  <TableDataCell>{user.name}</TableDataCell>
                  <TableDataCell>{user.phone}</TableDataCell>
                  <TableDataCell>{user.packageName}</TableDataCell>
                  <TableDataCell>{formatDate(user.startDate)}</TableDataCell>
                  <TableDataCell>{formatDate(user.endDate)}</TableDataCell>
                  <TableDataCell>
                    <StatusBadge $variant={user.status === "Active" ? "active" : "expired"}>
                      {user.status}
                    </StatusBadge>
                  </TableDataCell>
                  <TableDataCell>
                    <IconButton
                      title="View package details"
                      onClick={() => alert(`View package details for ${user.name}`)}
                    >
                      <Eye size={16} />
                    </IconButton>
                  </TableDataCell>
                </TableRow>
              ))}
              {subscribedUsersByTier.length === 0 && (
                <TableRow>
                  <TableDataCell colSpan={7}>No subscribed users found.</TableDataCell>
                </TableRow>
              )}
            </tbody>
          </StyledTable>
        </TableScroll>
      </>
    );
  }

  return (
    <>
      <PackageHeader>
        <div>
          <SectionTitle>Package List</SectionTitle>
          <HelperText>
            Manage package price, duration, department, tests, and consultancy.
          </HelperText>
        </div>
      </PackageHeader>

      <ActionBar>
        <ActionButton $active>
          <ListChecks size={16} />
          Package List
        </ActionButton>
        <ActionButton onClick={() => onViewChange("subscribed")}>
          <Users size={16} />
          Subscribed
        </ActionButton>
      </ActionBar>

      <TableScroll>
        <StyledTable>
          <thead>
            <tr>
              <TableHeadCell>Package Name</TableHeadCell>
              <TableHeadCell>Price</TableHeadCell>
              <TableHeadCell>Duration</TableHeadCell>
              <TableHeadCell>Department</TableHeadCell>
              <TableHeadCell>Test Include No.</TableHeadCell>
              <TableHeadCell>Consultancy Free</TableHeadCell>
              <TableHeadCell>Description</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </tr>
          </thead>

          <tbody>
            {packagePlans.map((plan) => (
              <TableRow key={plan.id}>
                <TableDataCell>{plan.name}</TableDataCell>
                <TableDataCell>Rs. {plan.price}</TableDataCell>
                <TableDataCell>{plan.duration}</TableDataCell>
                <TableDataCell>{plan.department}</TableDataCell>
                <TableDataCell>{plan.testsIncluded}</TableDataCell>
                <TableDataCell>{plan.consultancyFree}</TableDataCell>
                <TableDataCell>{plan.description}</TableDataCell>
                <TableDataCell>
                  <IconButton
                    title="View package"
                    onClick={() => alert(`View ${plan.name}`)}
                  >
                    <Eye size={16} />
                  </IconButton>
                  <IconButton
                    title="Edit package"
                    onClick={() => alert(`Edit ${plan.name}`)}
                  >
                    <Pencil size={16} />
                  </IconButton>
                  <IconButton
                    title={`Subscribe ${plan.tier} package`}
                    onClick={() => handleSubscribeClick(plan.tier)}
                  >
                    <UserPlus size={16} />
                  </IconButton>
                </TableDataCell>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      </TableScroll>

      <ActionBar style={{ marginTop: "18px", marginBottom: 0 }}>
        <PrimaryButton onClick={() => handleSubscribeClick("Silver")}>
          <UserPlus size={16} />
          Subscribe User
        </PrimaryButton>
        <PrimaryButton onClick={() => alert("Add New Package")}>
          <Plus size={16} />
          Add New Package
        </PrimaryButton>
      </ActionBar>
    </>
  );
};

export default PackageManagement;
