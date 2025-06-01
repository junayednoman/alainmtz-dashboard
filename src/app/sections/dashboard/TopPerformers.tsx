import Image from "next/image";
import panda from "@/assets/panda.png";
import one from "@/assets/1.png";
import two from "@/assets/2.png";
import three from "@/assets/3.png";

const TopPerformers = () => {
  return (
    <div className="rounded-xl p-6 bg-card text-center text-primary-foreground">
      <h5 className="font-bold text-xl">Top Performer of the Month</h5>

      <div className="mt-6">
        <div className="text-center">
          <Image
            src={panda}
            alt="avatar"
            width={85}
            height={85}
            className="rounded-full border-3 border-primary mx-auto"
          />
          <Image
            src={one}
            alt="avatar"
            width={42}
            height={42}
            className="rounded-full mx-auto -mt-4"
          />

          <h5 className="font-semibold mt-4">John Doe</h5>
          <p>
            <span className="font-medium text-foreground">Accounts:</span> 22
          </p>
          <p>
            <span className="font-medium text-foreground">Amount:</span> $22
          </p>
        </div>
        <div className="flex items-center gap-5 justify-between mt-6 mx-16">
          <div className="text-center">
            <Image
              src={panda}
              alt="avatar"
              width={70}
              height={70}
              className="rounded-full border-3 border-primary mx-auto"
            />
            <Image
              src={two}
              alt="avatar"
              width={35}
              height={35}
              className="rounded-full mx-auto -mt-4"
            />
            <h5 className="font-semibold mt-4">John Doe</h5>
            <p>
              <span className="font-medium text-foreground">Accounts:</span> 22
            </p>
            <p>
              <span className="font-medium text-foreground">Amount:</span> $22
            </p>
          </div>
          <div className="text-center">
            <Image
              src={panda}
              alt="avatar"
              width={70}
              height={70}
              className="rounded-full border-3 border-primary mx-auto"
            />
            <Image
              src={three}
              alt="avatar"
              width={35}
              height={35}
              className="rounded-full mx-auto -mt-4"
            />
            <h5 className="font-semibold mt-4">John Doe</h5>
            <p>
              <span className="font-medium text-foreground">Accounts:</span> 22
            </p>
            <p>
              <span className="font-medium text-foreground">Amount:</span> $22
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPerformers;
