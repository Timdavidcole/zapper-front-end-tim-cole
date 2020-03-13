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
  