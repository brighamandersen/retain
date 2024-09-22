import bcrypt from 'bcrypt';

/**
 * Hash and salt a password.
 * Hashing it converts it from plain text to a random string of characters.
 * Salting it adds a random string of characters to the password before hashing it so that the same password hashed twice will not be the same.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  const hashedAndSaltedPassword = await bcrypt.hash(password, salt);
  return hashedAndSaltedPassword;
}

export async function compareRawToHashedPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
