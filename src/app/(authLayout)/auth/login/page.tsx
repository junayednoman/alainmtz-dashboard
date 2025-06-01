import Image from "next/image";
import LoginForm from "./LoginForm";
import flower from "@/assets/flower.png";

const Login = () => {
  return (
    <main className="w-[80%] mx-auto flex flex-col items-center justify-center">
      <div className="flex items-center gap-44 justify-between h-fit">
        <div>
          <Image src={flower} alt="logo" width={280} height={280} />
        </div>
        <div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default Login;
