import InputForm from "@/components/DashboardForm/inputForm";

const AddInventory = () => {
  return (
    <div className="container mx-auto px-4 sm:px-0 p-4 flex flex-col gap-4 items-center justify-center">
      <InputForm mode="add" />
    </div>
  );
};

export default AddInventory;
