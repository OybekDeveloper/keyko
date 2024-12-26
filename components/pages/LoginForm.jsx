"use client";

import React, { useState, useEffect } from "react";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../shared/customFormField";
import SubmitButton from "../shared/submitButton";
import { useForm } from "react-hook-form";
import { LoginValidate } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { Client, Databases } from "appwrite";
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT,
  COLLECTION_ID_USERS,
  DATABASE_ID,
} from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const client = new Client();
  client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT);
  const databases = new Databases(client);
  const [users, setUsers] = useState([]);


  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(LoginValidate),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const { phone, password } = values;
      console.log(phone, password, users);

      const findUser = users?.find(
        (user) =>
          user?.Password == String(password) &&
          user?.PhoneNumber == String(phone)
      );
      console.log({ findUser });

      if (findUser) {
        Cookies.set("auth", JSON.stringify(findUser), { expires: 1 });
        Cookies.set(
          "extraTime",
          new Date().getTime() + 60 * 60 * 1000 * 24 * 30, // 30 days
          { expires: 1 }
        );
        toast.success("Tizimga muvofaqiyatli kirdingiz.");
        router.push(`/${findUser?.Role}`);
      } else {
        toast.error("Login yoki password noto'g'ri.Qaytadan urunib ko'ring!!!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login yoki password noto'g'ri.Qaytadan urunib ko'ring!!!");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID_USERS
        );
        console.log(response);
        setUsers(response.documents);
      } catch (error) {}
    })();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-3/5 xl:w-2/5 space-y-4 w-ful rounded-md p-10"
      >
        <div className="">
          <h1 className="textBig sm:textNormal3 font-bold">Kirish</h1>
        </div>
        <div className=" w-full space-y-6">
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            placeholder=""
            label="Telefon raqam"
            inputClass="rounded-md border-2"
          />
          <CustomFormField
            fieldType={FormFieldType.PASSWORDINPUT}
            control={form.control}
            name="password"
            label="Parol"
            placeholder=""
            inputClass="rounded-md border-2"
          />
        </div>
        <div className="flex max-sm:flex-col justify-start sm:justify-between sm:items-center gap-2">
          <SubmitButton
            isLoading={isLoading}
            className="w-40 bg-secondary hover:bg-secondary text-white hover:text-white"
          >
            Kirish
          </SubmitButton>
          <h1 className="">
            Akkaunt mavjud emasmi?{" "}
            <Link href="/register" className="font-bold">
              Ro’yxatdan o’tish
            </Link>
          </h1>
        </div>
      </form>
    </Form>
  );
}
