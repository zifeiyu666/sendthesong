CREATE TYPE "public"."virtual_gift_audio_source" AS ENUM('none', 'song', 'upload');--> statement-breakpoint
CREATE TYPE "public"."virtual_gift_vibe" AS ENUM('default', 'red', 'pink', 'black');--> statement-breakpoint
CREATE TABLE "virtual_gifts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"template_id" text NOT NULL,
	"vibe" "virtual_gift_vibe" DEFAULT 'default' NOT NULL,
	"sender_name" text,
	"message" text NOT NULL,
	"image_url" text,
	"image_key" text,
	"audio_source" "virtual_gift_audio_source" DEFAULT 'none' NOT NULL,
	"song_id" uuid,
	"audio_url" text,
	"audio_key" text,
	"share_token" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "virtual_gifts_share_token_unique" UNIQUE("share_token")
);
--> statement-breakpoint
ALTER TABLE "virtual_gifts" ADD CONSTRAINT "virtual_gifts_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "virtual_gifts" ADD CONSTRAINT "virtual_gifts_song_id_songs_id_fk" FOREIGN KEY ("song_id") REFERENCES "public"."songs"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_virtual_gifts_share_token" ON "virtual_gifts" USING btree ("share_token");--> statement-breakpoint
CREATE INDEX "idx_virtual_gifts_user_id" ON "virtual_gifts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_virtual_gifts_created_at" ON "virtual_gifts" USING btree ("created_at");