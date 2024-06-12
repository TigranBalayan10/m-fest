import { Car } from "../types";


export interface FinancingDataTypes {
    id: string;
    personalId: string;
    contactId: string;
    createdAt: string;
    updatedAt: string;
    isNew: boolean;
    isArchive: boolean;
    personal: {
      id: string;
      firstName: string;
      middleName: string | null;
      lastName: string;
      ssnItin: string;
      dob: string;
    };
    contact: {
      id: string;
      phone: string;
      email: string;
      address: string;
      city: string;
      state: string;
      zip: string;
    };
    car: Car;
  }