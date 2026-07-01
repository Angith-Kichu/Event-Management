const UserRoles = Object.freeze({
    SUPER_ADMIN: "SUPER_ADMIN",
    ADMIN: "ADMIN",
    ORGANIZER: "ORGANIZER",
    USER: "USER",
});

const PublicUserFields = [
    "id",
    "name",
    "email",
    "role",
    "profile_image",
    "created_at",
    "updated_at",
];

export { UserRoles, PublicUserFields };