import AContainer from "@/components/AContainer";
import RegistrationTable from "../sections/dashboard/RegistrationTable";

const ManageRegistration = () => {
  return (
    <main>
      <AContainer>
        <RegistrationTable limit={10} pagination />
      </AContainer>
    </main>
  );
};

export default ManageRegistration;
