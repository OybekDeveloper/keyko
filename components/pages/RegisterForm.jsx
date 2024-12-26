"use client";

import React, { useState, useEffect } from "react";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../shared/customFormField";
import SubmitButton from "../shared/submitButton";
import { useForm } from "react-hook-form";
import { RegisterValidate } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { createUser } from "@/lib/api.services";
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT,
  COLLECTION_ID_USERS,
  DATABASE_ID,
  STREAM_API_KEY,
} from "@/lib/utils";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import { redirect, useRouter } from "next/navigation";
import { Client } from "appwrite";
import { Databases } from "node-appwrite";

export default function RegisterForm() {
  const client = new Client();
  client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT);
  const databases = new Databases(client);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const form = useForm({
    resolver: zodResolver(RegisterValidate),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    const { first_name, last_name, phone, password } = values;
    const findUser = users?.find((user) => user?.PhoneNumber == String(phone));
    if (findUser) {
      form.setError("phone", {
        type: "manual",
        message: "Bu raqam allaqachon mavjud  !",
      })
        setIsLoading(false);
      return null;
    }
    try {
      const { data: tokenApiUser } = await axios.post("/api/user", {
        name: values.phone,
      });
      if (tokenApiUser) {
        const chatClient = new StreamChat(STREAM_API_KEY);

        const data = {
          FirstName: first_name,
          LastName: last_name,
          PhoneNumber: phone,
          Password: password,
          Role: "admin",
        };

        // Axios orqali hujjat yaratish
        const response = await axios.post(
          `https://cloud.appwrite.io/v1/databases/${DATABASE_ID}/collections/${COLLECTION_ID_USERS}/documents`,
          {
            data,
            documentId: uuidv4(),
          },
          {
            headers: {
              "X-Appwrite-Project": APPWRITE_PROJECT,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);

        if (response.data && tokenApiUser) {
          // const newUser = {
          //   id: response?.data?.$id,
          //   name: first_name,
          //   image: "https://link.to/avatar.png",
          // };

          // await chatClient.connectUser(newUser, String(tokenApiUser));
          Cookies.set("auth", JSON.stringify(response?.data), { expires: 1 });
          Cookies.set(
            "extraTime",
            new Date().getTime() + 60 * 60 * 1000 * 24 * 30, // 30 days
            { expires: 1 }
          );
          router.push("/user");
        }
      }
      form.reset();
      toast.success("Ro'yxatdan o'tdingiz!");
    } catch (error) {
      console.error(error);
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
        className="max-sm:w-full md:w-3/5 xl:w-2/5 space-y-4 w-ful rounded-md p-10"
      >
        <div className="">
          <h1 className="textBig sm:textNormal3 font-bold">
            Ro'yxatdan o'tish
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="first_name"
            placeholder=""
            label="Ism"
            inputClass="rounded-md border-2"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="last_name"
            label="Familiya"
            placeholder=""
            inputClass="rounded-md border-2"
          />
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
        <div className="flex max-sm:flex-col justify-between sm:items-center gap-2">
          <SubmitButton
            isLoading={isLoading}
            className="w-40 bg-secondary hover:bg-secondary text-white hover:text-white"
          >
            Akkaunt yaratish
          </SubmitButton>
          <h1 className="">
            Akkaunt mavjud{" "}
            <Link href="/login" className="font-bold">
              Kirish
            </Link>
          </h1>
        </div>
      </form>
    </Form>
  );
}
