export interface IRepairman {
  id: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    avatarUrl: string;
    phoneNumber: string;
  };
}
