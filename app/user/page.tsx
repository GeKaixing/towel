import { getCookie } from "@/util/getcookie";
import React from "react";
import Page from "./_body";
async function GETaccount(userid: string) {
  const res = await fetch(
    `${process.env.ORIGIN}/api/profile/account/${userid}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    }
  );
  return await res.json();
}
export default async function page() {
  const userinfo = await getCookie();
  const res = await GETaccount(userinfo.userid);
  return (
    <Page>
      <div className="flex gap-2">
        <div>{res.username}</div>
        <div>关注0</div>
        <div>粉丝1</div>
      </div>
    </Page>
  );
}
