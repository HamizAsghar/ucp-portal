"use client"

import React, { Suspense } from "react"
import ResetPasswordForm from '@/components/teacher/ResetPassword'

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}

export default Page
