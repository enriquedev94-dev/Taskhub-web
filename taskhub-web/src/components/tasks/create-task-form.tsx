"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "./submit-button";
import { useActionState } from "react";
import { useEffect, useRef } from "react";
import { createTaskAction } from "@/actions/task.actions";

interface CreateTaskFormProps {
    projectId: string
    onSuccess?: () => void;
}

export function CreateTaskForm({
    projectId,
    onSuccess
}: CreateTaskFormProps) {
    const [state, formAction] = useActionState(createTaskAction, {
        success: false
    })

    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (!state.success) return;
        onSuccess?.();
    }, [state.success, onSuccess]);

    return (
        <form
            ref={formRef}
            action={formAction}
            className="space-y-4"
        >
            <div>
                <input
                    type="hidden"
                    name="projectId"
                    value={projectId}
                />
                <Label htmlFor="title">
                    Title
                </Label>

                <Input
                    id="title"
                    name="title"
                />
                {state.errors?.title?.map((error) => (
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