-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "createTimestamp" INTEGER NOT NULL,
    "updateTimestamp" INTEGER NOT NULL
);
