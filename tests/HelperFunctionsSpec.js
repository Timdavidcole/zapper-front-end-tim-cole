describe("isAcceptedName()", () => {
  const members = [
    {
      firstName: "",
      lastName: "",
      email: "j.dog@example.com",
      perms: "standard",
      profilePicUrl: "",
      accepted: false
    },
    {
      firstName: "Amy",
      lastName: "Namy",
      email: "a.namy@example.com",
      perms: "standard",
      profilePicUrl: "amy-profile-icon.png",
      accepted: true
    }
  ];
  it("should return Pending acceptance if unaccepted", () => {
    expect(isAcceptedName(members[0])).toBe("Pending acceptance");
  });
  it("should return first and last name concatenated if accepted", () => {
    expect(isAcceptedName(members[1])).toBe("Amy Namy");
  });
});
