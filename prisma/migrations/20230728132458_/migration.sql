/*
  Warnings:

  - You are about to drop the column `userId` on the `Dishes` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dishes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "imageId" TEXT,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Dishes_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Dishes_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Dishes" ("categoryId", "description", "id", "imageId", "name", "price") SELECT "categoryId", "description", "id", "imageId", "name", "price" FROM "Dishes";
DROP TABLE "Dishes";
ALTER TABLE "new_Dishes" RENAME TO "Dishes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
