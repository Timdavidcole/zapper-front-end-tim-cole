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

describe("isAcceptedName()", () => {
  it("should return Pending acceptance if unaccepted", () => {
    expect(isAcceptedName(members[0])).toBe("Pending acceptance");
  });
  it("should return first and last name concatenated if accepted", () => {
    expect(isAcceptedName(members[1])).toBe("Amy Namy");
  });
});

describe("isAcceptedProfilePic()", () => {
  it("should return placeholder icon if unaccepted", () => {
    expect(isAcceptedProfilePic(members[0])).toBe(
      "placeholder-profile-icon.png"
    );
  });
  it("should return the member's icon if accepted", () => {
    expect(isAcceptedProfilePic(members[1])).toBe("amy-profile-icon.png");
  });
});

describe("generateRandomMember()", () => {
  const cCat = {
    firstName: "",
    lastName: "",
    email: "c.cat@example.com",
    perms: "Standard",
    profilePicUrl: "",
    accepted: false
  };
  it("should return a Mr c.cat", () => {
    spyOn(Math, "random").and.returnValue(0.1);
    const randomPerson = generateRandomMember();
    expect(randomPerson.email).toBe(cCat.email);
  });
});
