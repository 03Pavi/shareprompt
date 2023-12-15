"use client"
import { SignIn, currentUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function Page() {
  return <div className="flex justify-center py-24"><SignIn />

  </div>;
}
