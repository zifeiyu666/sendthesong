ALTER TABLE "virtual_gifts" ALTER COLUMN "vibe" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "virtual_gifts" ALTER COLUMN "vibe" SET DEFAULT 'hearts'::text;--> statement-breakpoint
UPDATE "virtual_gifts" SET "vibe" = CASE
	WHEN "vibe" IN ('hearts', 'roses', 'stars', 'ribbons') THEN "vibe"
	ELSE 'hearts'
END;--> statement-breakpoint
DROP TYPE "public"."virtual_gift_vibe";--> statement-breakpoint
CREATE TYPE "public"."virtual_gift_vibe" AS ENUM('hearts', 'roses', 'stars', 'ribbons');--> statement-breakpoint
ALTER TABLE "virtual_gifts" ALTER COLUMN "vibe" SET DEFAULT 'hearts'::"public"."virtual_gift_vibe";--> statement-breakpoint
ALTER TABLE "virtual_gifts" ALTER COLUMN "vibe" SET DATA TYPE "public"."virtual_gift_vibe" USING "vibe"::"public"."virtual_gift_vibe";
