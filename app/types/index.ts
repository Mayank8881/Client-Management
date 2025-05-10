export interface Client {
    _id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    status: 'active' | 'inactive';
    type: 'individual' | 'company';
  }
  
  export interface SortCriterion {
    field: keyof Client;
    direction: 'asc' | 'desc';
  }