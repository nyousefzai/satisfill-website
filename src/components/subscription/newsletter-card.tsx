"use client";

import { useSubscribeNewsletter } from "@/api-query";
import {
  NewsLetterFormData,
  newsLetterSchema,
} from "@/app/api/newsletter/newsletter.schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SubscriptionCard from "../common/subscription-card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function NewsLetterCard() {
  const [open, setOpen] = useState(false);
  const { mutate: subscribe, isPending } = useSubscribeNewsletter();
  const form = useForm<NewsLetterFormData>({
    resolver: zodResolver(newsLetterSchema),
  });

  function onSubmit(values: NewsLetterFormData) {
    subscribe(
      {
        body: values,
      },
      {
        onSuccess() {
          setOpen(false);
          toast.success("Subscribed successfully!");
          form.reset();
        },
        onError(err) {
          toast.error(
            err?.payload?.toString() ?? "Failed to subscribe. Please try again."
          );
        },
      }
    );
  }

  return (
    <>
      <SubscriptionCard
        title="Subscribe and get"
        description={
          <>
            Free e-Book –<br />
            Best Diets
            <br />
            of 2025
          </>
        }
        onJoinNow={() => {
          setOpen(true);
        }}
        joinText={isPending ? "Subscribing..." : "Subscribe Now"}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your email address</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@gmail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size={"lg"} variant={"outline"}>
                {isPending ? "Subscribing..." : "Subscribe Now"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
