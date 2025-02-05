'use client';

import dynamic from 'next/dynamic';

const Login = dynamic(() => import('./login/page'), {
  ssr: false
});

export default function Home() {
  return (
    <section className="sm:bg-gray-200">
      <Login />
    </section>
  );
}
