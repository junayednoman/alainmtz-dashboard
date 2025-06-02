import AContainer from "@/components/AContainer";
import UserTable from "../../sections/dashboard/UserTable";

const ManageRegistration = () => {
  return (
    <main>
      <AContainer>
        <UserTable limit={11} pagination />
      </AContainer>
    </main>
  );
};

export default ManageRegistration;
