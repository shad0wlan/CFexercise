"use client";
import { ImSwitch } from "react-icons/im";
import Text from "@/components/ui/Text";
import logoutAction from "@/app/login/_lib/actions/logout-action";
import IconWrapper from "@/components/ui/IconWrapper";

export default function LogoutButton() {
  return (
    <IconWrapper onClick={() => logoutAction(true)} icon={ImSwitch}>
      <Text as="span" className="text-xs">
        ΕΞΟΔΟΣ
      </Text>
    </IconWrapper>
  );
}
