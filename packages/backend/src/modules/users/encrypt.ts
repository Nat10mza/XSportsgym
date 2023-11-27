import crypto from "crypto";

const iterations = 100;
const keylen = 64;
const digest = "sha512";

export async function encryptPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      iterations,
      keylen,
      digest,
      (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          const hashedPassword = derivedKey.toString("hex");
          resolve(hashedPassword + "/" + salt);
        }
      }
    );
  });
}

export function comparePassword(
  password_from_db: string,
  enteredPassword: string
) {
  const dividedPassDb = password_from_db.split("/");
  const hashedPassword = dividedPassDb[0];
  const salt = dividedPassDb[1];

  return new Promise<boolean>((resolve, reject) => {
    crypto.pbkdf2(
      enteredPassword,
      salt,
      iterations,
      keylen,
      digest,
      (err, derivedKey) => {
        if (err) {
          reject(err);
        }
        const hashedEnteredPassword = derivedKey.toString("hex");
        if (hashedEnteredPassword === hashedPassword) {
          resolve(true);
        } else {
          resolve(false);
          console.log("Contraseña incorrecta");
        }
      }
    );
  });
}
