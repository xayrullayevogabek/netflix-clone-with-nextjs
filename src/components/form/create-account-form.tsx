import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createAccountSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import PinInput from "react-pin-input";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const CreateAccountForm = () => {
  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
      pin: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof createAccountSchema>) => {
    console.log(values);
  };

  return (
    <>
      <h1 className={"text-white text-center font-bold text-3xl"}>
        Create your account
      </h1>
      <div className="w-full h-[2px] bg-slate-500/20 mb-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="off"
                    className="h-[56px] rounded"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>Please add to your name</FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"pin"}
            render={({ field }) => (
              <FormItem className="mt-10">
                <FormLabel>Pin Code</FormLabel>
                <FormControl>
                  <PinInput
                    length={4}
                    initialValue={field.value}
                    disabled={isSubmitting}
                    onChange={(value) => field.onChange(value)}
                    secret
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4,1fr)",
                      gap: "10px",
                      
                    }}
                    inputStyle={{
                      borderColor: "RGBA(255,255,255, 0.16)",
                      height: "56px",
                      width: "100%",
                      fontSize: "40px",
                      borderRadius:"5px"
                    }}
                    secretDelay={1000}
                    type="numeric"
                    inputMode="number"
                    inputFocusStyle={{ borderColor: "RGBA(255,255,255, 0.80)" }}
                  />
                </FormControl>
                <FormDescription>Please add to your pin</FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit" className="w-full bg-red-600 hover:bg-red-800 flex justify-center items-center h-[56px] !text-white mt-4 rounded">
            Create an Account
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateAccountForm;
