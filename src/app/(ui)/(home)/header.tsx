"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Home", href: "#" },
  { label: "Appetite Fulfillment", href: "#appetite" },
  { label: "Easiest Diet To Follow", href: "#easiest-diet-to-follow" },
  { label: "Nutrition & Health", href: "#nutrition-and-health" },
  { label: "Plans & Pricing", href: "#plans-pricing" },
  { label: "Our Mission", href: "#our-mission" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="bg-white/50  p-4">
      <div className="section flex items-center">
        <div>
          <Image
            src="/satisfill-diet.png"
            alt="Satisfill Logo"
            width={150}
            height={50}
            className="max-h-[50px] md:max-h-[100px] w-auto"
          />
        </div>

        <div className="grid not-md:hidden gap-4 grid-cols-[repeat(auto-fit,minmax(0,100px))] w-full items-end">
          {links.map((l) => (
            <Link
              href={l.href}
              key={l.href}
              className="font-semibold hover:underline text-center wrap-break-word"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="md:hidden block ml-auto">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger>
              <Button className="aspect-square">
                <MenuIcon size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent onCloseAutoFocus={(e) => e.preventDefault()}>
              <div className="flex flex-col mt-10">
                {links.map((l) => (
                  <Link
                    href={l.href}
                    key={l.href}
                    onClick={() => {
                      setSheetOpen(false);
                    }}
                    className="border-b font-semibold hover:underline p-4 hover:bg-amber-100 wrap-break-word"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
