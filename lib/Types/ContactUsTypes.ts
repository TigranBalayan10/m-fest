export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  contacts?: Contact;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contact {
  id: string;
  message: string;
  isNew: boolean;
  isArchive: boolean;
  customerId: string;
  customer: Customer;
  createdAt: Date;
  updatedAt: Date;
}
