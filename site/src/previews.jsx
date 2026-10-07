import { useMemo, useState } from "react";
import {
  Alert,
  Button,
  DatePickerInput,
  FilterChipsHeader,
  FormSelectField,
  MenuDropdown,
  Modal,
  PlanCardPicker,
  Table,
  TablePagination,
  Tabs,
  TextareaInput,
  TextInput,
} from "april-ui";
import { TABLE_COLUMNS, TABLE_ROWS } from "../../src/fixtures/table.js";

export const pieces = [
  "Button",
  "Input",
  "Menu",
  "Dialog",
  "Table",
  "Tabs",
  "Alert",
  "Filters",
  "Date",
  "Plans",
];

const widePieces = new Set(["Button", "Input", "Table", "Tabs", "Alert", "Filters", "Plans"]);

export function isWidePiece(piece) {
  return widePieces.has(piece);
}

const buttonVariants = [
  ["primary", "Primary"],
  ["secondary", "Secondary"],
  ["outlined", "Outlined"],
  ["ghost", "Ghost"],
  ["destructive", "Destructive"],
  ["link", "Link"],
];

const buttonSizes = ["xs", "sm", "md", "lg", "xl"];

function ButtonPreview() {
  return (
    <div className="landing__detail">
      <div className="landing__stage">
        {buttonVariants.map(([variant, label]) => (
          <Button key={variant} label={label} variant={variant} leadingIcon={false} trailingIcon={false} />
        ))}
      </div>
      <div className="landing__stage">
        {buttonSizes.map((size) => (
          <Button key={size} label={size.toUpperCase()} size={size} leadingIcon={false} trailingIcon={false} />
        ))}
      </div>
      <div className="landing__stage">
        <Button label="With icon" leadingIcon leadingIconName="add" trailingIcon trailingIconName="arrow_forward" />
        <Button label="Loading" loading leadingIcon={false} trailingIcon={false} />
        <Button label="Disabled" disabled leadingIcon={false} trailingIcon={false} />
      </div>
    </div>
  );
}

function InputPreview() {
  const [name, setName] = useState("Ada Lovelace");
  const [notes, setNotes] = useState("Design system notes");
  const [status, setStatus] = useState("Active");

  return (
    <div className="landing__detail">
      <TextInput
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Ada Lovelace"
        description="Shown on the profile."
        showDescription
        showRequired
        required
        leadingIcon
        leadingIconName="person"
        fullWidth
      />
      <TextareaInput
        label="Notes"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        description="Optional context for the team."
        showDescription
        maxLength={120}
        rows={3}
        fullWidth
      />
      <FormSelectField
        id="landing-status"
        label="Status"
        showLabel
        value={status}
        onChange={setStatus}
        placeholder="Select a status"
        leadingIcon={false}
        fullWidth
        options={[
          { value: "Active", label: "Active" },
          { value: "Draft", label: "Draft" },
          { value: "Waiting", label: "Waiting" },
        ]}
      />
    </div>
  );
}

const menuItem = {
  showLeadingIcon: false,
  showBadge: false,
  showLeadingSelector: false,
  showAvatar: false,
  showTrailingShortcut: false,
  showTrailingTag: false,
  showTrailingSelector: false,
  showTrailingIcon: false,
};

const menuItems = [
  { ...menuItem, label: "Edit", leadingIconName: "edit", showLeadingIcon: true, shortcut: "⌘E", showTrailingShortcut: true },
  {
    ...menuItem,
    label: "Duplicate",
    leadingIconName: "content_copy",
    showLeadingIcon: true,
    showBadge: true,
    showTrailingTag: true,
    tagLabel: "New",
    tagType: "info",
  },
  { ...menuItem, label: "Pin", showLeadingSelector: true, selectorType: "checkbox", selected: true },
  { ...menuItem, label: "Delete", leadingIconName: "delete", showLeadingIcon: true, destructive: true },
];

function MenuPreview() {
  return <MenuDropdown id="landing-menu" items={menuItems} />;
}

function DialogPreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Open dialog" leadingIcon={false} trailingIcon={false} onClick={() => setOpen(true)} />
      {open ? (
        <Modal
          title="Save changes"
          description="Keep this draft, or discard it."
          showConfirmInput={false}
          cancel="Cancel"
          confirm="Save"
          confirmVariant="primary"
          onCancel={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}

const PER_PAGE = 4;

const statusOptions = ["New", "Active", "Waiting", "Done"].map((label) => ({ value: label, label }));
const categoryOptions = ["Design", "Research", "Support"].map((label) => ({ value: label, label }));

function TablePreview() {
  const [rows, setRows] = useState(TABLE_ROWS);
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ status: [], category: [] });
  const [sort, setSort] = useState({ id: "category", direction: "desc" });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(() => new Set(TABLE_ROWS.filter((row) => row.selected).map((row) => row.email)));
  const [visibleIds, setVisibleIds] = useState(() => TABLE_COLUMNS.map((column) => column.id));

  const columns = useMemo(
    () =>
      TABLE_COLUMNS.filter((column) => visibleIds.includes(column.id)).map((column) => ({
        ...column,
        showAvatar: column.id === "name" ? true : column.showAvatar,
        sortable: column.id === "name" || column.id === "category" || column.id === "createdOn" || column.sortable,
        sortActive: sort.id === column.id,
        sortDirection: sort.id === column.id ? sort.direction : "desc",
      })),
    [sort, visibleIds],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (needle && !`${row.name} ${row.email} ${row.category}`.toLowerCase().includes(needle)) return false;
      if (filters.status.length && !filters.status.includes(row.status)) return false;
      if (filters.category.length && !filters.category.includes(row.category)) return false;
      return true;
    });
  }, [filters, query, rows]);

  const sorted = useMemo(() => {
    const next = [...filtered];
    next.sort((left, right) => {
      const a = String(left[sort.id] ?? "");
      const b = String(right[sort.id] ?? "");
      const compared = a.localeCompare(b);
      return sort.direction === "asc" ? compared : -compared;
    });
    return next;
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageRows = sorted.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);
  const pageIds = pageRows.map((row) => row.email);
  const allSelected = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const someSelected = pageIds.some((id) => selected.has(id));

  const toggleColumn = (id) => {
    setVisibleIds((current) => {
      const dataIds = TABLE_COLUMNS.map((column) => column.id);
      if (id === "all") {
        const allOn = dataIds.every((columnId) => current.includes(columnId));
        return allOn ? ["select", "actions"] : dataIds;
      }
      return current.includes(id) ? current.filter((columnId) => columnId !== id) : [...current, id];
    });
  };

  const handleRowAction = (action, row) => {
    if (action === "delete") {
      setRows((current) => current.filter((item) => item.email !== row.email));
      setSelected((current) => {
        const next = new Set(current);
        next.delete(row.email);
        return next;
      });
      setNotice(`Deleted ${row.name}`);
      return;
    }
    if (action === "duplicate") {
      const copy = {
        ...row,
        name: `${row.name} copy`,
        email: row.email.replace("@", `+${Date.now()}@`),
        selected: false,
      };
      setRows((current) => [copy, ...current]);
      setPage(1);
      setNotice(`Duplicated ${row.name}`);
      return;
    }
    setNotice(`Editing ${row.name}`);
  };

  return (
    <div className="landing__table-block">
      {notice ? <p className="landing__notice april-text-style april-text-style--text-sm-regular">{notice}</p> : null}
      <FilterChipsHeader
        id="landing-table-filters"
        searchPlaceholder="Search name or email"
        searchValue={query}
        onSearchChange={(value) => {
          setQuery(value);
          setPage(1);
        }}
        chips={[
          { filterLabel: "Status", filterKey: "status", dropdownOptions: statusOptions },
          { filterLabel: "Category", filterKey: "category", dropdownOptions: categoryOptions },
        ]}
        filterValues={filters}
        onFilterChange={(key, value) => {
          setFilters((current) => ({ ...current, [key]: value }));
          setPage(1);
        }}
        onClearAll={() => {
          setFilters({ status: [], category: [] });
          setQuery("");
          setPage(1);
        }}
        columnOptions={TABLE_COLUMNS.filter((column) => column.label).map((column) => ({
          id: column.id,
          label: column.label,
        }))}
        visibleColumnIds={visibleIds}
        onColumnToggle={toggleColumn}
      />
      <div className="landing__table">
        <Table
          columns={columns}
          rows={pageRows}
          getRowId={(row) => row.email}
          onLeadClick={(row) => {
            setNotice(`Opened ${row.name}`);
            setSelected(new Set([row.email]));
          }}
          onRowAction={handleRowAction}
          onSort={(id) => {
            setSort((current) =>
              current.id === id
                ? { id, direction: current.direction === "asc" ? "desc" : "asc" }
                : { id, direction: "asc" },
            );
          }}
          selection={{
            allSelected,
            someSelected,
            isSelected: (id) => selected.has(id),
            onToggleAll: (checked) => {
              setSelected((current) => {
                const next = new Set(current);
                pageIds.forEach((id) => (checked ? next.add(id) : next.delete(id)));
                return next;
              });
            },
            onToggleRow: (id) => {
              setSelected((current) => {
                const next = new Set(current);
                if (next.has(id)) next.delete(id);
                else next.add(id);
                return next;
              });
            },
          }}
        />
      </div>
      <TablePagination
        page={safePage}
        totalPages={totalPages}
        totalCount={sorted.length}
        perPage={PER_PAGE}
        onPageChange={setPage}
      />
    </div>
  );
}

