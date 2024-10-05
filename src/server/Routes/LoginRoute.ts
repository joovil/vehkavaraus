import bcrypt from "bcrypt";

export const createUser = (password: string) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      throw err;
    } else {
      // Save hash
    }
  });
};

export const loginUser = (apartment: string, passwordHash: string) => {
  bcrypt.compare
}