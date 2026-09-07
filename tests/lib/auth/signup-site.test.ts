import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, test } from "node:test";

import {
  DEFAULT_SIGNUP_SITE_KEY,
  getSignupSiteLabel,
} from "../../../lib/auth/signup-site";

describe("signup site labels", () => {
  test("uses One Custom Song for this site's key", () => {
    assert.equal(DEFAULT_SIGNUP_SITE_KEY, "onecustomsong");
    assert.equal(getSignupSiteLabel("onecustomsong"), "One Custom Song");
  });

  test("marks missing values as unknown", () => {
    assert.equal(getSignupSiteLabel(null), "Unknown");
    assert.equal(getSignupSiteLabel(undefined), "Unknown");
    assert.equal(getSignupSiteLabel(""), "Unknown");
  });

  test("falls back to the stored key for sibling sites", () => {
    assert.equal(getSignupSiteLabel("giftmymusic"), "giftmymusic");
  });
});

test("admin users table exposes a signup site badge and filter", () => {
  const columns = readFileSync(
    join(process.cwd(), "app/[locale]/(protected)/dashboard/(admin)/users/Columns.tsx"),
    "utf8",
  );
  const table = readFileSync(
    join(process.cwd(), "app/[locale]/(protected)/dashboard/(admin)/users/DataTable.tsx"),
    "utf8",
  );
  const auth = readFileSync(join(process.cwd(), "lib/auth/index.ts"), "utf8");

  assert.match(columns, /accessorKey: "signupSite"/);
  assert.match(columns, /Signup site/);
  assert.match(table, /signupSiteFilter/);
  assert.match(auth, /signupSite: SIGNUP_SITE_KEY/);
});
