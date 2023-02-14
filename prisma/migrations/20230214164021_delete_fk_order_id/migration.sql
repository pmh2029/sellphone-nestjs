/*
  Warnings:

  - You are about to drop the column `order_id` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_order_id_fkey";

-- DropIndex
DROP INDEX "products_order_id_key";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "order_id";

-- CreateIndex
CREATE UNIQUE INDEX "orders_product_id_key" ON "orders"("product_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
