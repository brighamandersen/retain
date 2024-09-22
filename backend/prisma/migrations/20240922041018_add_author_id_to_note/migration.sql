/*
  Warnings:

  - Added the required column `authorId` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "authorId" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "color" TEXT,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "isTrashed" BOOLEAN NOT NULL DEFAULT false,
    "createTimestamp" INTEGER NOT NULL,
    "updateTimestamp" INTEGER NOT NULL
);
INSERT INTO "new_Note" ("color", "content", "createTimestamp", "id", "isArchived", "isPinned", "isTrashed", "title", "updateTimestamp") SELECT "color", "content", "createTimestamp", "id", "isArchived", "isPinned", "isTrashed", "title", "updateTimestamp" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
