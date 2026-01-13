CREATE TABLE "datel" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"witel_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "datel_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "site" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"witel_id" text NOT NULL,
	"datel_id" text NOT NULL,
	"location" text NOT NULL,
	"latitude" text,
	"longitude" text,
	"status" text DEFAULT 'Active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "site_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "witel" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "witel_code_unique" UNIQUE("code")
);
--> statement-breakpoint
ALTER TABLE "datel" ADD CONSTRAINT "datel_witel_id_witel_id_fk" FOREIGN KEY ("witel_id") REFERENCES "public"."witel"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site" ADD CONSTRAINT "site_witel_id_witel_id_fk" FOREIGN KEY ("witel_id") REFERENCES "public"."witel"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site" ADD CONSTRAINT "site_datel_id_datel_id_fk" FOREIGN KEY ("datel_id") REFERENCES "public"."datel"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "datel_witelId_idx" ON "datel" USING btree ("witel_id");--> statement-breakpoint
CREATE INDEX "site_witelId_idx" ON "site" USING btree ("witel_id");--> statement-breakpoint
CREATE INDEX "site_datelId_idx" ON "site" USING btree ("datel_id");