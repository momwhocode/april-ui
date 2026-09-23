/** Table sort state helpers — shared by listing pages and Storybook controlled mode. */

export const DEFAULT_USERS_SORT = { columnId: "createdOn", direction: "desc" };
export const DEFAULT_ROLES_SORT = { columnId: "lead", direction: "asc" };
export const DEFAULT_TENANTS_SORT = { columnId: "createdOn", direction: "desc" };
export const DEFAULT_PLANS_SORT = { columnId: "users", direction: "desc" };
export const DEFAULT_REPORTS_SORT = { columnId: "dueDate", direction: "desc" };
export const DEFAULT_BILLING_SORT = { columnId: "createdOn", direction: "desc" };
export const DEFAULT_INQUIRIES_SORT = { columnId: "createdOn", direction: "desc" };
export const DEFAULT_TENANT_DETAIL_ACTIVITY_SORT = { columnId: "occurredAt", direction: "desc" };

export function isSortableColumn(column) {
  return Boolean(column?.sortable || column?.kind === "sortable-header");
}

export function nextSortState(current, columnId) {
  if (current.columnId !== columnId) {
    return { columnId, direction: "desc" };
  }

  return {
    columnId,
    direction: current.direction === "desc" ? "asc" : "desc",
  };
}

export function applySortToColumns(columns = [], sort = DEFAULT_USERS_SORT) {
  return columns.map((column) => ({
    ...column,
    sortActive: column.id === sort.columnId,
    sortDirection: column.id === sort.columnId ? sort.direction : undefined,
  }));
}

