import { Eye, ListChecks, Pencil, Plus, UserPlus, Users } from "lucide-react";
import type { FormEvent } from "react";
import { useCallback, useEffect, useState } from "react";

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
import {
  PackagePlan,
  PackageSubscription,
  CreatePackagePlanPayload,
  createPackagePlanApi,
  createPackageSubscriptionApi,
  fetchPackagePlansApi,
  fetchPackageSubscriptionsApi,
} from "./packageApi";

type PackageTier = string;

export type PackageView = "list" | "subscribed" | "subscribe" | "add";

type SubscriptionFormValues = {
  name: string;
  phone: string;
  packageName: PackageTier;
};

type PackageManagementProps = {
  view: PackageView;
  onViewChange: (view: PackageView) => void;
};

const defaultPackageTiers: PackageTier[] = ["Silver", "Gold", "Platinum"];

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const createInitialFormValues = (
  packageName: PackageTier = "Silver"
): SubscriptionFormValues => ({
  name: "",
  phone: "",
  packageName,
});

const initialPackageForm: CreatePackagePlanPayload = {
  name: "",
  price: "",
  duration: "",
  department: "",
  testsIncluded: "",
  consultancyFree: "",
  description: "",
  tier: "",
  durationMonths: "",
};

const getErrorMessage = (apiError: any, fallback: string) =>
  apiError.response?.data?.message ?? apiError.message ?? fallback;

