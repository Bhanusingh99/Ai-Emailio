"use client";

import Image from "next/image";

import React from "react";
import { Button } from "./ui/button";

export function MainNav() {
  return (
    <div className="flex gap-4 items-center">
      <Button variant="ghost" className="p-0">
        <Image
          src="/braid.png"
          alt="Home"
          width="32"
          height="32"
          className="min-w-8"
        />
      </Button>
    </div>
  );
}
