import TabLink from "@/components/navigation/TabLink";

const entriesTabs = [
  {
    id: 1,
    path: "?status=all",
    label: "Όλες",
    defaultActive: true,
  },
  {
    id: 2,
    path: "?status=pending",
    label: "Σε εκκρεμότητα",
  },
  {
    id: 3,
    path: "?status=production",
    label: "Παραγωγή",
  },
  {
    id: 4,
    path: "?status=completed",
    label: "Ολοκληρωμένες",
  },
];

export default function EntriesTabs() {
  return (
    <div className="flex items-center gap-8 mb-5">
      {entriesTabs.map((entry) => (
        <TabLink
          key={entry.id}
          path={entry.path}
          label={entry.label}
          defaultActive={entry.defaultActive}
        />
      ))}
    </div>
  );
}
