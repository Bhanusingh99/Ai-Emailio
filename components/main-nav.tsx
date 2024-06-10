"use client";

import React from "react";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";

// Dynamically import Lottie to ensure it's loaded only on the client side
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export function MainNav() {
  return (
    <div className="flex gap-4 items-center">
      <Button variant="ghost" className="p-0">
        <div style={{ width: 64, height: 64 }}>
          <Lottie
            animationData={require("../public/logo-animation.json")}
            loop={true}
          />
        </div>
      </Button>
    </div>
  );
}
