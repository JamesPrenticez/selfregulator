-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "profilePicture" TEXT,
    "locale" TEXT,
    "country" TEXT,
    "permissions" TEXT,
    "subscription" TEXT,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastModified" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "someData" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Test_someData_key" ON "Test"("someData");
