import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { toUnicode } from 'punycode'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

interface HomeProp {
  todo: Todo;
}

interface Todo {
  userId: String;
  id: number;
  title: string;
  completed: boolean
}

const Home = ({ todo }: HomeProp ) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
       <div>{todo.title}</div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data: Todo = await res.json(); 

  return { props: { todo: data } };
}

export default Home
