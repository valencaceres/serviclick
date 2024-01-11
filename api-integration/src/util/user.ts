const generateGenericPassword = () => {
  let password = "";
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!$_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i <= 8; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
};

export { generateGenericPassword };
