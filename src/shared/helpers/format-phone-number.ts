export function formatPhoneNumber(phoneNumber: string) {
  const cleaned = phoneNumber.replace(/\D/g, "");

  if (cleaned.length <= 3) {
    return `${cleaned}`;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else if (cleaned.length <= 8) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 8)}-${cleaned.slice(8, 10)}`;
  }
}
