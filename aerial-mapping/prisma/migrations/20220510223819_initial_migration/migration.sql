-- CreateTable
CREATE TABLE "newtable" (
    "test" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "newtable_test_key" ON "newtable"("test");
