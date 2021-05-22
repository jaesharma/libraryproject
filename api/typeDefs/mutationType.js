import { gql } from "apollo-server-express";

const mutationType = gql`
  type Mutation {
    registerAsLibrary(input: libraryRegistrationInput!): Boolean!
    registerAsUser(input: userRegistrationInput!): Boolean!

    loginAsUser(identity: String!, password: String!): LoginResponse!
    loginAsLibrary(identity: String!, password: String!): LoginResponse!
    loginAsStaff(identity: String!, password: String!): LoginResponse!

    addStaffMember(input: addStaffMemberInput!): AddStaffResponse!
    removeStaffMember(alias: String!, password: String!): Boolean!

    # createAuthor(input: createAuthorInput): Author!
    # createBook(input: createBookInput): Book!
    # createBooklist(input: createBooklistInput): Booklist!
    # addBookToBooklist(bookId: ID!, booklistId: ID!): Booklist!
    # removeBookFromBooklist(booklistId: ID!, bookId: ID!): Booklist!
    # deleteBooklist(booklistId: ID!): Boolean!
    # createBookClub(input: createBookClubInput!): BookClub!
    # addBookByAuthor(input: addBookByAuthorInput!): Boolean!
    # deleteAuthor(input: deleteAuthorInput!): Boolean!
    # followUser(username: String!): Boolean!
    # unfollowUser(username: String!): Boolean!
    # cancelFollowRequest(username: String!): Boolean!
    # acceptFollowRequest(username: String!): Boolean!
    # addBookToDatabase(input: addBookToDatabaseInput!): Entry!
    # removeBookEntry(entryId: ID!): String!
    # removeCopyFromEntry(index: Int!, bookId: ID!): Entry!
    # addBookReview(input: addBookReviewInput!): Review!
    # deleteBookReview(bookId: String!, reviewId: String!): Boolean!
    # editBookReview(input: editBookReviewInput!): Review!
    logout: String!
    logoutFromAll: String!
    # updateLibraryInfo(input: updateLibraryInfoInput!): Library!
    # updateUserInfo(input: updateUserInfoInput!): User!
    # createMembershipPlan(
    #   input: createMembershipPlanInput!
    # ): LibraryMembershipPlan!
    # deleteMembershipPlan(title: String!): Boolean!
    # setIdentificationMethod(
    #   is_required: Boolean!
    #   identification_type: IDMethod
    # ): Boolean!
    # setProfilePicture(file: Upload!): String!
    # setLibraryLogo(logo: Upload!): String!
    # membershipRenewRequest(libraryName: String!, note: String): Boolean!
    # cancelMembershipRenewRequest(libraryName: String!): Boolean!
    # joinLibraryRequest(input: joinLibraryInput!): Boolean!
    # joinRequestAction(
    #   userId: ID!
    #   accept: Boolean!
    #   membership_plan: String
    # ): Boolean!
    # removeMemberFromLibrary(userId: ID!): Boolean!
    # renewMembership(userId: ID!, membership: String!): LibraryMember!
    # addAudioBook(bookId: ID!, audioBook: Upload!): String!
    # addEbook(bookId: ID!, ebook: Upload!): String!
    # updateBookEntry(input: updateBookEntryInput!): Entry!
    # issueBook(input: issueBookInput!): IssueBookResponse!
  }
`;

module.exports = {
  mutationType,
};
