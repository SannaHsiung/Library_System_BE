-- CreateTable
CREATE TABLE "Category" (
    "category" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Dvd" (
    "title" TEXT NOT NULL,
    "runTimeMinutes" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "isBorrowable" BOOLEAN NOT NULL,
    "categoryId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AudioBook" (
    "title" TEXT NOT NULL,
    "runTimeMinutes" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "isBorrowable" BOOLEAN NOT NULL,
    "categoryId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Book" (
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "nbrPages" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "isBorrowable" BOOLEAN NOT NULL,
    "categoryId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ReferenceBook" (
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "nbrPages" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "isBorrowable" BOOLEAN NOT NULL,
    "categoryId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_key" ON "Category"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Dvd_title_key" ON "Dvd"("title");

-- CreateIndex
CREATE UNIQUE INDEX "AudioBook_title_key" ON "AudioBook"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");

-- CreateIndex
CREATE UNIQUE INDEX "ReferenceBook_title_key" ON "ReferenceBook"("title");

-- AddForeignKey
ALTER TABLE "Dvd" ADD CONSTRAINT "Dvd_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudioBook" ADD CONSTRAINT "AudioBook_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferenceBook" ADD CONSTRAINT "ReferenceBook_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("category") ON DELETE RESTRICT ON UPDATE CASCADE;
