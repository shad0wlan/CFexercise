import userRoleAction from "@/lib/actions/user/user-role-action";
import { rolePaths } from "@/lib/constants/role-paths";
import NavLink from "@/components/navigation/NavLink";

export default async function Navigation() {
  const role = await userRoleAction();
  const paths = role ? rolePaths[role] : [];
  return (
    <div className="hidden  md:flex-wrap md:z-10 md:sticky md:top-2 md:bg-white md:flex-center md:p-4 md:rounded-[20px] md:gap-x-3 xl:gap-x-16 md:mt-7 md:shadow-sm md:gap-y-3">
      {paths.map((item) => (
        <NavLink key={item.id} path={item.path} label={item.label} />
      ))}
    </div>
  );
}
