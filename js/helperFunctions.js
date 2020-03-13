const isAcceptedName = member => {
  return member.accepted
    ? `${member["firstName"]} ${member["lastName"]}`
    : "Pending acceptance";
};
