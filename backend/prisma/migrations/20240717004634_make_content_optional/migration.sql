-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "content" TEXT,
    "createTimestamp" INTEGER NOT NULL,
    "updateTimestamp" INTEGER NOT NULL
);
INSERT INTO "new_Note" ("content", "createTimestamp", "id", "title", "updateTimestamp") SELECT "content", "createTimestamp", "id", "title", "updateTimestamp" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
