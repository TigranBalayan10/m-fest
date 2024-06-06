export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  message:  Message;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  length: number;
  id: string;
  content: string;
  isNew: boolean;
  isArchive: boolean;
  customerId: string;
  createdAt: Date;
  updatedAt: Date;
}
