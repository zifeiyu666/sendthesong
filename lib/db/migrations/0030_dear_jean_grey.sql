ALTER TABLE "user" ADD COLUMN "signup_site" varchar(100);--> statement-breakpoint
CREATE INDEX "idx_user_signup_site" ON "user" USING btree ("signup_site");