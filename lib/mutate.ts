import { Car } from "./types";

const getOptimisticUpdate = (
  messageId: string,
  updateFn: (message: any) => any
) => {
  return (prevData: any) => {
    if (Array.isArray(prevData?.messageData)) {
      return {
        ...prevData,
        messageData: prevData.messageData.map((message: { id: string }) =>
          message.id === messageId ? updateFn(message) : message
        ),
      };
    }
    return prevData;
  };
};

export default getOptimisticUpdate;

const getOptimisticTableUpdate = (
  carId: string | undefined,
  updateFn: (car: Car) => Car | null
) => {
  return (prevData: any) => {
    if (Array.isArray(prevData)) {
      return prevData.filter((car: Car) => {
        const updatedCar = updateFn(car);
        return updatedCar !== null && car.id !== carId;
      });
    }
    return prevData;
  };
};

export { getOptimisticTableUpdate };
