-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dvd" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "runTimeMinutes" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "isBorrowable" BOOLEAN NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Dvd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudioBook" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "runTimeMinutes" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "isBorrowable" BOOLEAN NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "AudioBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "nbrPages" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "isBorrowable" BOOLEAN NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferenceBook" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "nbrPages" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "isBorrowable" BOOLEAN NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "ReferenceBook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dvd" ADD CONSTRAINT "Dvd_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudioBook" ADD CONSTRAINT "AudioBook_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferenceBook" ADD CONSTRAINT "ReferenceBook_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
