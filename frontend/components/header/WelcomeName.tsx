import Text from "@/components/ui/Text";
import getUserAction from "@/lib/actions/user/get-user-action";

export default async function WelcomeName() {
  const user = await getUserAction();

  return (
    <div className="hidden sm:relative sm:z-20 sm:flex sm:items-center sm:gap-2 text-lg sm:text-2xl">
      <Text isTitle className="text-secondary">
        Welcome
      </Text>
      <Text isTitle>{user?.firstName}</Text>
    </div>
  );
}
