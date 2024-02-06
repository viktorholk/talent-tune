export function validateEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  if (email !== "" && email.match(regex)) {
    return true;
  }
  return false;
}
