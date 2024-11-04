interface AdminCredentials {
  email: string;
  password: string;
}

export const ADMIN_CREDENTIALS: AdminCredentials[] = [
  {
    email: 'admin@neurodev.com',
    password: 'admin123!@#'
  },
  // Add more admin users as needed
];

export function validateAdminCredentials(email: string, password: string): boolean {
  return ADMIN_CREDENTIALS.some(
    admin => admin.email === email && admin.password === password
  );
} 