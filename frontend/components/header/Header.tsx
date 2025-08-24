import Logo from "@/components/ui/Logo";
import WelcomeName from "@/components/header/WelcomeName";
import LogoutButton from "@/components/header/LogoutButton";
import MobileNavigationContainer from "@/components/navigation/MobileNavigationContainer";
import userRoleAction from "@/lib/actions/user/user-role-action";
import { rolePaths } from "@/lib/constants/role-paths";

export default async function Header() {
  const role = await userRoleAction();
  const paths = role ? rolePaths[role] : [];
  return (
    <header className="flex items-center justify-between gap-5">
      <Logo width={200} />
      <div className="flex items-center gap-6">
        <WelcomeName />
        <LogoutButton />
        <MobileNavigationContainer paths={paths} />
      </div>
    </header>
  );
}
