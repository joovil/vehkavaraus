import bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      throw err;
    }

    return hash;
  });
};

export const loginUser = (apartment: string, passwordHash: string) => {
  bcrypt.compare;
};
