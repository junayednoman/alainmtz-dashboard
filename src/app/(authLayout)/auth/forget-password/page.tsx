import Image from "next/image";
import flower from "@/assets/flower.png";
import ForgetPasswordForm from "./ForgetPasswordForm";

const ForgetPassword = () => {
  return (
    <main className="w-[80%] mx-auto flex flex-col items-center justify-center">
      <div className="flex items-center gap-44 justify-between h-fit">
        <div>
          <Image src={flower} alt="logo" width={280} height={280} />
        </div>
        <div>
          <ForgetPasswordForm />
        </div>
      </div>
    </main>
  );
};

export default ForgetPassword;