function compareValues(left, right) {
  if (left == null && right == null) return 0;
  if (left == null || left === "—") return 1;
  if (right == null || right === "—") return -1;

  if (typeof left === "string" && typeof right === "string") {
    return left.localeCompare(right, undefined, { sensitivity: "base" });
  }

  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

function sortValueForUser(user, columnId) {
  switch (columnId) {
    case "lead":
      return user.name;
    case "email":
      return user.email;
    case "status":
      return user.statusKey ?? user.status?.toLowerCase();
    case "role":
      return user.roleKey ?? user.role;
    case "program":
      return user.program;
    case "createdOn":
      return user.createdOn;
    case "dateJoined":
      return user.dateJoined;
    case "lastActive":
      return user.lastActive;
    default:
      return "";
  }
}

export function sortUsersLocally(users = [], sort = DEFAULT_USERS_SORT) {
  const sorted = [...users].sort((left, right) => {
    const comparison = compareValues(
      sortValueForUser(left, sort.columnId),
      sortValueForUser(right, sort.columnId)
    );
    return sort.direction === "desc" ? -comparison : comparison;
  });

  return sorted;
}

function sortValueForRole(role, columnId) {
  switch (columnId) {
    case "lead":
      return role.name;
    case "createdOn":
      return role.createdAt ?? role.createdOn;
    default:
      return "";
  }
}

export function sortRolesLocally(roles = [], sort = DEFAULT_ROLES_SORT) {
  const sorted = [...roles].sort((left, right) => {
    const comparison = compareValues(
      sortValueForRole(left, sort.columnId),
      sortValueForRole(right, sort.columnId)
    );
    return sort.direction === "desc" ? -comparison : comparison;
  });

  return sorted;
}

function sortValueForTenant(tenant, columnId) {
  switch (columnId) {
    case "tenant":
      return tenant.name;
    case "domain":
      return tenant.domain;
    case "plan":
      return tenant.plan;
    case "status":
      return tenant.status;
    case "users":
      return tenant.usersCount ?? (Number.parseInt(tenant.users, 10) || 0);
    case "spaces":
      return tenant.spacesCount ?? (Number.parseInt(tenant.spaces, 10) || 0);
    case "courses":
      return tenant.coursesCount ?? (Number.parseInt(tenant.courses, 10) || 0);
    case "invoice":
      return tenant.invoice;
    case "mrr":
      return tenant.mrr;
    case "lastActive":
      return tenant.lastActive;
    case "createdOn":
      return tenant.createdOn;
    case "createdBy":
      return tenant.createdBy;
    default:
      return "";
  }
}

export function sortTenantsLocally(tenants = [], sort = DEFAULT_TENANTS_SORT) {
  const sorted = [...tenants].sort((left, right) => {
    const comparison = compareValues(
      sortValueForTenant(left, sort.columnId),
      sortValueForTenant(right, sort.columnId)
    );
    return sort.direction === "desc" ? -comparison : comparison;
  });

  return sorted;
}

function sortValueForPlan(plan, columnId) {
  switch (columnId) {
    case "title":
      return plan.title?.toLowerCase() ?? "";
    case "key":
      return plan.key;
    case "mrr":
      return plan.mrrSort ?? 0;
    case "tenantsCount":
      return plan.tenantsCountSort ?? 0;
    case "users":
      return plan.usersSort ?? 0;
    case "adminAccounts":
      return plan.adminAccountsSort ?? 0;
    case "spaces":
      return plan.spacesSort ?? 0;
    case "courses":
      return plan.coursesSort ?? 0;
    case "storage":
      return plan.storageSort ?? 0;
    case "whatsappSms":
      return plan.whatsappSmsSort ?? 0;
    case "customDomain":
      return plan.customDomainSort ?? 0;
    case "status":
      return plan.statusSort ?? plan.status;
    default:
      return "";
  }
}

export function sortPlansLocally(plans = [], sort = DEFAULT_PLANS_SORT) {
  const sorted = [...plans].sort((left, right) => {
    const comparison = compareValues(
      sortValueForPlan(left, sort.columnId),
      sortValueForPlan(right, sort.columnId)
    );
    return sort.direction === "desc" ? -comparison : comparison;
  });

  return sorted;
}

function sortValueForReport(row, columnId) {
  const sortKey = `${columnId}Sort`;
  if (row[sortKey] != null) return row[sortKey];
  switch (columnId) {
    case "invoiceId":
    case "tenant":
      return row[columnId]?.toLowerCase() ?? "";
    case "name": {
      const person = row.name;
      if (person && typeof person === "object") return person.name?.toLowerCase?.() ?? "";
      return typeof person === "string" ? person.toLowerCase() : "";
    }
    case "status":
      return row.status ?? "";
    case "dueDate":
      return row.dueDateSort ?? row.dueDate ?? "";
    case "paymentDate":
      return row.paymentDateSort ?? row.paymentDate ?? "";
    case "invoiceDate":
      return row.invoiceDateSort ?? row.invoiceDate ?? "";
    case "taxPeriod":
      return row.taxPeriodSort ?? row.taxPeriod ?? "";
    case "outstandingAmount":
      return row.outstandingAmountSort ?? 0;
    case "amountDue":
      return row.amountDueSort ?? 0;
    case "amount":
      return row.amountSort ?? 0;
    case "totalInvoice":
      return row.totalInvoiceSort ?? 0;
    case "netGstLiability":
      return row.netGstLiabilitySort ?? 0;
    default: {
      const value = row[columnId];
      if (value && typeof value === "object") return value.name?.toLowerCase?.() ?? "";
      return value?.toLowerCase?.() ?? value ?? "";
    }
  }
}

export function sortReportsLocally(rows = [], sort = DEFAULT_REPORTS_SORT) {
  const sorted = [...rows].sort((left, right) => {
    const comparison = compareValues(
      sortValueForReport(left, sort.columnId),
      sortValueForReport(right, sort.columnId)
    );
    return sort.direction === "desc" ? -comparison : comparison;
  });

  return sorted;
}

function sortValueForInvoice(row, columnId) {
  const sortKey = `${columnId}Sort`;
  if (row[sortKey] != null) return row[sortKey];
  switch (columnId) {
    case "invoiceId":
      return row.invoiceId?.toLowerCase() ?? "";
    case "status":
      return row.status ?? "";
    case "tenant":
      return row.name?.toLowerCase() ?? row.tenant?.toLowerCase() ?? "";
    case "plan":
      return row.plan ?? "";
    case "amount":
      return row.amountSort ?? row.amount ?? 0;
    case "paymentMethod":
      return row.paymentMethod ?? "";
    case "usagePeriod":
      return row.usagePeriod ?? "";
    case "dueDate":
      return row.dueDateSort ?? row.dueDate ?? "";
    case "createdOn":
      return row.createdOnSort ?? row.createdOn ?? "";
    default:
      return row[columnId]?.toLowerCase?.() ?? row[columnId] ?? "";
  }
}

export function sortBillingLocally(rows = [], sort = DEFAULT_BILLING_SORT) {
  const sorted = [...rows].sort((left, right) => {
    const comparison = compareValues(
      sortValueForInvoice(left, sort.columnId),
      sortValueForInvoice(right, sort.columnId)
    );
    return sort.direction === "desc" ? -comparison : comparison;
  });

  return sorted;
}
