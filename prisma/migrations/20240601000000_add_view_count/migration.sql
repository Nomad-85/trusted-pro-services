-- AlterTable
ALTER TABLE "Business" ADD COLUMN "viewCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Business_slug_idx" ON "Business"("slug"); 