export interface RegistrationRequest {
    firstName: string;
    lastName: string;
    userName:string;
    dateOfBirth: Date|undefined;
    phoneNumber: string;
    gender: 'MALE'|"FEMALE"|undefined;
    email: string;
  }
  