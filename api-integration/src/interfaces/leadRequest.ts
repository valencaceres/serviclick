interface Beneficiary {
    rut: string;
    name: string;
    paternalLastName: string;
    maternalLastName: string;
    address: string;
    district_id: string;
    email: string;
    phone: string;
    birthDate: string;
    relationship_id: string; 
  }
  
  interface Value {
    name: string;
    value: string;
  }
  
  interface Holder {
    rut:string
    name: string;
    paternalLastName: string;
    maternalLastName: string;
    address: string;
    district_id: string; 
    email: string;
    phone: string;
    birthDate: string; 
  }
  
  export  interface UpsertRequest {
    product_id: string; 
    holder: Holder;
    beneficiaries: Beneficiary[] | null;
    values: Value[];
    agent_id: string;
  }