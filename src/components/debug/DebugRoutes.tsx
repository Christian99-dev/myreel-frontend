"use client";
import { SessionService } from "@/utils/session";

export default function DebugRoutes() {
  SessionService.setItem("jwt", "n");
  console.log(SessionService.getItem("jwt"));
  return <>testng</>;
}