const PackageManagement = ({ view, onViewChange }: PackageManagementProps) => {
  const [selectedPackageTier, setSelectedPackageTier] =
    useState<PackageTier>("Silver");
  const [packagePlans, setPackagePlans] = useState<PackagePlan[]>([]);
  const [subscribedUsers, setSubscribedUsers] = useState<PackageSubscription[]>([]);
  const [subscriptionForm, setSubscriptionForm] =
    useState<SubscriptionFormValues>(createInitialFormValues());
  const [packageForm, setPackageForm] =
    useState<CreatePackagePlanPayload>(initialPackageForm);
  const [isLoadingPackages, setIsLoadingPackages] = useState(false);
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const packageTiers = packagePlans.length
    ? packagePlans.map((plan) => plan.tier)
    : defaultPackageTiers;

  const subscribedUsersByTier = subscribedUsers.filter(
    (user) => user.packageName === selectedPackageTier
  );

  const selectedPlan = packagePlans.find(
    (plan) => plan.tier === subscriptionForm.packageName
  );

  const loadPackagePlans = useCallback(async () => {
    try {
      setIsLoadingPackages(true);
      setError(null);
      const plans = await fetchPackagePlansApi();
      setPackagePlans(plans);

      if (plans.length > 0) {
        setSelectedPackageTier((current) =>
          plans.some((plan) => plan.tier === current) ? current : plans[0].tier
        );
        setSubscriptionForm((form) => ({
          ...form,
          packageName: plans.some((plan) => plan.tier === form.packageName)
            ? form.packageName
            : plans[0].tier,
        }));
      }
    } catch (apiError: any) {
      setError(getErrorMessage(apiError, "Failed to load packages"));
    } finally {
      setIsLoadingPackages(false);
    }
  }, []);

  const loadSubscriptions = useCallback(async () => {
    try {
      setIsLoadingSubscriptions(true);
      setError(null);
      const subscriptions = await fetchPackageSubscriptionsApi();
      setSubscribedUsers(subscriptions);
    } catch (apiError: any) {
      setError(getErrorMessage(apiError, "Failed to load subscriptions"));
    } finally {
      setIsLoadingSubscriptions(false);
    }
  }, []);

  useEffect(() => {
    loadPackagePlans();
    loadSubscriptions();
  }, [loadPackagePlans, loadSubscriptions]);

  const handleSubscribeClick = (packageName: PackageTier) => {
    setSubscriptionForm(createInitialFormValues(packageName));
    onViewChange("subscribe");
  };

  const handleSubscriptionSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedPlan) {
      return;
    }

    const trimmedName = subscriptionForm.name.trim();
    const trimmedPhone = subscriptionForm.phone.trim();

    if (!trimmedName || !trimmedPhone) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      const response = await createPackageSubscriptionApi({
        name: trimmedName,
        phone: trimmedPhone,
        packageName: selectedPlan.tier,
      });

      setSubscribedUsers((users) => [response.data, ...users]);
      setSelectedPackageTier(selectedPlan.tier);
      setSubscriptionForm(createInitialFormValues(selectedPlan.tier));
      onViewChange("subscribed");
    } catch (apiError: any) {
      setError(getErrorMessage(apiError, "Failed to subscribe package"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePackageFormChange = (
    field: keyof CreatePackagePlanPayload,
    value: string
  ) => {
    setPackageForm((form) => ({
      ...form,
      [field]: value,
    }));
  };

  const handlePackageSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);
      const response = await createPackagePlanApi(packageForm);
      setPackagePlans((plans) => [...plans, response.data].sort((a, b) => Number(a.price) - Number(b.price)));
      setSelectedPackageTier(response.data.tier);
      setSubscriptionForm(createInitialFormValues(response.data.tier));
      setPackageForm(initialPackageForm);
      onViewChange("list");
    } catch (apiError: any) {
      setError(getErrorMessage(apiError, "Failed to create package"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (view === "add") {
    return (
      <>
        <PackageHeader>
          <div>
            <SectionTitle>Add New Package</SectionTitle>
            <HelperText>Create a package plan with price, duration, and benefits.</HelperText>
            {error && <HelperText style={{ color: "#dc2626" }}>{error}</HelperText>}
          </div>
        </PackageHeader>

        <SubscribePanel>
          <SubscribeForm onSubmit={handlePackageSubmit}>
            <SubscribeFormGrid>
              <FieldGroup>
                <FieldLabel htmlFor="package-name">Package Name</FieldLabel>
                <TextInput
                  id="package-name"
                  value={packageForm.name}
                  onChange={(event) => handlePackageFormChange("name", event.target.value)}
                  placeholder="Package name"
                  required
                />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel htmlFor="package-tier-name">Tier</FieldLabel>
                <TextInput
                  id="package-tier-name"
                  value={packageForm.tier}
                  onChange={(event) => handlePackageFormChange("tier", event.target.value)}
                  placeholder="Silver, Gold, Platinum"
                  required
                />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel htmlFor="package-price">Price</FieldLabel>
                <TextInput
                  id="package-price"
                  type="number"
                  min="0"
                  value={packageForm.price}
                  onChange={(event) => handlePackageFormChange("price", event.target.value)}
                  placeholder="Price"
                  required
                />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel htmlFor="package-duration">Duration</FieldLabel>
                <TextInput
                  id="package-duration"
                  value={packageForm.duration}
                  onChange={(event) => handlePackageFormChange("duration", event.target.value)}
                  placeholder="1 Month"
                  required
                />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel htmlFor="package-duration-months">Duration Months</FieldLabel>
                <TextInput
                  id="package-duration-months"
                  type="number"
                  min="1"
                  value={packageForm.durationMonths}
                  onChange={(event) =>
                    handlePackageFormChange("durationMonths", event.target.value)
                  }
                  placeholder="1"
                  required
                />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel htmlFor="package-department">Department</FieldLabel>
                <TextInput
                  id="package-department"
                  value={packageForm.department}
                  onChange={(event) => handlePackageFormChange("department", event.target.value)}
                  placeholder="General Medicine"
                  required
                />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel htmlFor="package-tests">Tests Included</FieldLabel>
                <TextInput
                  id="package-tests"
                  type="number"
                  min="0"
                  value={packageForm.testsIncluded}
                  onChange={(event) =>
                    handlePackageFormChange("testsIncluded", event.target.value)
                  }
                  placeholder="4"
                  required
                />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel htmlFor="package-consultancy">Consultancy Free</FieldLabel>
                <TextInput
                  id="package-consultancy"
                  type="number"
                  min="0"
                  value={packageForm.consultancyFree}
                  onChange={(event) =>
                    handlePackageFormChange("consultancyFree", event.target.value)
                  }
                  placeholder="1"
                  required
                />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel htmlFor="package-description">Description</FieldLabel>
                <TextInput
                  id="package-description"
                  value={packageForm.description}
                  onChange={(event) =>
                    handlePackageFormChange("description", event.target.value)
                  }
                  placeholder="Package description"
                  required
                />
              </FieldGroup>
            </SubscribeFormGrid>

            <SubscribeFormActions>
              <SecondaryButton type="button" onClick={() => onViewChange("list")}>
                Cancel
              </SecondaryButton>
              <PrimaryButton type="submit">
                <Plus size={16} />
                {isSubmitting ? "Saving..." : "Save Package"}
              </PrimaryButton>
            </SubscribeFormActions>
          </SubscribeForm>
        </SubscribePanel>
      </>
    );
  }

  if (view === "subscribe") {
    return (
      <>
        <PackageHeader>
          <div>
            <SectionTitle>Subscribe Package</SectionTitle>
            <HelperText>
              Add a user subscription for Silver, Gold, or Platinum packages.
            </HelperText>
            {error && <HelperText style={{ color: "#dc2626" }}>{error}</HelperText>}
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
                {isSubmitting ? "Subscribing..." : "Subscribe"}
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
            {error && <HelperText style={{ color: "#dc2626" }}>{error}</HelperText>}
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
              {isLoadingSubscriptions && (
                <TableRow>
                  <TableDataCell colSpan={7}>Loading subscribed users...</TableDataCell>
                </TableRow>
              )}
              {!isLoadingSubscriptions && subscribedUsersByTier.length === 0 && (
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
          {error && <HelperText style={{ color: "#dc2626" }}>{error}</HelperText>}
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
            {isLoadingPackages && (
              <TableRow>
                <TableDataCell colSpan={8}>Loading packages...</TableDataCell>
              </TableRow>
            )}
            {!isLoadingPackages && packagePlans.length === 0 && (
              <TableRow>
                <TableDataCell colSpan={8}>No packages found.</TableDataCell>
              </TableRow>
            )}
          </tbody>
        </StyledTable>
      </TableScroll>

      <ActionBar style={{ marginTop: "18px", marginBottom: 0 }}>
        <PrimaryButton onClick={() => handleSubscribeClick("Silver")}>
          <UserPlus size={16} />
          Subscribe User
        </PrimaryButton>
        <PrimaryButton onClick={() => onViewChange("add")}>
          <Plus size={16} />
          Add New Package
        </PrimaryButton>
      </ActionBar>
    </>
  );
};

export default PackageManagement;
