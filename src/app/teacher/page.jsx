'use client';

import LoginForm from '@/components/teacher/Teacherlogin';
import { Suspense } from 'react';


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm/>
    </Suspense>
  );
}
