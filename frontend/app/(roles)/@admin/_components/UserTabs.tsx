import TabLink from "@/components/navigation/TabLink";

const userTabs = [
  {
    id: 1,
    path: "?role=admin",
    label: "Διαχειριστές",
    defaultActive: true,
  },
  {
    id: 2,
    path: "?role=operator",
    label: "Χειριστές Μηχανής",
  },
  {
    id: 3,
    path: "?role=worker",
    label: "Καταχωρητές",
  },
];

export default function UserTabs() {
  return (
    <div className="flex items-center gap-8 mb-5">
      {userTabs.map((tab) => (
        <TabLink
          key={tab.id}
          path={tab.path}
          label={tab.label}
          defaultActive={tab.defaultActive}
        />
      ))}
    </div>
  );
}
