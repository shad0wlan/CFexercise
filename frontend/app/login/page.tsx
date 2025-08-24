import Logo from "@/components/ui/Logo";
import LoginForm from "@/app/login/_components/LoginForm";
import Text from "@/components/ui/Text";

export default function Login() {
  return (
    <section className="flex-center flex-col section ">
      <Logo />
      <Text as="h1" isTitle className="my-10 text-4xl">
        <span className="text-secondary">Είσοδος</span> στον λογαριασμό σας
      </Text>
      <LoginForm />
    </section>
  );
}
