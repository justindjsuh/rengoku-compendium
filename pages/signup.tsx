import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Signup.module.css";
import React, { useState } from "react";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [discord, setDiscord] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameTaken, setUsernameTaken] = useState<boolean>(false);
  const [emailTaken, setEmailTaken] = useState<boolean>(false);
  const [submittedState, setSubmittedState] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<boolean>(false);

  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTaken(false);
    setUsernameTaken(false);
    const usernames: PostgrestSingleResponse<{ username: string }[]> =
      await supabase.from("users").select("username");
    const emails: PostgrestSingleResponse<{ email: string }[]> = await supabase
      .from("users")
      .select("email");

    const checkUsernames = (usernamesArr: { username: string }[] | null) => {
      if (usernamesArr) {
        for (const name of usernamesArr) {
          if (name.username === username) {
            return false;
          }
        }
        return true;
      }
    };

    const checkEmails = (emailsArr: { email: string }[] | null) => {
      if (emailsArr) {
        for (const user of emailsArr) {
          if (user.email === email) {
            return false;
          }
        }
      }
      return true;
    };

    const usernameAvailable = checkUsernames(usernames.data);
    const emailAvailable = checkEmails(emails.data);

    if (usernameAvailable && emailAvailable) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setErrorState(true);
      } else {
        const { error } = await supabase.from("users").insert({
          auth_id: data.user?.id,
          email: data.user?.email,
          username,
          discord,
        });
        if (error) {
          setErrorState(true);
        }
        setSubmittedState(true);
        setUsernameTaken(false);
        setEmailTaken(false);
        setErrorState(false);
        setUsername("");
        setEmail("");
        setDiscord("");
        setPassword("");
      }
    } else {
      if (!usernameAvailable) {
        setUsernameTaken(true);
      }
      if (!emailAvailable) {
        setEmailTaken(true);
      }
    }
  };

  useEffect(() => {
    if (user) router.push("/dashboard");
  });

  return (
    <>
      <Head>
        <title>Rengoku Compendium | Sign Up</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <Image src="/logo.png" alt="fire logo" width={50} height={65} />
          <h1>Rengoku Compendium</h1>
        </div>
        <div className={styles.login_container}>
          <h2>Create your account</h2>
          <form className={styles.login_form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Maplestory IGN"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Discord"
              onChange={(e) => setDiscord(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Create Account</button>
          </form>
          {submittedState && (
            <p>Please check your email for a verification link!</p>
          )}
          {usernameTaken && <p>Username is already in use!</p>}
          {emailTaken && <p>Email is already in use!</p>}
          {errorState && <p>Something went wrong!</p>}
          <div className={styles.navigator}>
            <p>Already have an account?</p>
            <Link href="/">Sign In</Link>
          </div>
        </div>
      </main>
    </>
  );
}
