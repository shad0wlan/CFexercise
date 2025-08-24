import { routes } from "@/lib/constants/routes";
import { RolePaths } from "@/lib/types/navigation";

const adminRoutes = [
  {
    id: 1,
    path: routes.home,
    label: "ΧΡΗΣΤΕΣ",
  },
  {
    id: 2,
    path: routes.entries,
    label: "ΚΑΤΑΧΩΡΗΣΕΙΣ",
  },
  {
    id: 3,
    path: routes.machines,
    label: "ΜΗΧΑΝΗΜΑΤΑ",
  },
  {
    id: 4,
    path: routes.productCodes,
    label: "ΚΩΔΙΚΟΙ ΠΡΟΙΟΝΤΩΝ",
  },
  {
    id: 5,
    path: routes.basicInfo,
    label: "ΠΡΟΣΘΗΚΗ ΒΑΣΙΚΩΝ ΕΠΙΛΟΓΩΝ",
  },
  {
    id: 6,
    path: routes.profile,
    label: "ΡΥΘΜΙΣΕΙΣ ΠΡΟΦΙΛ",
  },
];

const operatorRoutes = [
  {
    id: 1,
    path: routes.home,
    label: "ΚΑΤΑΧΩΡΗΣΕΙΣ",
  },
  {
    id: 2,
    path: routes.productCodes,
    label: "ΚΩΔΙΚΟΙ ΠΡΟΙΟΝΤΩΝ",
  },
  {
    id: 3,
    path: routes.basicInfo,
    label: "ΠΡΟΣΘΗΚΗ ΒΑΣΙΚΩΝ ΕΠΙΛΟΓΩΝ",
  },
  {
    id: 4,
    path: routes.profile,
    label: "ΡΥΘΜΙΣΕΙΣ ΠΡΟΦΙΛ",
  },
];

const workerRoutes = [
  {
    id: 1,
    path: routes.home,
    label: "ΚΑΤΑΧΩΡΗΣΕΙΣ",
  },
  {
    id: 2,
    path: routes.profile,
    label: "ΡΥΘΜΙΣΕΙΣ ΠΡΟΦΙΛ",
  },
];

export const rolePaths: RolePaths = {
  Admin: adminRoutes,
  Operator: operatorRoutes,
  Worker: workerRoutes,
};
