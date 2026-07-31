"use client"

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { CreateTaskForm } from "./create-task-form";

type CreateTaskButtonProps = {
    projectId: string;
}

export function CreateTaskButton({
    projectId,
}: CreateTaskButtonProps) {

    const [open, setOpen] = useState(false);
    
    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger
                render={
                    <Button variant="outline">
                        New Task
                    </Button>
                }
            />

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create Task
                    </DialogTitle>
                </DialogHeader>

                <CreateTaskForm projectId={projectId} onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}