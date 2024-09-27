"use client";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema } from "@/app/lib/validators";
import useFetch from "@/app/hooks/use-fetch";
import { updateUsername } from "@/actions/users";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usernameSchema),
  });
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      setValue("username", user.username);
    }
  }, [isLoaded, user, setValue]);

  const { loading, error, fn: fnupdateusername } = useFetch(updateUsername);

  const onSubmit = async (data) => {
    fnupdateusername(data.username);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome {user?.firstName}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                {typeof window !== "undefined" && (
                  <span>{window.location.origin}/</span>
                )}
                <input
                  {...register("username")}
                  placeholder="username"
                  className="border-2 rounded-lg px-2 py-1"
                  autoFocus
                />
              </div>
              {errors.username && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            {error && (
              <p className="text-red-600 text-sm mt-1">{error.message}</p>
            )}
            {loading && (
              <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
            )}
            <Button type="submit" disabled={loading}>
              Submit Username
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
