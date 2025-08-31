import { relations, sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// 1. Definição de TODAS as tabelas primeiro
export const userTable = pgTable("user", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
});

export const categoryTable = pgTable("category", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productTable = pgTable("product", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    categoryId: uuid("category_id")
        .notNull()
        .references(() => categoryTable.id),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productVariantTable = pgTable("product_variant", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    productId: uuid("product_id")
        .notNull()
        .references(() => productTable.id),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    color: text("color").notNull(),
    priceInCents: integer("price_in_cents").notNull(),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// 2. Definição de TODAS as relações depois
export const categoryRelations = relations(categoryTable, ({ many }) => ({
    products: many(productTable),
}));

export const productRelations = relations(productTable, ({ one, many }) => ({
    category: one(categoryTable, {
        fields: [productTable.categoryId],
        references: [categoryTable.id],
    }),
    variants: many(productVariantTable),
}));

export const productVariantRelations = relations(
    productVariantTable,
    ({ one }) => ({
        product: one(productTable, {
            fields: [productVariantTable.productId],
            references: [productTable.id],
        }),
    }),
);