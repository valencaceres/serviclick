export interface EmailAddress {
  id: string;
  object: string;
  email_address: string;
  reserved: boolean;
  verification: {
    status: string;
    strategy: string;
    attempts: null | number;
    expire_at: null | number;
  };
  linked_to: string[];
}

export interface User {
  id: string;
  object: string;
  username: null | string;
  first_name: string;
  last_name: string;
  gender: string;
  birthday: string;
  image_url: string;
  has_image: boolean;
  primary_email_address_id: string;
  primary_phone_number_id: null;
  primary_web3_wallet_id: null;
  password_enabled: boolean;
  two_factor_enabled: boolean;
  totp_enabled: boolean;
  backup_code_enabled: boolean;
  email_addresses: EmailAddress[];
  phone_numbers: any[];
  web3_wallets: any[];
  external_accounts: any[];
  saml_accounts: any[];
  remaining_lockout_duration_in_seconds: null | number;
  public_metadata: {
    roles: {
      admin: string;
      broker: string;
      retail: string;
      operations: string;
      serviclick: string;
    };
  };
  private_metadata: Record<string, any>;
  unsafe_metadata: Record<string, any>;
  external_id: null | string;
  last_sign_in_at: null | number;
  banned: boolean;
  locked: boolean;
  created_at: number;
  updated_at: number;
  delete_self_enabled: boolean;
  create_organization_enabled: boolean;
  profile_image_url: string;
}

export interface ApiResponse {
  success: boolean;
  data: User[];
}

export interface userResponse {
  success: boolean;
  data: User;
}