const pageTabs = [
  { label: "Overview", icon: "dashboard", body: "Usage, status, and the latest release." },
  { label: "Activity", icon: "history", body: "Recent edits from the team." },
  { label: "Members", icon: "group", body: "People with access to this workspace." },
  { label: "Settings", icon: "settings", body: "Theme, language, and notifications." },
  { label: "Billing", icon: "credit_card", body: "Plan, invoices, and payment method." },
  { label: "Security", icon: "lock", body: "Sessions and sign-in methods." },
];

function TabsPreview() {
  const [index, setIndex] = useState(0);
  const selected = pageTabs[index] ?? pageTabs[0];
  return (
    <div className="landing__detail">
      <Tabs id="landing-tabs" tabs={pageTabs} activeIndex={index} onTabChange={setIndex} />
      <div id="landing-tabs-panel" role="tabpanel" className="landing__panel">
        <p className="april-text-style april-text-style--text-sm-regular">{selected.body}</p>
      </div>
    </div>
  );
}

const initialAlerts = [
  { color: "green", title: "Changes saved", description: "The draft is up to date." },
  { color: "blue", title: "Review ready", description: "Two comments are waiting." },
  { color: "yellow", title: "Unsaved edits", description: "Leave this page to discard them." },
  { color: "red", title: "Could not save", description: "Check the required fields." },
];

function AlertPreview() {
  const [alerts, setAlerts] = useState(initialAlerts);
  if (!alerts.length) {
    return (
      <Button
        label="Show alerts"
        leadingIcon={false}
        trailingIcon={false}
        onClick={() => setAlerts(initialAlerts)}
      />
    );
  }
  return (
    <div className="landing__detail">
      {alerts.map((alert) => (
        <Alert
          key={alert.title}
          color={alert.color}
          title={alert.title}
          description={alert.description}
          showButtons={false}
          onDismiss={() => setAlerts((current) => current.filter((item) => item.title !== alert.title))}
        />
      ))}
    </div>
  );
}

function FiltersPreview() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ status: [], owner: [] });
  return (
    <FilterChipsHeader
      id="landing-filters"
      searchPlaceholder="Search"
      searchValue={query}
      onSearchChange={setQuery}
      chips={[
        {
          filterLabel: "Status",
          filterKey: "status",
          dropdownOptions: [
            { value: "Active", label: "Active" },
            { value: "Draft", label: "Draft" },
            { value: "Archived", label: "Archived" },
          ],
        },
        {
          filterLabel: "Owner",
          filterKey: "owner",
          dropdownOptions: [
            { value: "Alex Morgan", label: "Alex Morgan" },
            { value: "Jordan Lee", label: "Jordan Lee" },
          ],
        },
      ]}
      filterValues={filters}
      onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
      onClearAll={() => {
        setFilters({ status: [], owner: [] });
        setQuery("");
      }}
      showColumnsButton={false}
    />
  );
}

function DatePreview() {
  const [value, setValue] = useState("2026-05-25");
  return (
    <DatePickerInput
      label="Start date"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      showDescription
      description="Used as the first day in the range."
      showRequired
      fullWidth
    />
  );
}

const plans = [
  { id: "trial", title: "Trial", badge: "Trial", price: "Free", priceUnit: "/ month", description: "Try the product before you choose a plan." },
  { id: "base", title: "Base", price: "$12", priceUnit: "/ month", description: "The essentials for a small team." },
  { id: "pro", title: "Pro", price: "$29", priceUnit: "/ month", description: "Higher limits and priority support." },
];

function PlansPreview() {
  const [value, setValue] = useState("base");
  return <PlanCardPicker plans={plans} value={value} onChange={setValue} />;
}

export function ComponentStage({ piece }) {
  if (piece === "Input") return <InputPreview />;
  if (piece === "Menu") return <MenuPreview />;
  if (piece === "Dialog") return <DialogPreview />;
  if (piece === "Table") return <TablePreview />;
  if (piece === "Tabs") return <TabsPreview />;
  if (piece === "Alert") return <AlertPreview />;
  if (piece === "Filters") return <FiltersPreview />;
  if (piece === "Date") return <DatePreview />;
  if (piece === "Plans") return <PlansPreview />;
  return <ButtonPreview />;
}
