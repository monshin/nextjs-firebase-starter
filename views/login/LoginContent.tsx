import ButtonFacebook from "@/components/login/button/ButtonFacebook";
import ButtonGoogle from "@/components/login/button/ButtonGoogle";

export default function LoginContent() {
  return (
    <div className="p-4 border text-center">
      <h1 className="text-3xl font-bold">登入</h1>
      <div className="flex flex-col gap-3">
        <ButtonGoogle />
        <ButtonFacebook />
      </div>
    </div>
  );
}
