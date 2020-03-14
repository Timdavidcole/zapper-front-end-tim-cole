const isAcceptedName = (member: Member) => {
  return member.accepted
    ? `${member["firstName"]} ${member["lastName"]}`
    : "Pending acceptance";
};

const isAcceptedProfilePic = (member: Member) => {
  return member.accepted
    ? member.profilePicUrl
    : "placeholder-profile-icon.png";
};

const generateRandomMember = () => {
  const generateRandomAnimal = () => {
    const animals: Array<string> = ["cat", "platypus", "giraffe", "lion", "beetle", "pelican"];
    return animals[Math.floor(Math.random() * animals.length)];
  };
  const generateRandomLetter = () => {
    var characters: string = "abcdefghijklmnopqrstuvwxyz";
    return characters.charAt(Math.floor(Math.random() * characters.length));
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
