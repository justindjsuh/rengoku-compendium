import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useUser();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginState, setLoginState] = useState<string>("");
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data.user) {
      setLoadingState(true);
      router.push("/dashboard");
    } else {
      setLoginState("FAILED");
    }
  };

  useEffect(() => {
    if (user) router.push("/dashboard");
  });

  return (
    <>
      <Head>
        <title>Rengoku Compendium | Sign In</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <Image src="/logo.png" alt="fire logo" width={50} height={65} />
          <h1>Rengoku Compendium</h1>
        </div>
        <div className={styles.login_container}>
          <h2>Welcome Back</h2>
          <form className={styles.login_form} onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={loadingState}>
              {loadingState ? "Loading..." : "Sign In"}
            </button>
          </form>
          {loginState === "FAILED" && <p>Email or password is incorrect.</p>}
          <div className={styles.navigator}>
            <p>Don&apos;t have an account?</p>
            <Link href="/signup">Sign Up</Link>
          </div>
        </div>
      </main>
    </>
  );
}
