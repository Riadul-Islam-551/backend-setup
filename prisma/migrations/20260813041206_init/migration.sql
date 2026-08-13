-- CreateTable
CREATE TABLE "secondUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "secondUser_email_key" ON "secondUser"("email");
