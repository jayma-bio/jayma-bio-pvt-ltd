"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { updateUser } from "@/actions/updateUser";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UsernameSetSchema } from "@/schemas";
import { useRouter } from "next/navigation";

export function SetUsernameModel() {
  const router = useRouter();
  const form = useForm<z.infer<typeof UsernameSetSchema>>({
    resolver: zodResolver(UsernameSetSchema),
    defaultValues: {
      username: ``,
    },
  });

  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<string | null>();
  const user = useCurrentUser();

  const { onClose } = useModal();
  const { isOpen, type } = useModal();
  const isModalOpen = isOpen && type === "set-username";
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSubmit = (values: z.infer<typeof UsernameSetSchema>) => {
    startTransition(() => {
      updateUser(values)
        .then((data) => {
          if (data.error) {
            setError("Username is already taken");
          }
          if (data.success) {
            setSuccess(data.success);
            router.refresh();
          }
        })
        .catch(() => {
          setError("Username is already taken");
        });
    });
  };

  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Reserve username</DialogTitle>
          <DialogDescription>
            To continue using this app you must set a username for this profile
          </DialogDescription>
        </DialogHeader>
        <div className="p-2 rounded-full border border-blue-500 hover:cursor-pointer">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user?.image} />
              {user?.name && (
                <AvatarFallback className="bg-transparent border border-black">
                  {user?.name[0]}
                </AvatarFallback>
              )}
            </Avatar>
            <p className="text-sm">{user?.email}</p>
          </div>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full gap-4 py-4">
            <Label htmlFor="username">Username</Label>
            <Input
              disabled={isPending}
              id="username"
              placeholder="john_doe"
              className="w-full rounded-md"
              maxLength={15}
              {...form.register("username")}
            />
          </div>
          {form.formState.errors.username && (
            <FormError message={form.formState.errors.username.message} />
          )}
          <DialogFooter>
            <div className="flex flex-col gap-2 w-full">
              <Button disabled={isPending} className="w-full" type="submit">
                Claim
              </Button>
              <FormError message={error!} />
              <FormSuccess message={success!} />
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
