"use client"

import { createProjectAction } from "@/actions/project.actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "./submit-button";
import { useActionState } from "react";
import { useEffect, useRef } from "react";

interface CreateProjectFormProps {
  onSuccess?: () => void;
}

export function CreateProjectForm({ onSuccess }: CreateProjectFormProps) {
  const [state, formAction] = useActionState(createProjectAction, {
    success: false
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.success) return;

    formRef.current?.reset();
    onSuccess?.();
  }, [state.success, onSuccess]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="name">
          Name
        </Label>

        <Input
          id="name"
          name="name"
        />
        {state.errors?.name?.map((error) => (
          <p key={error} className="text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>

      <div>
        <Label htmlFor="description">
          Description
        </Label>

        <Input
          id="description"
          name="description"
        />
        {state.errors?.description?.map((error) => (
          <p key={error} className="text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>

      <SubmitButton />
      {state.message && (
        <p
          className={`text-sm ${state.success ? "text-green-600" : "text-red-600"
            }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}