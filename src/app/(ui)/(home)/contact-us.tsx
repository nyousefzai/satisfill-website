"use client";

import { useContact } from "@/api-query";
import {
  ContactFormData,
  contactSchema,
} from "@/app/api/contact/contact.schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const INPUT_STYLES = cn(
  "rounded-none focus-visible:ring-pink-400/50 border-pink-400"
);

export default function ContactUs() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { mutate, isPending } = useContact();

  const onSubmit = async (data: ContactFormData) => {
    mutate(
      {
        body: data,
      },
      {
        onSuccess() {
          form.reset();

          toast.success("Message sent successfully!");
        },
        onError() {
          toast.error("Failed to send message. Please try again.");
        },
      }
    );
  };

  return (
    <div id="contact">
      <header className="bg-sky-200 px-4 py-1">
        <div className="section flex items-center gap-4">
          <div>
            <Image
              src="/satisfill-diet.png"
              alt="Satisfill Logo"
              width={150}
              height={50}
              className="max-h-[100px] w-auto"
            />
          </div>

          <h2 className="text-4xl font-semibold text-sky-700">Contact Us</h2>
        </div>
      </header>

      <div className="text-lg [&_label]:text-lg  [&_label]:font-bold py-20 px-4 section">
        <p className="text-2xl text-sky-700 mb-8">
          <b>Message Center</b>
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-4xl mx-auto space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
                  <FormLabel className="md:w-32">Name</FormLabel>
                  <div className="flex-1">
                    <FormControl>
                      <Input className={INPUT_STYLES} {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
                  <FormLabel className="md:w-32">Email</FormLabel>
                  <div className="flex-1">
                    <FormControl>
                      <Input type="email" className={INPUT_STYLES} {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
                  <FormLabel className="md:w-32">Subject</FormLabel>
                  <div className="flex-1">
                    <FormControl>
                      <Input className={INPUT_STYLES} {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-start gap-2">
                  <FormLabel className="md:w-32 md:pt-2">Message</FormLabel>
                  <div className="flex-1">
                    <FormControl>
                      <Textarea
                        className={`${INPUT_STYLES} min-h-32`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-start md:ml-36">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full md:w-auto px-8"
              >
                {form.formState.isSubmitting || isPending
                  ? "Sending..."
                  : "Send Message"}
              </Button>
            </div>
          </form>
        </Form>

        <p className="pl-8 mt-10">
          NOTE: We will make every attempt to respond within 48 hours.
        </p>

        <p className="text-2xl text-sky-700 mb-2 mt-10">Email Address</p>
        <p className="pl-8">
          <a
            href="mailto:help.satisfillfoods@gmail.com"
            className="text-gray-600 underline"
          >
            help.satisfillfoods@gmail.com
          </a>
        </p>

        <p className="text-2xl text-sky-700 mb-2 mt-10">Mailing Address</p>
        <p className="pl-8">
          Satisfill Foods LLC
          <br />
          1218 7th Street, Suite A<br />
          Berkeley, CA 94710
          <br />
          USA
        </p>
      </div>
    </div>
  );
}
