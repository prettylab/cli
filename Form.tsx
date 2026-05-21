"use client";

import { ReactNode } from "react";
import { FormProvider } from "react-hook-form";
import Flex from "@prettylab/core/components/layout/Flex/Flex";

interface Props {
  form: any;
  onSubmit: (data: any) => void;
  children: ReactNode;
}

export default function Form({ form, onSubmit, children }: Props) {
  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Flex column sx={{ gap: 2 }}>
          {children}
        </Flex>
      </form>
    </FormProvider>
  );
}
