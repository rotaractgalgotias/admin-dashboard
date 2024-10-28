import { LoginPageComponent } from "@/components/login-page";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      {/* <LoginForm /> */}
      <LoginPageComponent />
    </div>
  );
}