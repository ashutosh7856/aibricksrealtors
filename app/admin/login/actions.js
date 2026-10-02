"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import userModel from "@/lib/models/User";
import config from "@/lib/config";
import { SESSION_COOKIE, createSessionToken } from "@/lib/auth/session";

export async function loginAction(previousState, formData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const user = await userModel.getByEmail(email);
  if (!user || user.isActive === false || user.role !== "admin") {
    return { error: "Invalid admin credentials." };
  }

  const validPassword = await bcrypt.compare(password, user.password || "");
  if (!validPassword) {
    return { error: "Invalid admin credentials." };
  }

  const token = createSessionToken(user);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: config.env === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}
