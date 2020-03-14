const isAcceptedName = member => {
  return member.accepted
    ? `${member["firstName"]} ${member["lastName"]}`
    : "Pending acceptance";
};

const isAcceptedProfilePic = member => {
  return member.accepted
    ? member.profilePicUrl
    : "placeholder-profile-icon.png";
};

const generateRandomMember = () => {
  const generateRandomAnimal = () => {
    const animals = ["cat", "platypus", "giraffe", "lion", "beetle", "pelican"];
    return animals[Math.floor(Math.random() * animals.length)];
  };
  const generateRandomLetter = () => {
    var characters = "abcdefghijklmnopqrstuvwxyz";
    return characters.charAt(
        Math.floor(Math.random() * characters.length));
  };

  return {
    firstName: "",
    lastName: "",
    email: `${generateRandomLetter()}.${generateRandomAnimal()}@example.com`,
    perms: "Standard",
    profilePicUrl: "",
    accepted: false
  };
};
